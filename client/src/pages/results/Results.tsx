import React from 'react';
import { Answers } from '../../modules';

interface Props {
    userAnswers: Answers[];
}

const Results = ({ userAnswers }: Props) => {
    console.log(userAnswers);
    return <div>Results</div>;
};

export default Results;
