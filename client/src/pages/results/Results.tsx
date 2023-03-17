import React from 'react';
import './results.scss';
import { Answers } from '../../modules';
import './results.scss';
import { GiCrossMark, GiCheckMark } from 'react-icons/gi';
interface Props {
    userAnswers: Answers[];
}

const Results = ({ userAnswers }: Props) => {
    console.log(userAnswers);

    let correctCount = 0;
    //iterating over an array of user answers and checking if each user's selected answer is correct.
    //The find() method is used to determine which answer was selected by the user for a particular question,
    //by matching the id of the answer with the answer_id selected by the user.
    //If a match is found, the selectedAnswer is set to the correct answer object.
    userAnswers.forEach((answer) => {
        const selectedAnswer = answer.answers.find(
            (a) => a.id === answer.users_answer.answer_id
        );
        if (selectedAnswer?.correct) {
            correctCount++;
        }
    });
    //Counting percentage of correct answers
    const scorePercent = Math.round((correctCount / userAnswers.length) * 100);

    return (
        <div className='results'>
            <div className='score'>
                <h2 className='score__title'>YOUR SCORE</h2>
                <div className='score__count'>
                    {correctCount} out of {userAnswers.length}
                </div>
                <h1 className='score__percent'>{scorePercent}%</h1>
                <div className='score__text'>
                    {scorePercent === 100
                        ? 'Perfect! Hard work pays off!'
                        : scorePercent >= 80
                        ? 'Well done! almost perfect. Can you make it perfect?'
                        : scorePercent >= 70
                        ? 'Not bad, but you can do better!'
                        : scorePercent >= 50
                        ? 'Well, good, but maybe study a little more!'
                        : 'Well, you need some serious studying to do!'}
                </div>
            </div>

            <div className='answers'>
                {userAnswers.map((answer, index) => {
                    // using find method to find and answer from answers array  where question ID matches question ID from user_answer
                    const selectedAnswer = answer.answers.find(
                        (a) => a.id === answer.users_answer.answer_id
                    );

                    return (
                        <div className='answers__card' key={answer.question_id}>
                            <div
                                // styling class used based on if answer was correct
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
                                    {answer.answers.map((possibleAnswer) => {
                                        // Add logic to styles each answer next ====>
                                        return (
                                            <li key={possibleAnswer.id}>
                                                {possibleAnswer.answer}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Results;
