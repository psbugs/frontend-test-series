import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchQuestionsForTest, submitLearnerTest } from '../app/slices/learnerTestSlice';

export interface Question {
  _id: string;
  question: string;
  options: string[];
  skillTag?: string;
}

export interface Test {
  _id: string;
  title: string;
  questions?: Question[];
}

interface StartTestProps {
  test?: Test;
}

const QUESTION_TIME_LIMIT = 30;

const StartTest: React.FC<StartTestProps> = ({ test: testFromProps }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.users);
  const { testId: paramTestId } = useParams<{ testId: string }>();
  const questionsFromStore = useSelector((state: RootState) => state.learnerTest.questions);
  const globalLoading = useSelector((state: RootState) => state.learnerTest.loading);

  const [test, setTest] = useState<Test | null>(testFromProps || null);
  const [testId, setTestId] = useState(testFromProps?._id || paramTestId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch questions from Redux slice
  useEffect(() => {
    if (!testFromProps?.questions?.length && testId) {
      dispatch(fetchQuestionsForTest({ testId, questionLimit: 5 }));
    } else if (testFromProps?.questions?.length) {
      const shuffled = shuffleArray(testFromProps.questions);
      setQuestions(shuffled);
      setLocalLoading(false);
    }
  }, [testId, testFromProps, dispatch]);

  // Once questions arrive in store, update local
  useEffect(() => {
    if (questionsFromStore.length > 0) {
      const shuffled = shuffleArray(questionsFromStore);
      setQuestions(shuffled);
      setLocalLoading(false);
    }
  }, [questionsFromStore]);

  // Timer countdown for each question
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext(); // Auto move
          return QUESTION_TIME_LIMIT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const shuffleArray = (arr: Question[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const handleOptionChange = (questionId: string, selected: string) => {
    setAnswers({ ...answers, [questionId]: selected });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(QUESTION_TIME_LIMIT);
    }
  };

  const handleSubmit = () => {
      if (!testId) {
        setError('Test ID is missing. Cannot submit test.');
        return;
      }

      setIsSubmitted(true);
      dispatch(submitLearnerTest({ testId, answers,userId:user.id }))
        .unwrap()
        .then(() => {
          console.log('📊 Test submitted successfully');
        })
        .catch((err) => {
          console.error('Submission failed:', err);
        });
  };

  if (localLoading || globalLoading) return <p className="p-4">⏳ Loading test...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!testId) return <p className="p-4 text-red-500">Test ID is missing.</p>;

  if (isSubmitted) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">✅ Test Submitted</h2>
        <h3 className="text-lg font-semibold mb-2">Your Answers:</h3>
        <ul className="list-disc ml-6">
          {questions.map((q) => (
            <li key={q._id}>
              {q.question} - <strong>{answers[q._id] || 'Not Answered'}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{test?.title || 'Test'}</h2>
      <div className="flex justify-between mb-3">
        <p>⏳ Time Left: <strong>{timeLeft}s</strong></p>
        <p>Question {currentIndex + 1} of {questions.length}</p>
      </div>

      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">{currentQuestion.question}</h3>
        <div className="space-y-2">
          {currentQuestion.options.map((opt, idx) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name={currentQuestion._id}
                value={opt}
                checked={answers[currentQuestion._id] === opt}
                onChange={() => handleOptionChange(currentQuestion._id, opt)}
              />{' '}
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
};

export default StartTest;
