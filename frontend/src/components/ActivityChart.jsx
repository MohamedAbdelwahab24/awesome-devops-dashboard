import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function ActivityChart() {
  const data = [
    { name: 'Mon', commits: 5, prs: 2, issues: 1 },
    { name: 'Tue', commits: 8, prs: 3, issues: 0 },
    { name: 'Wed', commits: 12, prs: 4, issues: 2 },
    { name: 'Thu', commits: 7, prs: 2, issues: 1 },
    { name: 'Fri', commits: 9, prs: 5, issues: 0 },
    { name: 'Sat', commits: 3, prs: 1, issues: 0 },
    { name: 'Sun', commits: 2, prs: 0, issues: 0 },
  ];

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b'];

  return (
    <div className="bg-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary-400" />
        Activity Overview (Last 7 Days)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#e5e7eb' }}
            itemStyle={{ color: '#e5e7eb' }}
          />
          <Bar dataKey="commits" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Commits" />
          <Bar dataKey="prs" fill="#10b981" radius={[4, 4, 0, 0]} name="Pull Requests" />
          <Bar dataKey="issues" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Issues" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
