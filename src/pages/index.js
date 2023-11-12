import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import HomePage from '../../components/Home/Home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Windo</title>
        <meta name="description" content="Vous désirez accroître le nombre de vos avis sur Google, fidéliser vos clients, et augmenter le nombre de vos abonnés sur les réseaux sociaux ? Optez pour l'installation de Windo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Windo: Augmenter vos avis Google" />
        <link rel="icon" href="/title.ico" />
      </Head>
      <main className={styles.main}>
        <HomePage/>
      </main>
    </>
  )
}
