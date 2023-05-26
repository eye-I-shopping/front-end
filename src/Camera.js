import React, { useRef, useEffect, useState } from "react";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./Camera.css";
import axios from "axios";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageData, setImageData] = useState(null);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 10, 10, video.videoWidth, video.videoHeight);

    const dataUrl = canvas.toDataURL("image/jpg");
    setImageData(dataUrl);

    // Convert dataUrl to Blob
    const blob = dataUrltoBlob(dataUrl);

    // Create a FormData and append the Blob data
    const formData = new FormData();
    formData.append("image", blob);

    axios
      .post("http://localhost:5000/v1/object-detection/yolov5", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataUrltoBlob = (dataURI) => {
    let base64Content = atob(dataURI.split(",")[1]);
    let mimeType = dataURI.split(",")[0].split(":")[1].split(";")[0];
    let arrayBuffer = new ArrayBuffer(base64Content.length);
    let arrayBufferView = new Uint8Array(arrayBuffer);
    for (let i = 0; i < base64Content.length; i++) {
      arrayBufferView[i] = base64Content.charCodeAt(i);
    }
    let blob = new Blob([arrayBuffer], { type: mimeType });
    return blob;
  };

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

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="camera">
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="camera-controls">
        <Button variant="contained" color="primary" onClick={captureImage}>
          Capture
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MenuIcon />}
          onClick={toggleMenu}
        >
          Menu
        </Button>
        {imageData && (
          <Button
            sx={{}}
            variant="contained"
            color="primary"
            href={imageData}
            download="capture.png"
          >
            Download Capture
          </Button>
        )}
        <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
          <List>
            <ListItem>
              <ListItemText primary="보이스선택" />
            </ListItem>
            <ListItem>
              <ListItemText primary="음향설정" />
            </ListItem>
            <ListItem>
              <ListItemText primary="사용설명" />
            </ListItem>
          </List>
          <Button variant="contained" color="primary" onClick={handleCloseMenu}>
            Close Menu
          </Button>
        </Drawer>
      </div>
    </div>
  );
}

export default Camera;
