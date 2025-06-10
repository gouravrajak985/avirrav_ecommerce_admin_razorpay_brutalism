'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface OverviewProps {
  data: any[];
}

export const Overview = ({ data }: OverviewProps) => {
  return (
    <div className="rounded-lg border border-border p-4 polaris-shadow bg-surface">
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={data} margin={{ top: 20, right: 15, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" vertical={false} />
          <XAxis
            dataKey='name'
            stroke='#6d7175'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            stroke='#6d7175'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `$${value}`}
            tickMargin={8}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e3e3e3',
              borderRadius: '8px',
              fontWeight: '500',
              padding: '12px',
              boxShadow: '0 4px 8px -2px rgba(22, 29, 37, 0.1), 0 1px 0 0 rgba(22, 29, 37, 0.05)'
            }}
          />
          <Bar 
            dataKey='total' 
            fill='#2c6ecb' 
            radius={[4, 4, 0, 0]} 
            strokeWidth={0}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};