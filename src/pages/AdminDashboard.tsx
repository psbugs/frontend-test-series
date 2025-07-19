import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ManageTestSeries from './testSeries/ManageTestSeries';
import AnalyticsDashboard from './testSeries/AnalyticsDashboard';
import CreateNewTest from './testSeries/CreateNewTest';
import BulkUpload from './testSeries/BulkUpload';
import { logout } from '../app/slices/usersSlice';
import { persistor } from '../app/store';


const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState('manage');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // redirect to login route
    persistor.purge();
  };

  const renderPanel = () => {
    switch (activePanel) {
      case 'manage':
        return <ManageTestSeries />;
      case 'create':
        return <CreateNewTest onClose={() => {}} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'upload':
        return <BulkUpload />;
      default:
        return <ManageTestSeries />;
    }
  };

  return (
    <div className="min-h-screen bg-cyan-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">🧑‍🏫 Admin Dashboard</h2>
            <p className="text-gray-600">Welcome, Praveen (instructor)</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-800 text-white rounded-lg p-4 mr-6">
            <h3 className="font-semibold text-lg mb-4">Admin Panel</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => setActivePanel('manage')}>
                📋 Manage Test Series
              </li>
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => setActivePanel('create')}>
                ➕ Create New Test
              </li>
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => setActivePanel('analytics')}>
                📊 Analytics Dashboard
              </li>
              <li className="cursor-pointer hover:text-cyan-300" onClick={() => setActivePanel('upload')}>
                📤 Bulk Upload
              </li>
            </ul>
          </aside>

          <div className="flex-grow">{renderPanel()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
