import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import './NotFound.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to={ROUTES.LANDING} className="back-home-button">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage; 