import React, { useState } from 'react';
import Button from '../../components/button/Button';
import BigButton from '../../components/bigButton/BigButton';
import Monster from '../../monster.png';
import './home.scss';

const Home: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState('');

    const handleClick = (topic: string) => {
        console.log(`Selected topic: ${topic}`);
        setSelectedTopic(topic);
    };

    const handleStartClick = () => {
        console.log(`Starting trivia for ${selectedTopic}`);
        // TODO: Load trivia questions for selected topic

    
    };

    return (
        <>
        <div className='wrapper'>
            <div className='topHalf'>
                <img className='monster' src={Monster} alt='img' />
                <div className='welcome'>
                    <h2>WELCOME </h2>
                    <h2>to</h2>
                    <h1>TECH TRIVIA</h1>
                </div>
                <img className='monster' src={Monster} alt='img' />
            </div>
            <div className='bottomHalf'>
                <h1 className='start'>Let's get started! Choose a topic:</h1>
                <div className='topics'>
                    <Button color='$orange' onClick={() => handleClick('HTML')}>
                        HTML
                    </Button>
                    <Button color='$orange' onClick={() => handleClick('CSS')}>
                        CSS
                    </Button>
                    <Button color='$orange' onClick={() => handleClick('React')}>
                        React
                    </Button>
                    <Button color='$orange' onClick={() => handleClick('JavaScript')}>
                        JavaScript
                    </Button>
                    <Button color='$orange' onClick={() => handleClick('I know it all')}>
                        I know it all
                    </Button>
                </div>
                <div>
                    <BigButton color='$yellow' onClick={handleStartClick} >
                        START
                    </BigButton>
                </div>

            </div>
            </div>
        </>
    );
};

export default Home;
