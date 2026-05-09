import fs from 'fs';
import path from 'path';

const STORAGE_PATH = path.join(process.cwd(), 'data', 'state.json');

export interface AgentState {
  id: string;
  status: 'idle' | 'running';
  totalEarnings: number;
  lastRun: number;
}

export interface AppState {
  agents: Record<string, AgentState>;
  overallTotal: number;
}

export function saveState(state: AppState) {
  try {
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(state, null, 2));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
}

export function loadState(): AppState {
  try {
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load state:', err);
  }
  return { agents: {}, overallTotal: 0 };
}
