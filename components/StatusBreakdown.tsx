import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// FIX: Import DashboardCard to resolve 'Cannot find name' error.
import DashboardCard from './DashboardCard';

interface ChartData {
    name: string;
    value: number;
    // FIX: Recharts Pie component adds properties to data objects, so an index signature is needed to avoid type errors.
    [key: string]: any;
}

interface StatusBreakdownProps {
    data: ChartData[];
    total: number;
}

const COLORS: Record<string, string> = {
    Active: '#22c55e',
    'On Leave': '#f59e0b',
    Terminated: '#ef4444',
};

const StatusBreakdown: React.FC<StatusBreakdownProps> = ({ data, total }) => {
    const activeEmployees = data.find(d => d.name === 'Active')?.value || 0;
    
    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col justify-center">
                 <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400">Total Employees</h3>
                 <p className="text-5xl font-bold text-slate-900 dark:text-white">{total}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col justify-center">
                 <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400">Active Employees</h3>
                 <p className="text-5xl font-bold text-green-500">{activeEmployees}</p>
            </div>
            <DashboardCard title="Employee Status Breakdown" className="lg:col-span-2">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            // FIX: Handle the case where 'percent' can be undefined or non-numeric to avoid arithmetic errors.
                            label={({ name, percent }) => `${name} ${((Number(percent) || 0) * 100).toFixed(0)}%`}
                        >
                            {data.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name] || '#cccccc'} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                borderColor: '#475569',
                                color: '#f1f5f9',
                                borderRadius: '0.5rem'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </DashboardCard>
        </>
    );
};

export default StatusBreakdown;