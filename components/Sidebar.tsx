import React, { useState } from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    departments: string[];
    managers: string[];
    onFilterSelect: (type: 'department' | 'manager', value: string) => void;
    activeFilter: { type: string; value: string };
    resetFilters: () => void;
}

interface SidebarDropdownProps {
    title: string;
    items: string[];
    onSelect: (item: string) => void;
    activeFilter: { type: string; value: string };
    filterType: 'department' | 'manager';
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ title, items, onSelect, activeFilter, filterType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isActive = activeFilter.type === filterType;

    return (
        <div className="mt-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-100 dark:bg-slate-700' : ''} hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300`}
            >
                <span className="font-semibold text-sm uppercase tracking-wider">{title}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            {isOpen && (
                <ul className="mt-2 space-y-1 pl-4 border-l-2 border-slate-200 dark:border-slate-600 ml-2">
                    {items.map(item => (
                        <li key={item}>
                            <button
                                onClick={() => onSelect(item)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                                    activeFilter.type === filterType && activeFilter.value === item
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                                }`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                     {items.length === 0 && (
                        <li className="px-3 py-2 text-sm text-slate-400">No items found.</li>
                     )}
                </ul>
            )}
        </div>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, departments, managers, onFilterSelect, activeFilter, resetFilters }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 shadow-xl z-30 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Menu</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Close Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                    <ul>
                        <li>
                            <button onClick={resetFilters} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 font-medium ${activeFilter.type === 'none' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                Dashboard
                            </button>
                        </li>
                    </ul>

                    <SidebarDropdown
                        title="Departments"
                        items={departments}
                        onSelect={(item) => onFilterSelect('department', item)}
                        activeFilter={activeFilter}
                        filterType="department"
                    />

                    <SidebarDropdown
                        title="Managers"
                        items={managers}
                        onSelect={(item) => onFilterSelect('manager', item)}
                        activeFilter={activeFilter}
                        filterType="manager"
                    />
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
