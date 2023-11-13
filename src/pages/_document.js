import { Html, Head, Main, NextScript } from 'next/document'
import FacebookPixel from '../../components/facebookPixcel/FacebookPixcel'

export default function Document() {

  return (
    <Html lang="en">
      <Head >
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <link rel="icon" href="/title.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <FacebookPixel/> */}
      </body>
    </Html>
  )
}
