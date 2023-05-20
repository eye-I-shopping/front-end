import React, { useRef, useEffect, useState } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Camera.css";

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState(null);

  const capture = () => {
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
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
    }
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="camera">
      <video ref={videoRef} autoPlay={true} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="camera-controls">
        <Button variant="contained" color="primary" onClick={capture}>
          Capture
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MenuIcon />}
          onClick={showDrawer}
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
        <Drawer anchor="right" open={visible} onClose={onClose}>
          <List>
            <ListItem button>
              <ListItemText primary="Option 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Option 2" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Option 3" />
            </ListItem>
          </List>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close Menu
          </Button>
        </Drawer>
      </div>
    </div>
  );
}

export default Camera;
