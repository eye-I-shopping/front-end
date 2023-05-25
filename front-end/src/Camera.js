import React, { useRef, useEffect } from "react";

function Camera() {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: { facingMode: "environment" } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("An error occurred: " + err);
      });
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%" }}
      ></video>
    </>
  );
}

export default Camera;
