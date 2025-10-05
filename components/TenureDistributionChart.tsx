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

// Props provided by Recharts to the custom label renderer
// FIX: Update prop types to match what Recharts provides (string | number) to fix TS error.
interface CustomLabelProps {
    cx?: number | string;
    cy?: number | string;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
}

const RADIAN = Math.PI / 180;

// Custom label renderer to display percentage on each slice
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomLabelProps) => {
    // Add guards for optional properties to prevent runtime errors.
    if (cx === undefined || cy === undefined || midAngle === undefined || innerRadius === undefined || outerRadius === undefined || percent === undefined) {
        return null;
    }
    // FIX: Convert cx/cy to number type to prevent runtime errors during arithmetic operations.
    const numCx = Number(cx);
    const numCy = Number(cy);
    // Calculate position for the label inside the slice
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = numCx + radius * Math.cos(-midAngle * RADIAN);
    const y = numCy + radius * Math.sin(-midAngle * RADIAN);

    // Don't render label for very small slices to avoid clutter
    if (percent < 0.05) {
        return null;
    }

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '14px', fontWeight: '600' }}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const TenureDistributionChart: React.FC<TenureDistributionChartProps> = ({ data }) => {
    // Sort data to ensure consistent color mapping and logical order
    const sortedData = [...data].sort((a,b) => {
        const order = ['< 1 year', '1-3 years', '3-5 years', '5-10 years', '10-20 years', '20+ years'];
        return order.indexOf(a.name) - order.indexOf(b.name);
    });
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={sortedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {sortedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip 
                    contentStyle={{
                        backgroundColor: 'white',
                        borderColor: '#e2e8f0',
                        color: '#1e293b',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }}
                />
                <Legend wrapperStyle={{fontSize: "12px"}}/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default TenureDistributionChart;