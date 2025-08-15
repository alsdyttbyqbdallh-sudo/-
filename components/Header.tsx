
import React from 'react';

interface HeaderProps {
  title: string;
  color: string;
}

const Header: React.FC<HeaderProps> = ({ title, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="p-4 flex items-center justify-between shadow-md transition-colors duration-300"
    >
      <h1 className="text-white text-lg font-bold">{title}</h1>
      <div className="flex items-center space-x-2 space-x-reverse">
        <button className="text-white text-2xl p-1 rounded-md hover:bg-black hover:bg-opacity-20 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
