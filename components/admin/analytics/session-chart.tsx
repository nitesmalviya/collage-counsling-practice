import { SessionStatusOverview } from '@/lib/types';
import { COLORS, SESSION_TABS } from '@/utils/constant';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
interface SessionStatusOverviewProps {
    userData: SessionStatusOverview;
}

export default function SessionStatusChart({ userData }: SessionStatusOverviewProps) {
    const { cancelled, completed, upcoming, expired } = userData;
    const sessionStats = [
        { name: SESSION_TABS.COMPLETED, value: completed, color: COLORS.green },
        { name: SESSION_TABS.UPCOMING, value: upcoming, color: COLORS.orange },
        { name: SESSION_TABS.CANCELED, value: cancelled, color: COLORS.red },
        { name: SESSION_TABS.EXPIRED, value: expired, color: COLORS.yellow },
    ];

    const CustomTooltip = ({ payload, label }: any) => {
        if (!payload || payload.length === 0) return null;
        const { value, color } = payload[0].payload;
        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <p style={{ color: '#333', fontWeight: 800 }}> {label}</p>
                <p style={{ color: color, fontSize: '16px', fontWeight: 600 }}>Value: {value}</p>
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={sessionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#bfbebeff', fontSize: 14, fontWeight: 800 }} />
                <YAxis allowDecimals={false} tick={{ fill: '#bfbebeff', fontSize: 14, fontWeight: 800 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value">
                    {sessionStats.map((entry, index) => (
                        <Cell key={`cellb-${index}`} fill={entry?.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
