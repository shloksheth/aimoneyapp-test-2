export type AgentStatus = 'idle' | 'running' | 'paused' | 'error';

export interface AgentLog {
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export abstract class BaseAgent {
  public id: string;
  public name: string;
  public description: string;
  public status: AgentStatus = 'idle';
  public logs: AgentLog[] = [];
  public totalEarnings: number = 0;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  protected log(message: string, type: AgentLog['type'] = 'info') {
    this.logs.push({
      timestamp: Date.now(),
      message,
      type,
    });
    console.log(`[${this.name}] ${message}`);
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract performTask(): Promise<number>; // Returns earnings from the task

  public serialize() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      totalEarnings: this.totalEarnings,
      logs: this.logs.slice(-10),
    };
  }
}
