import { ContentAgent } from './agents/ContentAgent';
import { TaskAgent } from './agents/TaskAgent';
import { BaseAgent } from './agents/BaseAgent';
import { loadState, saveState, AppState } from './storage';

class AgentManager {
  private static instance: AgentManager;
  private agents: Map<string, BaseAgent> = new Map();

  private constructor() {
    const contentAgent = new ContentAgent();
    const taskAgent = new TaskAgent();

    this.agents.set(contentAgent.id, contentAgent);
    this.agents.set(taskAgent.id, taskAgent);

    this.hydrate();

    // Auto-save every 30 seconds
    setInterval(() => this.persist(), 30000);
  }

  public static getInstance(): AgentManager {
    if (!AgentManager.instance) {
      AgentManager.instance = new AgentManager();
    }
    return AgentManager.instance;
  }

  private hydrate() {
    const state = loadState();
    this.agents.forEach(agent => {
      const saved = state.agents[agent.id];
      if (saved) {
        agent.totalEarnings = saved.totalEarnings;
        if (saved.status === 'running') {
          agent.start();
        }
      }
    });
  }

  public persist() {
    const appState: AppState = {
      agents: {},
      overallTotal: 0
    };

    this.agents.forEach(agent => {
      appState.agents[agent.id] = {
        id: agent.id,
        status: agent.status === 'running' ? 'running' : 'idle',
        totalEarnings: agent.totalEarnings,
        lastRun: Date.now()
      };
      appState.overallTotal += agent.totalEarnings;
    });

    saveState(appState);
  }

  public getAgents() {
    return Array.from(this.agents.values());
  }

  public getAgent(id: string) {
    return this.agents.get(id);
  }
}

export const agentManager = AgentManager.getInstance();
