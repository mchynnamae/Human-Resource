
import React from 'react';
import { Employee } from '../types';

interface HeaderProps {
    onMenuClick: () => void;
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchResults: Employee[];
    onEmployeeSelect: (employee: Employee) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, searchTerm, onSearchChange, searchResults, onEmployeeSelect }) => {
    return (
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between">
            {/* Left side: Menu and Title */}
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Open Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">HR DASHBOARD</h1>
            </div>

            {/* Search Bar with Live Suggestions (CRITICAL INTERACTIVE FEATURE FIX) */}
            <div className="relative w-full max-w-lg mx-4">
                <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-slate-400 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                        type="text"
                        placeholder="Search by Name, ID, Title..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full bg-transparent p-3 rounded-full focus:outline-none text-sm text-gray-700 dark:text-slate-200"
                    />
                </div>
                
                {/* Search Results Dropdown - Crash Fix Applied */}
                {(searchResults.length > 0 && searchTerm.length > 1) && (
                    <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                        {searchResults.map((employee, index) => (
                            <div 
                                key={employee.employee_id || index} // Use employee_id or fallback to index for safety
                                onClick={() => onEmployeeSelect(employee)}
                                className="p-3 hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-slate-600 last:border-b-0"
                            >
                                <p className="font-semibold text-gray-900 dark:text-slate-100">{employee.full_name || 'N/A'}</p>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400">{employee.job_title || 'N/A'}</p>
                            </div>
                        ))}
                        <div className="p-2 text-xs text-center text-gray-500 dark:text-slate-400">Click to view full profile</div>
                    </div>
                )}
            </div>

            {/* Right side: Admin Profile */}
            <div className="flex items-center gap-2">
                 <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-300">Admin</span>
                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </div>
        </header>
    );
};

export default Header;
