
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface SalaryByDepartmentChartProps {
    data: ChartData[];
}

// Formatter for full Philippine Peso currency (e.g., ₱190,000)
const pesoFormatter = (value: number) => new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
}).format(value);

// Formatter for compact Philippine Peso for the axis (e.g., ₱1.5M)
const compactPesoFormatter = (value: number) => new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
}).format(value);

const SalaryByDepartmentChart: React.FC<SalaryByDepartmentChartProps> = ({ data }) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis type="number" tickFormatter={compactPesoFormatter} tick={{ fill: 'currentColor', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'currentColor', fontSize: 12 }} />
                <Tooltip
                    formatter={pesoFormatter}
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
