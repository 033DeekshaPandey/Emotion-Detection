import React, { useRef, useEffect } from 'react';

const CameraComponent = ({ onPlay }) => {
  const videoRef = useRef(null);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  useEffect(() => {
    startVideo();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      onPlay={onPlay}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
      }}
    />
  );
};

export default CameraComponent;
