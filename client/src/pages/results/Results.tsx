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
            <div className='answers'>
                {userAnswers.map((answer, index) => (
                    <div className='answers__card' key={answer.question_id}>
                        <div className='answers__question'>
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
