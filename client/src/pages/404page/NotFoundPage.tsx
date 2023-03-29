import React from 'react';
import './notFoundPage.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="wrapperr">
        <h1 className="title">404</h1>
        <div className="message">
          <p>Oops! The page you requested was not found.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
