import { BaseAgent } from './BaseAgent';

export class ContentAgent extends BaseAgent {
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    super(
      'content-agent',
      'AI Content Strategist',
      'Generates and monetizes high-quality content across social platforms and blogs.'
    );
  }

  async start(): Promise<void> {
    if (this.status === 'running') return;
    this.status = 'running';
    this.log('Content Strategist started. Scanning for trending topics...', 'info');

    // Perform first task immediately
    this.performTask();

    // Simulate continuous operation
    this.intervalId = setInterval(async () => {
      await this.performTask();
    }, 10000); // Every 10 seconds for simulation
  }

  async stop(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.status = 'idle';
    this.log('Content Strategist stopped.', 'warning');
  }

  async performTask(): Promise<number> {
    const topics = ['AI in 2025', 'Passive Income Strategies', 'Remote Work Future'];
    const topic = topics[Math.floor(Math.random() * topics.length)];

    this.log(`Generating viral article on: "${topic}"`, 'info');

    // Simulate AI work delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const earnings = parseFloat((Math.random() * 50 + 10).toFixed(2));
    this.totalEarnings += earnings;

    this.log(`Article published. Ad revenue and affiliate clicks generated: $${earnings}`, 'success');
    return earnings;
  }
}
