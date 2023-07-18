import '@/styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '../../components/header/navbar'
import Footer from '../../components/Footer/Footer'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current URL ends with "/dashboard"
  const isDashboardPage = router.asPath.endsWith('/dashboard');
  const isScanPage = router.asPath.endsWith('/scan');

  return (
    <>
    {!isDashboardPage && !isScanPage && <Navbar/>}
    <Component {...pageProps} />
    {!isDashboardPage && !isScanPage && <Footer/>}
    </>
 )
}
