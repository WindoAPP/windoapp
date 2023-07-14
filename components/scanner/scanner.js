import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicQrScanner = dynamic(
  () => import('react-qr-scanner'),
  { ssr: false }
);

const BarcodeScanner = () => {
    const [result, setResult] = useState('');

    const handleScan = (data) => {
      if (data) {
        setResult(data);
      }
    };
  
    const handleError = (err) => {
      console.error(err);
    };
  
    useEffect(() => {
      // Run any necessary setup code here
      return () => {
        // Clean up any resources here
      };
    }, []);
  
    return (
      <div>
        {typeof window !== 'undefined' && (
          <DynamicQrScanner
            onScan={handleScan}
            onError={handleError}
            style={{ width: '100%' }}
          />
        )}
        <p>{result}</p>
      </div>
    );
}

export default BarcodeScanner;