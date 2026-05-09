import { ContentAgent } from '../agents/ContentAgent';
import { TaskAgent } from '../agents/TaskAgent';

async function testAgents() {
  console.log('--- Testing ContentAgent ---');
  const contentAgent = new ContentAgent();
  console.log('Initial Status:', contentAgent.status);

  const earnings1 = await contentAgent.performTask();
  console.log('Task Earnings:', earnings1);
  console.log('Total Earnings:', contentAgent.totalEarnings);
  console.log('Logs count:', contentAgent.logs.length);

  if (earnings1 > 0 && contentAgent.totalEarnings === earnings1) {
    console.log('ContentAgent test passed!');
  } else {
    console.error('ContentAgent test failed!');
    process.exit(1);
  }

  console.log('\n--- Testing TaskAgent ---');
  const taskAgent = new TaskAgent();
  const earnings2 = await taskAgent.performTask();
  console.log('Task Earnings:', earnings2);

  if (earnings2 > 0) {
    console.log('TaskAgent test passed!');
  } else {
    console.error('TaskAgent test failed!');
    process.exit(1);
  }
}

testAgents().catch(err => {
  console.error(err);
  process.exit(1);
});
