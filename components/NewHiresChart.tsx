
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

interface NewHiresChartProps {
    data: ChartData[];
}

const NewHiresChart: React.FC<NewHiresChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
                <Line type="monotone" dataKey="value" name="New Hires" stroke="#34d399" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default NewHiresChart;
