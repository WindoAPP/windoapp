// import { useEffect, useState } from 'react';
import styles from './scan.module.scss';
import { useEffect, useRef } from 'react';
import Html5Qrcode from 'html5-qrcode';
const ScanPage = () => {

    const videoRef = useRef(null);
    const qrCodeRef = useRef(null);
  
    useEffect(() => {
      const startScanner = async () => {
        try {
          const html5QrCode = new Html5Qrcode('qr-code-reader');
  
          await html5QrCode.start(
            qrCodeRef.current,
            {
              fps: 10,
              qrbox: 250,
            },
            (qrCode) => {
              console.log('QR Code detected:', qrCode);
              // Do something with the detected QR code
            },
            (errorMessage) => {
              console.error(errorMessage);
            }
          );
        } catch (err) {
          console.error(err);
        }
      };
  
      startScanner();
  
      // return () => {
      //   if (html5QrCode) {
      //     html5QrCode.stop();
      //   }
      // };
    }, []);
  
    return (
      <div>
        <video ref={videoRef} id="qr-code-reader" />
      </div>
    );
};

export default ScanPage;