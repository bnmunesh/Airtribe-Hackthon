import React, { useState } from 'react';
import axios from 'axios';

function QuizGenerator() {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');

    const generateQuiz = async () => {
        try {
            setError('');  // Reset any previous error
            setQuiz(null); // Clear previous quiz data
            const response = await axios.post('http://localhost:3001/generate-quiz', {
                topic,
                difficulty

            });
            setQuiz(response.data.content[0].text);
        } catch (err) {
            setError('Error generating quiz');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Quiz Generator</h1>
            <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <input
                type="text"
                placeholder="Difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            />
            <button onClick={generateQuiz}>Generate Quiz</button>
            {error && <p>{error}</p>}
            {quiz ? (
                <div>
                    <h2>Generated Quiz</h2>
                   <pre> {
                        quiz
                    }</pre>
                </div>
            ) : (
                <p>No quiz data available.</p>
            )}
        </div>
    );
}

export default QuizGenerator;