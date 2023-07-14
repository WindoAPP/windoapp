
import homeStyles from './scan.module.scss';
import React from 'react';
import BarcodeScanner from '../../../components/scanner/scanner';

const ScanPage = () => {

    const [isActive,setIsActive] = React.useState(false);
  const [initialized,setInitialized] = React.useState(false);
  const toggleScanning = () => {
    setIsActive(!isActive);
  }

  const onScanned = (results) => {
    if (results.length>0) {
      let text = "";
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        text = text + result.barcodeFormatString + ": " + result.barcodeText + "\n";
      }
      alert(text);
      setIsActive(false);
    }
  }
    return (
      <div className={homeStyles.app}>
      <h2>Next.js Barcode Scanner</h2>
      {initialized ? (
        <button onClick={toggleScanning}>{isActive ? "Stop Scanning" : "Start Scanning"}</button>
      ) : (
        <div>Initializing...</div>
      )}
      <div className={homeStyles.barcodeScanner}>
        <BarcodeScanner
          license={"DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9"}
          onInitialized={() => setInitialized(true)}
          isActive={isActive}
          onScanned={(results) => onScanned(results)}
        ></BarcodeScanner>
      </div>
    </div>
    );
};

export default ScanPage;