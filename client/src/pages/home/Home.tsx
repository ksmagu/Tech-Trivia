import React, { useState } from 'react';
import CheckBox from '../../components/checkBox/CheckBox';
import BigButton from '../../components/bigButton/BigButton';
import Monster from '../../monster.png';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import { Answers } from '../../modules';



interface HomeProps {
    selectedTopic: string;
    setSelectedTopic: React.Dispatch<React.SetStateAction<string>>;
    setUserAnswers: React.Dispatch<React.SetStateAction<Answers[]>>;
}

const Home: React.FC<HomeProps> = ({ selectedTopic, setSelectedTopic, setUserAnswers}) => {
    const [activeButton, setActiveButton] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const Navigate = useNavigate();

    const handleClick = (event: React.FormEvent<Element>) => {
        // Listening to click and setting topic of clicked button
        const topic = event.currentTarget.textContent || '';
        console.log(`Selected topic: ${topic}`);

        // Setting the active button and topic
        setActiveButton(topic);
        if (topic === 'I know it all') {
            setSelectedTopic('All');
        } else {
            setSelectedTopic(topic);
        }
        // Clearing error message
        setErrorMessage('');
    };

    const handleStartClick = () => {
        setUserAnswers([]);
        if (!selectedTopic) {
            // Show error message if topic is not selected
            setErrorMessage('Just select one of the orange buttons above!:)');
            return;
        }
        // Navigate to the Questions page with the selected topic
        Navigate(`/questions?topic=${selectedTopic}`);
        console.log(`Starting trivia for ${selectedTopic}`);
    };

    return (
        <div className='wrapper'>
            <div className='topHalf'>
                <img className='topHalf__monster' src={Monster} alt='img' />
                <div className='topHalf__welcome'>
                    <h2>WELCOME TO</h2>
                    {/* <h2>to</h2> */}
                    <h1>TECH-TRIVIA</h1>
                </div>
                <img className='topHalf__monster' src={Monster} alt='img' />
            </div>
            <div className='bottomHalf'>
                <h1 className='bottomHalf__start'>
                    Let's get started! Select a topic:
                </h1>
                <div className='bottomHalf__topics'>
                    <CheckBox
                        color='$orange'
                        onClick={handleClick}
                        active={activeButton === 'HTML'}
                    >
                        HTML
                    </CheckBox>
                    <CheckBox
                        color='$orange'
                        onClick={handleClick}
                        active={activeButton === 'CSS'}
                    >
                        CSS
                    </CheckBox>
                    <CheckBox
                        color='$orange'
                        onClick={handleClick}
                        active={activeButton === 'React'}
                    >
                        React
                    </CheckBox>
                    <CheckBox
                        color='$orange'
                        onClick={handleClick}
                        active={activeButton === 'JavaScript'}
                    >
                        JavaScript
                    </CheckBox>
                    <CheckBox
                        color='$orange'
                        onClick={handleClick}
                        active={activeButton === 'I know it all'}
                    >
                        I know it all
                    </CheckBox>
                </div>
                <div>
                    <BigButton color='$yellow' onClick={handleStartClick}>
                        START
                    </BigButton>
                </div>
                {/* Showing error message if topic is not selected */}
                {errorMessage ? (
                    <p className='bottomHalf__error'>{errorMessage}</p>
                ) : (
                    <p className='bottomHalf__error'></p>
                )}
            </div>
        </div>
    );
};

export default Home;
