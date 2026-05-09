'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, DollarSign, Target, TrendingUp, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import StrategyCard from './StrategyCard';
import { clientAgentManager } from '@/lib/ClientAgentManager';

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientAgentManager.subscribe((updatedAgents) => {
      setAgents(updatedAgents);
      setLoading(false);
    });
  }, []);

  const totalEarnings = agents.reduce((sum, a) => sum + a.totalEarnings, 0);
  const dailyGoal = 500;
  const progress = (totalEarnings / dailyGoal) * 100;

  const history = [
    { name: '8am', amount: totalEarnings * 0.1 },
    { name: '10am', amount: totalEarnings * 0.25 },
    { name: '12pm', amount: totalEarnings * 0.45 },
    { name: '2pm', amount: totalEarnings * 0.7 },
    { name: '4pm', amount: totalEarnings * 0.85 },
    { name: '6pm', amount: totalEarnings },
  ];

  if (loading && agents.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">Loading AI Financial Ecosystem...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">PayDay 500</h1>
          <p className="text-slate-500">AI-Powered Wealth Generation Engine</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-wider">
            <AlertCircle size={14} />
            Simulation Mode
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Balance</p>
              <p className="text-xl font-bold text-slate-900">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 font-medium">Daily Progress</p>
                <h3 className="text-3xl font-bold mt-1">${totalEarnings.toFixed(2)}</h3>
                <p className="text-blue-200 text-sm mt-2">Goal: ${dailyGoal}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Target size={24} />
              </div>
            </div>
            <div className="mt-4 bg-white/20 rounded-full h-2 w-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 font-medium">Active Agents</p>
                <h3 className="text-3xl font-bold mt-1 text-slate-900">
                  {agents.filter(a => a.status === 'running').length}
                </h3>
                <p className="text-green-600 text-sm mt-2 font-medium flex items-center gap-1">
                  <Activity size={14} /> System Healthy
                </p>
              </div>
              <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 font-medium">Est. Hourly Rate</p>
                <h3 className="text-3xl font-bold mt-1 text-slate-900">
                  ${(totalEarnings / 8 || 0).toFixed(2)}/hr
                </h3>
                <p className="text-slate-400 text-sm mt-2">Based on current activity</p>
              </div>
              <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                <DollarSign size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Projection</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`$${parseFloat(value).toFixed(2)}`, 'Earnings']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Activity Stream
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-64 overflow-y-auto">
            {agents.flatMap(a => a.logs.map((l: any) => ({...l, agentName: a.name})))
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 10)
              .map((log, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="mt-1">
                    {log.type === 'success' ? <CheckCircle2 size={14} className="text-green-500" /> :
                     log.type === 'warning' ? <AlertCircle size={14} className="text-amber-500" /> :
                     <Activity size={14} className="text-blue-500" />}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">{log.agentName}</span>
                    <p className="text-slate-500">{log.message}</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Strategies */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">AI Revenue Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map(agent => (
            <StrategyCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}
