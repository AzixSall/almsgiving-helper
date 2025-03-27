
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-6 sm:px-8 flex justify-center items-center animate-fade-in">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center text-zakat-900">
          Zakat Calculator
        </h1>
        <div className="h-1 w-16 bg-zakat-500 rounded-full mt-2"></div>
        <p className="mt-3 text-zakat-700 text-center text-sm max-w-md">
          Calculate your annual Zakat obligation with precision and ease
        </p>
      </div>
    </header>
  );
};

export default Header;
