import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToMongoDB } from '../../../../lib/mongodb'
import User from '../../../../models/user'

const options = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToMongoDB().catch(err => { throw new Error(err) })

                const user = await User.findOne({
                    email: credentials?.email
                }).select("+password")

                if (!user) {
                    throw new Error("Les informations d'identification invalides")
                }

                if(user.accStatus=="created"){
                    throw new Error("need_trial")
                }

                if(user.accStatus=="trial"){
                    const currentDate = new Date();
                    const trialPeriodEndDate = new Date(user.cretaedAt);
                    trialPeriodEndDate.setMonth(trialPeriodEndDate.getMonth() + user.trialPeriod);
                    const trialPeriodHasEnded = currentDate > trialPeriodEndDate;
                    if (trialPeriodHasEnded) {
                        throw new Error(`need_payment|${user._id}`)
                      }
                }

                const isPasswordCorrect = await compare(credentials.password, user.password)

                if (!isPasswordCorrect) {
                    throw new Error("les informations d'identification invalides")
                }

                return user
            }
        })
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user 
            session.user = user

            return session
        }
    }
}

export default NextAuth(options)