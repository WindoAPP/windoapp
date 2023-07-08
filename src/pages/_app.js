import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '../../components/header/navbar'
import Footer from '../../components/Footer/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
    </>
 )
}
