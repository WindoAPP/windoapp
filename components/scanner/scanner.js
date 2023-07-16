import React, { useState, useRef, useEffect } from "react";
import QRScanner from "react-qr-scanner";

const QRCodeReader = () => {
  const [data, setData] = useState("");
  const [cameras, setCameras] = useState([]);
  const [selectedCameraType, setSelectedCameraType] = useState("environment");
  const scannerRef = useRef(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(
          (device) => device.kind === "videoinput"
        );

        const updatedCameras = cameras.map((camera) => ({
          deviceId: camera.deviceId,
          label: camera.label,
        }));

        setCameras(updatedCameras);
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
    setSelectedCameraType((prevType) =>
      prevType === "environment" ? "user" : "environment"
    );
  };

  return (
    <div>
      <button onClick={switchCamera}>
        Switch Camera ({selectedCameraType === "environment" ? "Back" : "Front"})
      </button>
      <QRScanner
        onScan={handleScan}
        onError={handleScanError}
        style={{
          width: 200,
          height: 200,
        }}
        cameraId={
          cameras.find((camera) =>
            camera.label.includes(selectedCameraType)
          )?.deviceId || ""
        }
        ref={scannerRef}
      />
      <p>The decoded data is: {data}</p>
    </div>
  );
};

export default QRCodeReader;
