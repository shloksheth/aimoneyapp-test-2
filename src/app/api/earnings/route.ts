import { NextResponse } from 'next/server';
import { agentManager } from '@/lib/AgentManager';

export async function GET() {
  const agents = agentManager.getAgents();
  const total = agents.reduce((sum, a) => sum + a.totalEarnings, 0);

  // Simulated historical data for a chart
  const history = [
    { name: '8am', amount: total * 0.1 },
    { name: '10am', amount: total * 0.25 },
    { name: '12pm', amount: total * 0.45 },
    { name: '2pm', amount: total * 0.7 },
    { name: '4pm', amount: total * 0.85 },
    { name: '6pm', amount: total },
  ];

  return NextResponse.json({
    totalEarnings: total,
    dailyGoal: 500,
    history
  });
}
