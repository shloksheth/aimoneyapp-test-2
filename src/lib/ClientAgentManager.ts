import { ContentAgent } from './agents/ContentAgent';
import { TaskAgent } from './agents/TaskAgent';
import { BaseAgent } from './agents/BaseAgent';

export class ClientAgentManager {
  private static instance: ClientAgentManager;
  private agents: Map<string, BaseAgent> = new Map();
  private onStateChange: (agents: any[]) => void = () => {};

  private constructor() {
    if (typeof window !== 'undefined') {
      const contentAgent = new ContentAgent();
      const taskAgent = new TaskAgent();

      this.agents.set(contentAgent.id, contentAgent);
      this.agents.set(taskAgent.id, taskAgent);

      this.hydrate();

      // Auto-save every 10 seconds
      setInterval(() => this.persist(), 10000);
    }
  }

  public static getInstance(): ClientAgentManager {
    if (!ClientAgentManager.instance) {
      ClientAgentManager.instance = new ClientAgentManager();
    }
    return ClientAgentManager.instance;
  }

  public subscribe(callback: (agents: any[]) => void) {
    this.onStateChange = callback;
    this.emit();
  }

  private emit() {
    this.onStateChange(this.getAgents().map(a => a.serialize()));
  }

  private hydrate() {
    const saved = localStorage.getItem('payday500_state');
    if (saved) {
      const state = JSON.parse(saved);
      this.agents.forEach(agent => {
        const savedAgent = state.agents[agent.id];
        if (savedAgent) {
          agent.totalEarnings = savedAgent.totalEarnings;
          if (savedAgent.status === 'running') {
            agent.start().then(() => this.emit());
          }
        }
      });
    }
  }

  public persist() {
    const appState = {
      agents: {},
      overallTotal: 0
    } as any;

    this.agents.forEach(agent => {
      appState.agents[agent.id] = {
        id: agent.id,
        status: agent.status,
        totalEarnings: agent.totalEarnings,
      };
      appState.overallTotal += agent.totalEarnings;
    });

    localStorage.setItem('payday500_state', JSON.stringify(appState));
    this.emit();
  }

  public getAgents() {
    return Array.from(this.agents.values());
  }

  public async toggleAgent(id: string) {
    const agent = this.agents.get(id);
    if (agent) {
      if (agent.status === 'running') {
        await agent.stop();
      } else {
        await agent.start();
      }
      this.persist();
    }
  }
}

export const clientAgentManager = ClientAgentManager.getInstance();
