import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Show header only on login and register pages
  const showHeader = location.pathname === '/' || location.pathname === '/register';

  if (!showHeader) return null;

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
        Test Series
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </div>
    </header>
  );
};

export default Header;
