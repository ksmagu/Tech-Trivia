import React from 'react';
import './notFoundPage.scss';
import Monster from '../../monster.png';

const NotFoundPage: React.FC = () => {
    return (
        <div className='notFoundPage'>
            <div className='notFoundPage__wrapper'>
                <img className='monster' src={Monster} alt='img' />
                <div>
                    <h1 className='notFoundPage__title'>404</h1>
                    <div className='notFoundPage__message'>
                        <p>Oops! The page you requested was not found.</p>
                    </div>
                </div>

                <img className='monster' src={Monster} alt='img' />
            </div>
        </div>
    );
};

export default NotFoundPage;
