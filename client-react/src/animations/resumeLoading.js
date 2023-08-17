import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import resumeLoading from './resumeLoading.json';

const ResumeLoading = () => {
  useEffect(() => {
    // Create a Lottie instance
    const lottieInstance = Lottie.loadAnimation({
      container: document.getElementById('lottie-container'), 
      animationData: resumeLoading,
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
      <div id="lottie-container" style={{ width: '50vw', height: '50vh' }}>
      </div>
    </div>
  );
};

export default ResumeLoading;
