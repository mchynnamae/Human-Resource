
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Loading Data...</p>
        </div>
    );
};

export default LoadingSpinner;
