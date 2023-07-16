
// import homeStyles from './scan.module.scss';
import React from 'react';
// import Html5QrcodePlugin from '../../../components/qrscanner/qrscanner';
// import { useState } from 'react';
import Scan from '../../../components/scanner/scan';

const ScanPage = () => {

  // const [value, setValue] = useState("");

  // const onNewScanResult = (decodedText, decodedResult) => {
  //   setValue(decodedText)
  // };
  return (
    <Scan/>
    // <div className={homeStyles.app}>
    //   <h2>Next.js Barcode Scanner</h2>
    //   <h2>{value}</h2>
    //   <div className={homeStyles.barcodeScanner}>
    //     <Html5QrcodePlugin
    //       fps={10}
    //       qrbox={250}
    //       disableFlip={false}
    //       qrCodeSuccessCallback={onNewScanResult}
    //     />
    //   </div>
    // </div>
  );
};

export default ScanPage;