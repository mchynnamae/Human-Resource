import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
    name: string;
    value: number;
    // FIX: Recharts Pie component adds properties to data objects, so an index signature is needed to avoid type errors.
    [key: string]: any;
}

interface TenureDistributionChartProps {
    data: ChartData[];
}

const COLORS = ['#0ea5e9', '#6366f1', '#f97316', '#10b981', '#ef4444', '#8b5cf6'];

const TenureDistributionChart: React.FC<TenureDistributionChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <Legend wrapperStyle={{fontSize: "12px"}}/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default TenureDistributionChart;