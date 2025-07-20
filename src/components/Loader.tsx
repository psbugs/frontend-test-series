import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-70 shadow-lg"></div>
      <span className="ml-4 text-xl font-semibold text-blue-600 animate-pulse">Loading, please wait...</span>
    </div>
  );
};

export default Loader;
