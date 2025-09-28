
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    department: string;
    location: string;
    count: number;
}

interface StaffingChartProps {
    data: ChartData[];
}

const COLORS = ['#38bdf8', '#818cf8', '#fb923c', '#f87171', '#4ade80'];

const StaffingChart: React.FC<StaffingChartProps> = ({ data }) => {
    const { chartData, locations } = useMemo(() => {
        const departments = [...new Set(data.map(d => d.department))];
        const locations = [...new Set(data.map(d => d.location))];
        const chartData = departments.map(dept => {
            const entry: { name: string; [key: string]: string | number } = { name: dept };
            locations.forEach(loc => {
                const item = data.find(d => d.department === dept && d.location === loc);
                entry[loc] = item ? item.count : 0;
            });
            return entry;
        });
        return { chartData, locations };
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} />
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        borderColor: '#475569',
                        color: '#f1f5f9',
                        borderRadius: '0.5rem'
                    }}
                />
                <Legend wrapperStyle={{fontSize: "12px"}}/>
                {locations.map((loc, index) => (
                    <Bar key={loc} dataKey={loc} stackId="a" fill={COLORS[index % COLORS.length]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StaffingChart;
