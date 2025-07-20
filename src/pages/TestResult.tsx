import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchTestResult } from '../app/slices/learnerTestSlice';

const TestResult: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.users);
  const { result, loading, error } = useSelector((state: RootState) => state.learnerTest);
  useEffect(() => {
    if (user && testId ) {
      dispatch(fetchTestResult({ userId: user.id, testId }));
    }
  }, [dispatch, user, testId]);

  if (!user) {
    return <div className="text-red-600">User not found. Please login again.</div>;
  }

  if (loading) {
    return <div className="text-gray-500">Loading result...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!result) {
    return <div className="text-gray-600">No result available.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">📊 Test Result</h2>

      <p><strong>Test Title:</strong> {result.testTitle}</p>
      <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
      <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
      <p><strong>Correct Answers:</strong> {result.correctAnswers}</p>
      <p><strong>Incorrect Answers:</strong> {result.incorrectAnswers}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Answer Review:</h3>
        {result.answers?.map((item: any, index: number) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <p className="font-medium">Q{index + 1}: {item.question}</p>
            <p className="text-sm">Your Answer: <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>{item.yourAnswer}</span></p>
            <p className="text-sm">Correct Answer: <span className="text-blue-600">{item.correctAnswer}</span></p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/learner-dashboard')}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default TestResult;