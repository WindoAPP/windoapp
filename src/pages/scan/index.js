
import homeStyles from './scan.module.scss';
import React from 'react';

import QRScanner from '../../../components/scanner/scanner';

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