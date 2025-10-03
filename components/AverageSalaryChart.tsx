import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface AverageSalaryChartProps {
    data: ChartData[];
}

// Formatter for full Philippine Peso currency (e.g., ₱190,000)
const pesoFormatter = (value: number) => new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
}).format(value);

// Formatter for compact Philippine Peso for the axis (e.g., ₱190K)
const compactPesoFormatter = (value: number) => new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
}).format(value);


const AverageSalaryChart: React.FC<AverageSalaryChartProps> = ({ data }) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 10);

    return (
        <ResponsiveContainer width="100%" height="100%">
            {/* Increased right margin to provide space for bar labels */}
            <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 90, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                {/* Updated X-axis to display currency in compact format */}
                <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} tickFormatter={compactPesoFormatter} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'currentColor', fontSize: 10 }} />
                <Tooltip
                    // Updated tooltip to use Philippine Peso format
                     formatter={(value: number) => pesoFormatter(value)}
                     contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        borderColor: '#475569',
                        color: '#f1f5f9',
                        borderRadius: '0.5rem'
                    }}
                />
                <Bar dataKey="value" fill="#8884d8">
                     {/* Added permanent labels on each bar */}
                    <LabelList
                        dataKey="value" 
                        position="right"
                        formatter={pesoFormatter}
                        style={{ fill: 'currentColor', fontSize: 10, fontWeight: 500 }}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default AverageSalaryChart;