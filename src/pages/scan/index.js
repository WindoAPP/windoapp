
import homeStyles from './scan.module.scss';
import React from 'react';
import BarcodeScanner from '../../../components/scanner/scanner';

const ScanPage = () => {

    
    return (
      <div className={homeStyles.app}>
      <h2>Next.js Barcode Scanner</h2>
      <div className={homeStyles.barcodeScanner}>
        <BarcodeScanner
          
        />
      </div>
    </div>
    );
};

export default ScanPage;