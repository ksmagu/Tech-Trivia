import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/404page/NotFoundPage';
import Home from './pages/home/Home';
import Questions from './pages/questions/Questions';
import Results from './pages/results/Results';
import './App.css';
import { useState } from 'react';
import { Answers } from './modules';

const App: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [userAnswers, setUserAnswers] = useState<Answers[]>([]);
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Home
                        setUserAnswers={setUserAnswers}
                        selectedTopic={selectedTopic}
                        setSelectedTopic={setSelectedTopic}
                    />
                }
            />
            <Route
                path='/questions'
                element={
                    <Questions
                        selectedTopic={selectedTopic}
                        userAnswers={userAnswers}
                        setUserAnswers={setUserAnswers}
                    />
                }
            />
            <Route
                path='/results'
                element={
                    <Results
                        userAnswers={userAnswers}
                        setUserAnswers={setUserAnswers}
                        selectedTopic={selectedTopic}
                    />
                }
            />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default App;
