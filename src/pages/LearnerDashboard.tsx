import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { fetchLearnerTests } from '../app/slices/learnerTestSlice';
import StartTest, { Question } from './StartTest';

interface Test {
  _id: string;
  title: string;
  status: 'completed' | 'not_attempted';
  questions: Question[]; // ✅ This is required
}

const LearnerDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.users);
  const { tests, loading, error } = useSelector((state: RootState) => state.learnerTest);

  const [isShowStartTest, setIsShowStartTest] = useState(false);
  const [testItem, setTestItem] = useState<Test | null>(null);

  useEffect(() => {
    // if (user?._id) {
      dispatch(fetchLearnerTests(user.id));
    // }
  }, [dispatch, user?.id]);
  
  // Add default status if not present in API response
  const transformedTests: Test[] = tests.map((test: any) => ({
    ...test,
    status: test.status || 'not_attempted', // default fallback

  }));

  const handleStartTest = (test: Test) => {
    setTestItem(test);
    setIsShowStartTest(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎓 Learner Dashboard</h1>
      <p className="text-lg mb-6">Welcome, {user?.name || 'Learner'}!</p>

      {!isShowStartTest && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">📚 My Tests</h2>

            {loading && <p className="text-gray-500">Loading tests...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && transformedTests.length === 0 && (
              <p className="text-gray-600">No active tests assigned to you.</p>
            )}

            {!loading &&
              transformedTests.map((test) => (
                <div
                  key={test._id}
                  className="border p-4 rounded-lg my-3 flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <h3 className="text-md font-semibold">{test.title}</h3>
                    <p className="text-sm text-gray-600">
                      {test.status === 'completed' ? '✅ Attempted' : '🕒 Not Attempted'}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-2 md:mt-0">
                    {test.status === 'completed' ? (
                      <button
                        className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm"
                        onClick={() => navigate(`/test-series/result/${test._id}`)}
                      >
                        View Result
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => handleStartTest(test)}
                      >
                        Start Test
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">📈 My Scores</h2>
            <p>View your performance history and test analytics.</p>
            <button
              onClick={() => navigate(`/test-series/result/${user?.id}`)}
              className="mt-3 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm"
            >
              View All Results
            </button>
          </div>
        </div>
      )}

      {isShowStartTest && testItem && <StartTest test={testItem}  />}
    </div>
  );
};

export default LearnerDashboard;
