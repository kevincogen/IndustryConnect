import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import matchAnimation from './matchAnimation.json'

const MatchAnimation = () => {
  useEffect(() => {
    // Create a Lottie instance
    const lottieInstance = Lottie.loadAnimation({
      container: document.getElementById('match-lottie-container'), 
      animationData: matchAnimation,
      loop: false, // Play only once
      autoplay: true,
    });

    // Clean up when the component unmounts
    return () => {
      lottieInstance.destroy();
    };
  }, []);

  return (
    <div id="match-lottie-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ width: '20%', maxWidth: '600px', height: 'auto', marginBottom: '32px' }}>
      </div>
    </div>
  );
};

export default MatchAnimation;

