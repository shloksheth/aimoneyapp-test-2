'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Play, Square, Settings2, Info } from 'lucide-react';

interface StrategyCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    status: string;
    totalEarnings: number;
  };
  onRefresh: () => void;
}

export default function StrategyCard({ agent, onRefresh }: StrategyCardProps) {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    const action = agent.status === 'running' ? 'stop' : 'start';
    try {
      await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: agent.id, action })
      });
      onRefresh();
    } catch (error) {
      console.error('Failed to toggle agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const isRunning = agent.status === 'running';

  return (
    <Card className={`transition-all duration-300 ${isRunning ? 'border-blue-200 ring-1 ring-blue-100' : 'opacity-80'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{agent.name}</CardTitle>
        <button
          onClick={toggleStatus}
          disabled={loading}
          className={`p-2 rounded-full transition-colors ${
            isRunning
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
        >
          {isRunning ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-500 mb-4 h-10">{agent.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isRunning ? 'Active' : 'Standby'}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-bold">Generated</p>
            <p className="text-lg font-bold text-slate-900">${agent.totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 text-xs font-semibold py-2 px-4 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            <Settings2 size={14} /> Configure
          </button>
          <button className="text-slate-400 hover:text-slate-600 p-2">
            <Info size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
