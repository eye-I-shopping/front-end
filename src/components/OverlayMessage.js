import React from 'react';

const OverlayMessage = ({ isVisible, message }) => {
  return (
    isVisible && (
      <div style={{
        position: 'fixed',
        top: '35%',
        bottom: '35%',
        left: '10%',
        right: '10%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
        padding: '20px',
        zIndex: 100,
        boxSizing: 'border-box',
        fontSize: "calc(1.5vw + 1.5vh)",
      }}>
        {message}
      </div>
    )
  );
};

export default OverlayMessage;
