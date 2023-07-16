import React, { useState } from "react";
import QRScanner from "react-qr-scanner";

const QRCodeReader = () => {
  const [data, setData] = useState("");

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
      <QRScanner
        onScan={handleScan}
        onError={handleScanError}
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
