import React, { useState, useEffect, useRef } from "react";
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
        const cameras = devices.filter(device => device.kind === "videoinput");
        setCameras(cameras);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    fetchCameras();
  }, []);



  const handleScan = (result) => {
    if (result) {
      setData(result);
    }
  };

  const switchCamera = () => {
    setSelectedCamera(prevCamera => (prevCamera + 1) % cameras.length);
  };

  const handleError = (error) => {
    console.error("QR scanner error:", error);
  };

  return (
    <div>
      <button onClick={switchCamera}>Switch Camera</button>
      <QRScanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: 200, height: 200 }}
        cameraId={cameras[selectedCamera]?.deviceId}
        ref={scannerRef}
      />
      <p>The decoded data is: {data}</p>
    </div>
  );
};

export default QRCodeReader;
