import React from 'react';

interface LandingPageProps {
    onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-slate-800 dark:text-slate-200 p-4">
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight">Human Resource</h1>
                <p className="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-400">Cloud Ink Co.</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Hospital Department Analytics</p>
            </div>
            <div className="w-full flex justify-center pb-8">
                <button
                    onClick={onEnter}
                    aria-label="Open Dashboard"
                    className="group animate-bounce bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
