import React from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartDashboard({ BudgetList = [] }) {  // Destructure BudgetList as a prop with default empty array
  return (
    <div className='border rounded-lg p-5'>
        <h2 className="font-bold text-lg">Activity</h2>
      <BarChart 
        width={500}
        height={300}
        data={BudgetList}
        margin={{
            top: 7,
          
        }}
      >
        <XAxis dataKey="name" />  {/* Use string for dataKey */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />  {/* Use string for dataKey */}
        <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />  {/* Use string for dataKey */}
      </BarChart>
    </div>
  );
}

export default BarChartDashboard;
