import '@/styles/globals.scss'
//import '@/styles/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/header/navbar'
import Footer from '../../components/Footer/Footer'
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current URL ends with "/dashboard"
  const isDashboardPage = router.asPath.endsWith('/dashboard');
  const isScanPage = router.asPath.includes('/scan');
  const isLoginPage = router.asPath.includes('/login');
  const isRegiterPage = router.asPath.includes('/register');

  return (
    <SessionProvider session={pageProps.session}>
    {!isDashboardPage && !isScanPage && !isLoginPage  && !isRegiterPage && <Navbar/>}
    <Component {...pageProps} />
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    {!isDashboardPage && !isScanPage && !isLoginPage && !isRegiterPage && <Footer/>}
    </SessionProvider>
 )
}
