import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    const [page, setPage] = useState<'landing' | 'dashboard'>('landing');

    const handleEnterDashboard = () => {
        setPage('dashboard');
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
            {page === 'landing' ? (
                <LandingPage onEnter={handleEnterDashboard} />
            ) : (
                <Dashboard />
            )}
        </div>
    );
};

export default App;
