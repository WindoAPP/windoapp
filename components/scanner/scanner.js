import React, { useState } from "react";
import QRScanner from "react-qr-scanner";

const QRCodeReader = () => {
  const [data, setData] = useState("");
  const [selectedCamera, setSelectedCamera] = useState(0);

  const handleScan = (event) => {
    const decodedData = event.detail.data;
    setData(decodedData);
  };

  const handleScanError = (error) => {
    // Handle the error here
    console.error('QR Scanner Error:', error);
  };

  

  return (
    <div>
      <button onClick={() => setSelectedCamera(selectedCamera === 0 ? 1 : 0)}>
        Switch Camera
      </button>
      <QRScanner
        onScan={handleScan}
        onError={handleScanError}
        facingMode={selectedCamera === 0 ? 'environment' : 'user'}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <p>The decoded data is: {data}</p>
      
    </div>
  );
};

export default QRCodeReader;
