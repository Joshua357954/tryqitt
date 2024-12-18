import React from 'react';
import { FaChevronRight as Right } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ScoreModal = ({ quizResults, callback }) => {
  const navigate = useNavigate()
  const closeModal = () => {
    callback();
    navigate('/pastQuestion?q=practice')
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,.3)]">
      <div className="w-[90%] sm:w-[60%] h-fit bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6">Your Total Score</h2>
        
        <ul className="text-left mb-4">
          {quizResults?.results.map((result) => (
            <li key={result.question} className="mb-2">
              Question {result.question}: {result.isCorrect ? 'Correct' : 'Incorrect'}
            </li>
          ))}
        </ul>

        <p className="text-xl font-semibold">
          Score: {quizResults.score}/{quizResults.totalQuestions}
        </p>
        <p className="text-gray-700">
          Attempted Questions: {quizResults.answeredQuestions} out of {quizResults.totalQuestions}
        </p>

        <Link to="/scoreboard" className="underline underline-offset-4 mt-4 flex items-center">
          Go to Scoreboard <Right className="ml-2" />
        </Link>

        <button
          onClick={closeModal}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Close Modal
        </button>
      </div>
    </section>
  );
};

export default ScoreModal;
