import React from 'react';
import './notFoundPage.scss';
import Monster from '../../monster.png';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';


const NotFoundPage: React.FC = () => {

  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate(`/`);
  }

  return (
    <div className='notFoundPage'>
      <div className='notFoundPage__wrapper'>
        <img className='monster' src={Monster} alt='img' />
        <div>
          <h1 className='notFoundPage__title'>404</h1>
          <div className='notFoundPage__message'>
            <p>Oops! The page you requested was not found.</p>
            <Button color='#f2c037' onClick={handleClick}>Back to Trivia</Button>
          </div>
        </div>
        <img className='monster' src={Monster} alt='img' />
      </div>
    </div>
  );
};

export default NotFoundPage;