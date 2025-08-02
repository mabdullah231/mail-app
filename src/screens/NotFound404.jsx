import React from 'react';

const NotFound404 = () => {
  const goBack = () => {
    const user = localStorage.getItem('user');
    if (user) {
      // Redirect to home page if user exists in localStorage
      window.location.href = '/';
    } else {
      // Redirect to sign-in page if no user in localStorage
      window.location.href = '/auth/sign-in';
    }
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <button className="go-back-btn" onClick={goBack}>Go Back</button>

      {/* Scoped CSS */}
      <style jsx>{`
        .not-found-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
          text-align: center;
        }

        .not-found-heading {
          font-size: 3rem;
          color: #333;
          margin-bottom: 20px;
        }

        .go-back-btn {
          padding: 10px 20px;
          font-size: 1.2rem;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .go-back-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default NotFound404;
