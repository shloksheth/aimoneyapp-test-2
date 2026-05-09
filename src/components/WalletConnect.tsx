'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './Card';
import { CreditCard, Link as LinkIcon, Check, ShieldCheck } from 'lucide-react';

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const connect = () => {
    setLoading(true);
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="border-dashed border-2 border-slate-300 bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        {connected ? (
          <>
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">PayPal Verified</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs">
              Earnings will be automatically deposited to <b>user***@example.com</b> every 24 hours.
            </p>
            <button className="mt-6 text-sm text-slate-400 hover:text-slate-600 underline">
              Change Account
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Payout Method</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs">
              Connect your PayPal or Bank account to enable automated payouts once reaching the threshold.
            </p>
            <button
              onClick={connect}
              disabled={loading}
              className="mt-6 w-full max-w-xs py-3 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LinkIcon size={18} /> Connect PayPal
                </>
              )}
            </button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
