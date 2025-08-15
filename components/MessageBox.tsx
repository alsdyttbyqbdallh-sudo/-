
import React from 'react';

interface MessageBoxProps {
  message?: string;
  type?: 'success' | 'error';
  isVisible: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, type, isVisible }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 p-4 text-white rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
        isVisible ? 'scale-100' : 'scale-0'
      } ${bgColor}`}
    >
      {message}
    </div>
  );
};

export default MessageBox;
