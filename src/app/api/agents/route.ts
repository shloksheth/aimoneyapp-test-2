import { NextResponse } from 'next/server';
import { agentManager } from '@/lib/AgentManager';

export async function GET() {
  const agents = agentManager.getAgents();
  return NextResponse.json(agents.map(a => a.serialize()));
}

export async function POST(request: Request) {
  const { id, action } = await request.json();
  const agent = agentManager.getAgent(id);

  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
  }

  if (action === 'start') {
    await agent.start();
    agentManager.persist();
  } else if (action === 'stop') {
    await agent.stop();
    agentManager.persist();
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  return NextResponse.json({
    id: agent.id,
    status: agent.status,
  });
}
