
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface SalaryByDepartmentChartProps {
    data: ChartData[];
}

const SalaryByDepartmentChart: React.FC<SalaryByDepartmentChartProps> = ({ data }) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis type="number" tickFormatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`} tick={{ fill: 'currentColor', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'currentColor', fontSize: 12 }} />
                <Tooltip
                    formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value)}
                    contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        borderColor: '#475569',
                        color: '#f1f5f9',
                        borderRadius: '0.5rem'
                    }}
                />
                <Bar dataKey="value" name="Total Salary" fill="#a78bfa" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SalaryByDepartmentChart;
