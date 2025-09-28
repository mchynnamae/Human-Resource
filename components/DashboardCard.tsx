
import React, { ReactNode } from 'react';

interface DashboardCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 ${className}`}>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">{title}</h2>
            <div className="h-72">
                {children}
            </div>
        </div>
    );
};

export default DashboardCard;
