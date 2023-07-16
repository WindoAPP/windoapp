import React, { useState, useRef, useEffect } from "react";
import QRScanner from "react-qr-scanner";

const QRCodeReader = () => {
  const [data, setData] = useState("");
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(0);
  const scannerRef = useRef(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setCameras(cameras);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    fetchCameras();
  }, []);

  const handleScanError = (error) => {
    // Handle the error here
    console.error('QR Scanner Error:', error);
  };

  const handleScan = (event) => {
    const decodedData = event.detail.data;
    setData(decodedData);
  };

  const switchCamera = () => {
    setSelectedCamera(prevCamera => (prevCamera + 1) % cameras.length);
  };

  return (
    <div>
      <button onClick={switchCamera}>
        Switch Camera
      </button>
      <QRScanner
        onScan={handleScan}
        onError={handleScanError}
        style={{
          width: 200,
          height: 200,
        }}
        cameraId={cameras[selectedCamera]?.deviceId || ""}
        ref={scannerRef}
      />
      <p>The decoded data is: {data}</p>
    </div>
  );
};

export default QRCodeReader;
