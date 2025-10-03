import React from 'react';

const EmptyDashboard: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
            {/* Stylized "Empty Database" Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32 text-slate-400 dark:text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
            >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                {/* Slash to indicate "empty" or "unavailable" */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15" />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-slate-800 dark:text-slate-100">
                No Employee Data Available
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
                The database is currently empty. Add employee records to populate the dashboard.
            </p>
        </div>
    );
};

export default EmptyDashboard;
