import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import connectAnimation from './connectAnimation.json'

const ConnectAnimation = () => {
  useEffect(() => {
    // Create a Lottie instance
    const lottieInstance = Lottie.loadAnimation({
      container: document.getElementById('lottie-container'), 
      animationData: connectAnimation,
      loop: true,
      autoplay: true,
    });

    // Clean up when the component unmounts
    return () => {
      lottieInstance.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div id="lottie-container" style={{ minWidth: '400px', height: 'auto', marginBottom: '32px' }}>
      </div>
    </div>
  );
};

export default ConnectAnimation;
