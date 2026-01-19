import { UserStatusOverview } from '@/lib/types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)'
];

const getColor = (cssVar: string, fallback: string): string =>
(typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(cssVar) || fallback
    : fallback
);
interface UserOverviewProps {
    analyticsData: UserStatusOverview;
}

const UserOverviewChart = ({ analyticsData }: UserOverviewProps) => {
    
    const { educators, students, total } = analyticsData;

    const userStats = [
        { name: 'Students', value: students },
        { name: 'Educators', value: educators },
        { name: 'Total', value: total },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={userStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                >
                    {userStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getColor(COLORS[index % COLORS.length], COLORS[index % COLORS.length])} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}


export default UserOverviewChart;