import React from 'react';
import Lottie from 'lottie-web';
import animationData from './chatAnimation.json';

const ChatAnimation = () => {
  React.useEffect(() => {
    // Create a Lottie instance
    const lottieInstance = Lottie.loadAnimation({
      container: document.getElementById('lottie-container'), 
      animationData: animationData,
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
      <div id="lottie-container" style={{ width: '40%', maxWidth: '600px', height: 'auto', marginBottom: '32px' }}>
      </div>
    </div>
  );
};

export default ChatAnimation;
