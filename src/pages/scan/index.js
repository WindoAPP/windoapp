
import homeStyles from './scan.module.scss';
import React from 'react';

//import QRScanner from '../../../components/scanner/scanner';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const QRScanner = dynamic(() => import('../../../components/scanner/scanner'), {
  ssr: false, // Ensure the component is not server-side rendered
});

const ScanPage = () => {

    
    return (
      <div className={homeStyles.app}>
      <h2>Next.js Barcode Scanner</h2>
      <div className={homeStyles.barcodeScanner}>
      <QRScanner />
      </div>
    </div>
    );
};

export default ScanPage;