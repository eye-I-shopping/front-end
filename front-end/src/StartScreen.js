import React from 'react';
import logoImage from './image/logo.png';
import './StartScreen.css';

function StartScreen() {
  return (
    <div className="main-screen">
      <img src={logoImage} alt="Logo" className="logo" />
    </div>
  );
}

export default StartScreen;