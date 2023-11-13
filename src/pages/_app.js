import '@/styles/globals.scss'
import '@/styles/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/header/navbar'
import Footer from '../../components/Footer/Footer'
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script'
import * as fbq from '../../lib/fpixel'
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current URL ends with "/dashboard"
  const isDashboardPage = router.asPath.includes('/dashboard');
  const isScanPage = router.asPath.includes('/scan');
  const isLoginPage = router.asPath.includes('/login');
  const isRegiterPage = router.asPath.includes('/register');

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview()

    const handleRouteChange = () => {
      fbq.pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  

  return (
    <SessionProvider session={pageProps.session}>
    {!isDashboardPage && !isScanPage && <Navbar/>}
    <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
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
    {!isDashboardPage && !isScanPage && <Footer/>}
    </SessionProvider>
 )
}
