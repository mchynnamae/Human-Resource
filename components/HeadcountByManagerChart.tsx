
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface HeadcountByManagerChartProps {
    data: ChartData[];
}

const HeadcountByManagerChart: React.FC<HeadcountByManagerChartProps> = ({ data }) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 15);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} margin={{ top: 5, right: 20, left: -10, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fill: 'currentColor', fontSize: 10 }} />
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
                <Tooltip 
                     contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        borderColor: '#475569',
                        color: '#f1f5f9',
                        borderRadius: '0.5rem'
                    }}
                />
                <Bar dataKey="value" name="Direct Reports" fill="#22d3ee" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HeadcountByManagerChart;
