import React from 'react';
import './results.scss';
import { Answers } from '../../modules';
import './results.scss';

interface Props {
    userAnswers: Answers[];
}

const Results = ({ userAnswers }: Props) => {
    console.log(userAnswers);
    return (
        <div className='results'>
            <div className='score'>
                <h2 className='score__title'> YOUR SCORE</h2>
                <div className='score__count'> 10 out of 20</div>
                <h1 className="score__percent"> 50%</h1>
                <div className="score__text"> Well, you need some studying to do!</div>
            </div>

            <div className='answers'>
                {userAnswers.map((answer, index) => (
                    <div className='answers__card' key={answer.question_id}>
                        <div className='answers__question answers__question--correct'>
                            <h3>{answer.question}</h3>

                            <p>
                                {index + 1}/{userAnswers.length}
                            </p>
                        </div>
                        <div className='answers__possibleAnswers'>
                            <ul>
                                {answer.answers.map((possibleAnswer) => (
                                    <li key={possibleAnswer.id}>
                                        {possibleAnswer.answer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;
