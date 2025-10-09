import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <style>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
          z-index: 9999;
        }

        .spinner {
          width: 80px;
          height: 80px;
          border: 8px solid rgba(255, 255, 255, 0.3); /* Light border for outer circle */
          border-top: 8px solid #3498db; /* Blue color for the rotating section */
          border-radius: 50%;
          animation: spin 1.5s linear infinite; /* Spins infinitely with a smooth animation */
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
