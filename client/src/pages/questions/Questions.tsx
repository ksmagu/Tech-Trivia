import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import './questions.scss';
import { useNavigate } from 'react-router-dom';
import { AnswersArray, Answers } from '../../modules';

interface QuestionsArray {
    id: number;
    topic: string;
    question: string;
    answers: AnswersArray[];
}
interface Props {
    userAnswers: Answers[];
    setUserAnswers: React.Dispatch<React.SetStateAction<Answers[]>>;
    selectedTopic: string;
}

const Questions: React.FC<Props> = ({
    selectedTopic,
    userAnswers,
    setUserAnswers,
}) => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<QuestionsArray[]>([]); // Saves fetched questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Keep track of the current question index
    const [noAnswerChosen, setNoAnswerChosen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    console.log(userAnswers);
    console.log(window.history.state);
    // navigates back to main page if page reloaded
    useEffect(() => {
        if (!selectedTopic) {
            navigate('/');
        }
    }, [selectedTopic, navigate]);

    // getting questions for selected topic
    useEffect(() => {
        const fetchQuestions = async () => {
            // navigates back to main page if page reloaded
            if (!selectedTopic) {
                navigate('/');
            }
            try {
                const response: Response = await fetch(
                    `http://localhost:8080/questions?topic=${selectedTopic}`
                );
                const data = await response.json();
                setQuestions(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchQuestions();
    }, [selectedTopic, navigate]);

    // On button moves to next question
    const nextQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        // checking if current question has an answer chosen
        if (userAnswers[currentQuestionIndex]?.users_answer) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Increment the current question index on button click
        } else {
            // if there in no answer chosen setting the state
            setNoAnswerChosen(true);
        }
    };
    // on button click moving back to previous question
    const previousQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    // on the last question button click relocates to show results
    const showResults = (e: React.FormEvent) => {
        if (userAnswers[currentQuestionIndex]?.users_answer) {
            navigate('/results');
        } else {
            // if there in no answer chosen setting the state
            setNoAnswerChosen(true);
        }
        e.preventDefault();
        console.log(e.currentTarget.textContent);
    };

    // saving user answers to an array
    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if event happens(user choose the answerId, setting state back to false)
        setNoAnswerChosen(false);
        // defining data to be used
        const questionId = questions[currentQuestionIndex].id; // saving current question ID
        const answerId = Number(e.target.id); // saving answer id to the current question

        // saving data for chosen user answer
        const userAnswer = {
            question_id: questions[currentQuestionIndex].id,
            answer_id: answerId,
            answer: e.target.value,
        };
        /* to check if answer was already provided for current question we need to check 
        if there is answer.question_id === questionId in the array and getting its index
        */

        const questionIndex = userAnswers.findIndex(
            (answer) => answer.question_id === questionId
        );

        /* now we can check if there is already answer for current question.
       .findindex() returns index of the array that suits the condition, else it returns -1.
       So we can check the status to know if  answers was provided. If questionIndex > -1 yes we changed array entry:
       */
        if (questionIndex > -1) {
            const updatedAnswers = [...userAnswers];
            updatedAnswers[questionIndex] = {
                ...updatedAnswers[questionIndex],
                users_answer: userAnswer,
            };
            setUserAnswers(updatedAnswers);
            // else we add new data to the array
        } else {
            setUserAnswers([
                ...userAnswers,
                {
                    question_id: questionId,
                    question: questions[currentQuestionIndex].question,
                    answers: questions[currentQuestionIndex].answers,
                    users_answer: userAnswer,
                },
            ]);
        }
    };

    // logic for disabling back button if its on the first question and to reset user answers if its on the first question
    useEffect(() => {
        if (currentQuestionIndex === 0) {
            setUserAnswers([]);
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [disabled, currentQuestionIndex, setUserAnswers]);

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
        <>
            <div className='output'>
                {/* if there are questions fetched returns questions with current indx */}
                {questions.length > 0 && (
                    <form
                        className='output__card'
                        key={questions[currentQuestionIndex].id}
                    >
                        {/* to show topic of the current question */}
                        <h2 className='output__topic'>
                            {`${questions[
                                currentQuestionIndex
                            ].topic.toUpperCase()} question`}
                        </h2>
                        <div className='output__counter'>
                            <p>
                                Question {currentQuestionIndex + 1} out of{' '}
                                {questions.length}
                            </p>
                        </div>
                        <h2 className='output__question'>
                            {questions[currentQuestionIndex].question}
                        </h2>
                        {/*maps through all answers for current question and displays them  */}
                        {questions[currentQuestionIndex].answers.map(
                            (answer) => (
                                <div
                                    className='output__answers'
                                    key={answer.id}
                                >
                                    <input
                                        type='radio'
                                        id={answer.id.toString()}
                                        name={questions[
                                            currentQuestionIndex
                                        ].id.toString()}
                                        onChange={(e) => handleAnswerChange(e)}
                                        value={answer.answer}
                                        // this checks if answer id matches the ID of the user answer and to display answer as marked if it was chosen before
                                        checked={
                                            userAnswers[currentQuestionIndex] &&
                                            answer.id ===
                                                userAnswers[
                                                    currentQuestionIndex
                                                ].users_answer.answer_id
                                        }
                                    />
                                    <label htmlFor={answer.id.toString()}>
                                        {answer.answer}
                                    </label>
                                </div>
                            )
                        )}
                        <Button
                            color='$purple'
                            disabled={disabled}
                            onClick={(e) => previousQuestion(e)}
                        >
                            BACK
                        </Button>

                        {currentQuestionIndex < questions.length - 1 ? ( // Only show the NEXT button if there are more questions to display
                            <Button
                                disabled={false}
                                color='$purple'
                                onClick={(e) => nextQuestion(e)}
                            >
                                NEXT
                            </Button>
                        ) : (
                            // Display a FINISH button instead of NEXT button for the last question
                            <Button
                                disabled={false}
                                color='$purple'
                                onClick={(e) => showResults(e)}
                            >
                                FINISH
                            </Button>
                        )}
                        {/* If answer was not chosen displays error message */}
                        {noAnswerChosen ? (
                            <div className='output__error'>
                                <p>If you don't know just guess!</p>
                            </div>
                        ) : (
                            <div className='output__error'></div>
                        )}
                    </form>
                )}
            </div>
        </>
    );
};

export default Questions;
