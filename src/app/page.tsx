import Dashboard from '@/components/Dashboard';
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Dashboard />
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <WalletConnect />
      </div>
      <footer className="mt-20 text-center text-slate-400 text-sm">
        <p>&copy; 2025 PayDay 500 AI. All rights reserved.</p>
        <p className="mt-1 font-mono">Status: All Systems Operational</p>
      </footer>
    </main>
  );
}
