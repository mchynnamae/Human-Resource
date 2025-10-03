import React from 'react';

const EmptyDashboard: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32 text-slate-400 dark:text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-slate-700 dark:text-slate-300">
                No Employee Data Available
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
                The database is currently empty. Add employee records to populate the dashboard.
            </p>
        </div>
    );
};

export default EmptyDashboard;
