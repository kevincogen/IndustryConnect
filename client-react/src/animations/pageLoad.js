import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import pageLoad from './pageLoad.json'

const PageLoad = () => {
  useEffect(() => {
    // Create a Lottie instance
    const lottieInstance = Lottie.loadAnimation({
      container: document.getElementById('lottie-container'), 
      animationData: pageLoad,
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
      <div id="lottie-container" style={{ width: '80%', maxWidth: '600px', height: 'auto', marginBottom: '32px' }}>
      </div>
    </div>
  );
};

export default PageLoad;
