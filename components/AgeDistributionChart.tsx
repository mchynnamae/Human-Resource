import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChartData {
    name: string;
    value: number;
    // Add index signature to accommodate properties added by Recharts' Pie component
    [key: string]: any;
}

interface AgeDistributionChartProps {
    data: ChartData[];
}

// A vibrant, pink-themed color palette
const COLORS = ['#ec4899', '#f472b6', '#f9a8d4', '#db2777', '#be185d', '#831843'];

// Props provided by Recharts to the custom label renderer
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
    // Convert cx/cy to number type to prevent runtime errors during arithmetic operations.
    const numCx = Number(cx);
    const numCy = Number(cy);
    // Calculate position for the label inside the slice
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.6;
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

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data }) => {
    // Sorting ensures consistent color assignment for age brackets across renders
    const sortedData = [...data].sort((a,b) => a.name.localeCompare(b.name));

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

export default AgeDistributionChart;