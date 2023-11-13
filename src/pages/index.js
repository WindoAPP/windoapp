import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import HomePage from '../../components/Home/Home'
import { FB_PIXEL_ID } from '../../lib/fpixel'

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
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
      <main className={styles.main}>
        <HomePage/>
      </main>
    </>
  )
}
