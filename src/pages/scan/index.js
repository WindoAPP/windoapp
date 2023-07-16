
import homeStyles from './scan.module.scss';
import React from 'react';

//import QRScanner from '../../../components/scanner/scanner';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Html5QrcodePlugin from '../../../components/scanner/scanner';
import { useState } from 'react';

// const QRScanner = dynamic(() => import('../../../components/scanner/scanner'), {
//   ssr: false, // Ensure the component is not server-side rendered
// });

const ScanPage = () => {

  const [value, setValue]=useState("");

  const onNewScanResult = (decodedText, decodedResult) => {
    setValue(decodedText)
};
    return (
      <div className={homeStyles.app}>
      <h2>Next.js Barcode Scanner</h2>
      <h2>{value}</h2>
      <div className={homeStyles.barcodeScanner}>
      <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
      </div>
    </div>
    );
};

export default ScanPage;