import React, { useState, useEffect } from 'react';
import './results.scss';
import { Answers } from '../../modules';
import Button from '../../components/button/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Monster from '../../monster.png';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { RxDotFilled } from 'react-icons/rx';

interface Props {
    userAnswers: Answers[];
    setUserAnswers: React.Dispatch<React.SetStateAction<Answers[]>>;
    selectedTopic: string;
}

const Results = ({ userAnswers, setUserAnswers, selectedTopic }: Props) => {
    console.log(userAnswers);
    const navigate = useNavigate();

    // Counting the number of correct answers given by a user by looping
    // through an array of userAnswers, finding the selected answer for each question,
    // and incrementing a counter for each correct answer.
    let correctCount = 0;
    userAnswers.forEach((answer) => {
        const selectedAnswer = answer.answers.find(
            (a) => a.id === answer.users_answer.answer_id
        );
        if (selectedAnswer?.correct) {
            correctCount++;
        }
    });
    const scorePercent = Math.round((correctCount / userAnswers.length) * 100);

    const [showAnswers, setShowAnswers] = useState(false);

    //Button logic
    const toggleAnswers = () => {
        setShowAnswers(!showAnswers);
    };

    const backHome = () => {
        setUserAnswers([]);
        navigate('/');
    };
    const tryAgain = () => {
        setUserAnswers([]);
        navigate(`/questions?topic=${selectedTopic}`);
    };

    // navigates back to main page if page reloaded
    useEffect(() => {
        if (userAnswers.length === 0) {
            navigate('/');
        }
    }, [userAnswers, navigate]);

    // logic for popup for page reload

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = `Are you sure you want to leave?`;
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className='results'>
            <div className='results__center'>
                <img className='monster' src={Monster} alt='img' />
                <div className='score'>
                    <h2 className='score__title'>YOUR SCORE</h2>
                    <div className='score__count'>
                        Correct <br />
                        {correctCount} out of {userAnswers.length}
                    </div>
                    <h1 className='score__percent'>{scorePercent}%</h1>
                    <div className='score__text'>
                        {scorePercent === 100
                            ? 'Perfect! Hard work pays off!'
                            : scorePercent >= 80
                            ? 'Well done! almost perfect. Can you make it perfect?'
                            : scorePercent >= 70
                            ? 'Good, but you can do better!'
                            : scorePercent >= 50
                            ? 'Not bad, but maybe study a little more!'
                            : 'Well, you need some serious studying to do!'}
                    </div>
                </div>
                <img className='monster' src={Monster} alt='img' />
            </div>

            <div className='buttons'>
                <Button
                    disabled={false}
                    color='#aa7fea'
                    onClick={toggleAnswers}
                >
                    {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </Button>
                <Button disabled={false} onClick={tryAgain} isSecondary='true'>
                    Try Again
                </Button>
                <Button disabled={false} onClick={backHome} isSecondary='true'>
                    Back to Trivia
                </Button>
            </div>

            {showAnswers && (
                <div className='answers'>
                    {userAnswers.map((answer, index) => {
                        const selectedAnswer = answer.answers.find(
                            (a) => a.id === answer.users_answer.answer_id
                        );

                        return (
                            <div
                                className='answers__card'
                                key={answer.question_id}
                            >
                                <div
                                    className={`answers__question ${
                                        selectedAnswer?.correct
                                            ? 'answers__question--correct'
                                            : 'answers__question--incorrect'
                                    }`}
                                >
                                    <h3>{answer.question}</h3>
                                    <p>
                                        {index + 1}/{userAnswers.length}
                                    </p>
                                </div>
                                <div className='answers__possibleAnswers'>
                                    <ul>
                                        {answer.answers.map(
                                            (possibleAnswer) => {
                                                // if user answer and correct answer matches
                                                if (
                                                    possibleAnswer.correct &&
                                                    possibleAnswer.id ===
                                                        answer.users_answer
                                                            .answer_id
                                                ) {
                                                    return (
                                                        <li
                                                            className='answers__option'
                                                            key={
                                                                possibleAnswer.id
                                                            }
                                                        >
                                                            <div className='answer__icon'>
                                                                <FaCheck color='green' />
                                                            </div>
                                                            <div className='answer__text'>
                                                                {
                                                                    possibleAnswer.answer
                                                                }
                                                            </div>
                                                        </li>
                                                    );
                                                    // if user answer is incorrect but it matches answer option
                                                } else if (
                                                    !possibleAnswer.correct &&
                                                    possibleAnswer.id ===
                                                        answer.users_answer
                                                            .answer_id
                                                ) {
                                                    return (
                                                        <li
                                                            className='answers__option'
                                                            key={
                                                                possibleAnswer.id
                                                            }
                                                        >
                                                            <div className='answer__icon'>
                                                                <ImCross color='red' />
                                                            </div>
                                                            <div className='answer__text'>
                                                                {
                                                                    possibleAnswer.answer
                                                                }
                                                            </div>
                                                        </li>
                                                    );
                                                    // if the answer option is correct but not selected by user
                                                } else if (
                                                    possibleAnswer.correct
                                                ) {
                                                    return (
                                                        <li
                                                            className='answers__option'
                                                            key={
                                                                possibleAnswer.id
                                                            }
                                                        >
                                                            <div className='answer__icon'>
                                                                <FaCheck color='green' />
                                                            </div>

                                                            <div className='answer__text'>
                                                                {
                                                                    possibleAnswer.answer
                                                                }
                                                            </div>
                                                        </li>
                                                    );
                                                    // if none of the above is true returns simple li element
                                                } else {
                                                    return (
                                                        <li
                                                            className='answers__option'
                                                            key={
                                                                possibleAnswer.id
                                                            }
                                                        >
                                                            <div className='answer__icon'>
                                                                <RxDotFilled />
                                                            </div>
                                                            <div className='answer__text'>
                                                                {
                                                                    possibleAnswer.answer
                                                                }
                                                            </div>
                                                        </li>
                                                    );
                                                }
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Results;
