import React from 'react';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 mt-10 sm:mt-20 p-6 relative">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-red-500 transition text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;