
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface AgeDistributionChartProps {
    data: ChartData[];
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data }) => {
    const sortedData = [...data].sort((a,b) => a.name.localeCompare(b.name));
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }}/>
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }}/>
                <Tooltip 
                     contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        borderColor: '#475569',
                        color: '#f1f5f9',
                        borderRadius: '0.5rem'
                    }}
                />
                <Bar dataKey="value" name="Employees" fill="#f472b6" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default AgeDistributionChart;
