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
            <div className='answers'></div>
        </div>
    );
};

export default Results;
