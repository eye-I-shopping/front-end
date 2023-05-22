import React, { useRef, useEffect, useState } from "react";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./Camera.css";

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

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
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const dataUrl = canvas.toDataURL("image/png");
    setImageData(dataUrl);
    console.log(dataUrl);
  };

  useEffect(() => {
    const constraints = isIOS()
      ? { video: { facingMode: { exact: "environment" } } }
      : { video: { facingMode: "environment" } };

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
      <video ref={videoRef} autoPlay={true} />
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
              <ListItemText primary="Option 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Option 2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Option 3" />
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
