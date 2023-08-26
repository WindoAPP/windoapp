import { useState } from 'react';
import styles from './Login.module.scss'
import { loginUser } from '../../services/service';
import Loader from '../Loader/loader';
import showNotifications from '../showNotifications/showNotifications';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { data: session } = useSession();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const fromSubmit = (e) => {
        e.preventDefault();
        var isValid = validateForm();

        if (isValid) {
            setLoading(true);
            loginUser(formData).then(res => {
                if (res.ok) {
                    if(session.user.isAdmin){
                        router.push("/dashboard/admindashboard");
                    }else{
                        router.push("/dashboard");
                    }   
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }).catch((err) => {
                setLoading(false);
            })
        } else {
            return
        }
    }

    const validateForm = () => {

        if (formData.password == "") {
            showNotifications(true, "Password required")
            return false;
        }
        if (formData.email == "") {
            showNotifications(true, "email required")
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showNotifications(true, "Invalid email address")
            return false;
        }

        return true;
    };
    return (
        <div className={styles.loginWrapper}>
            <form>
                <div className={`d-flex flex-column p-4  ${styles.loginBox}`}>
                    <img className='w-50 align-self-center mb-5' src='logo.png'></img>
                    <h2 className={styles.headingLogin}>Content de te revoir !</h2>
                    <span className='align-self-center mb-5'>Connectez-vous pour continuer vers Windo</span>
                    <div className="d-flex flex-column mb-3">
                        <label><strong>Email</strong></label>
                        <div>
                            <i className={`fa fa-envelope-o ${styles.inputIcon}`} aria-hidden="true"></i>
                            <input type="email" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="d-flex flex-column mb-3">
                        <label><strong>Password</strong></label>
                        <div>
                            <i className={`fa fa-key ${styles.inputIcon}`} aria-hidden="true"></i>
                            <input type="password" name="password" placeholder="Password" className="form-control" value={formData.password} onChange={handleChange}></input>
                        </div>
                    </div>
                    <a className='mb-3'  href="#">Forget Password</a>
                    <button className={`commonBtnWindo w-100 mb-3 ${styles.loginBTN}`} onClick={fromSubmit}>Sign in</button>
                    <span className='align-self-center'>Je n'ai pas de compte? <a href="/register">Sign up</a></span>
                     <a className='align-self-center' href="/">De retour à la maison</a>
                </div>
            </form>
            <div className={styles.RightImageWrapper}>
                <img src='loginImage.jpg' className={styles.RightImage}></img>
            </div>
            {loading && <Loader />}
        </div>
    );
};

export default Login;