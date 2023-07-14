import React, { useState } from 'react';
import { QrReader } from '@memenashi/react-qr-reader';



const BarcodeScanner = () => {
    const [error, setError] = useState('');
    const [data, setData] = useState('');
  
    return (
      <div >
        <QrReader
         
          onResult={(result, error) => {
            if (result) {
              setData(result.getText());
            }
  
            if (error) {
              setError(error.message);
            }
          }}
        />
        <p>The value is: {JSON.stringify(data, null, 2)}</p>
        <p>The error is: {error}</p>
      </div>
    );
}

export default BarcodeScanner;