import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart2, Users, TrendingUp, Award } from 'lucide-react';
import { fetchAnalytics } from '../../app/slices/analyticsSlice';
import { AppDispatch, RootState } from '../../app/store';

const AnalyticsDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    participants,
    averageScore,
    topPerformers,
    scoreDistribution,
    loading,
    error,
  } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        📊 Analytics Dashboard
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading analytics...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Participants */}
          <div className="p-4 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-2">
              <Users className="text-blue-600" size={28} />
              <h3 className="text-lg font-bold">Total Participants</h3>
            </div>
            <p className="text-gray-800 text-xl font-semibold">{participants}</p>
          </div>

          {/* Average Score */}
          <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-2">
              <TrendingUp className="text-green-600" size={28} />
              <h3 className="text-lg font-bold">Average Score</h3>
            </div>
            <p className="text-gray-800 text-xl font-semibold">{averageScore}</p>
          </div>

          {/* Top Performers */}
          <div className="p-4 bg-yellow-50 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-2">
              <Award className="text-yellow-600" size={28} />
              <h3 className="text-lg font-bold">Top 10 Performers</h3>
            </div>
            <ul className="list-decimal list-inside text-gray-700">
              {topPerformers?.slice(0, 10).map((performer, index) => (
                <li key={index}>Score: {performer.score}</li>
              ))}
            </ul>
          </div>

          {/* Score Distribution */}
          <div className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-2">
              <BarChart2 className="text-purple-600" size={28} />
              <h3 className="text-lg font-bold">Score Distribution</h3>
            </div>
            <ul className="text-gray-700 text-sm max-h-48 overflow-y-auto">
              {scoreDistribution?.map((range:any, index) => (
                <li key={index} className="flex justify-between">
                  <span>{range.range}</span>
                  <span>{range.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
