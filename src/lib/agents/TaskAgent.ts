import { BaseAgent } from './BaseAgent';

export class TaskAgent extends BaseAgent {
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    super(
      'task-agent',
      'Micro-Task Automator',
      'Automatically finds and completes high-yield micro-tasks and data labeling jobs.'
    );
  }

  async start(): Promise<void> {
    if (this.status === 'running') return;
    this.status = 'running';
    this.log('Task Automator started. Connecting to micro-task marketplaces...', 'info');

    // Perform first task immediately
    this.performTask();

    this.intervalId = setInterval(async () => {
      await this.performTask();
    }, 15000); // Every 15 seconds
  }

  async stop(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.status = 'idle';
    this.log('Task Automator stopped.', 'warning');
  }

  async performTask(): Promise<number> {
    this.log('Secured high-priority data labeling batch.', 'info');

    // Simulate task completion
    await new Promise(resolve => setTimeout(resolve, 3000));

    const earnings = parseFloat((Math.random() * 30 + 5).toFixed(2));
    this.totalEarnings += earnings;

    this.log(`Batch completed successfully. Payout received: $${earnings}`, 'success');
    return earnings;
  }
}
