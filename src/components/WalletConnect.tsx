'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './Card';
import { CreditCard, Link as LinkIcon, ShieldCheck, ExternalLink } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [clientId, setClientId] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleConnect = () => {
    if (clientId) {
      setConnected(true);
      localStorage.setItem('payday500_paypal_client_id', clientId);
    } else {
      setShowInput(true);
    }
  };

  return (
    <Card className="border-dashed border-2 border-slate-300 bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        {connected ? (
          <PayPalScriptProvider options={{ clientId }}>
            <div className="w-full max-w-md space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">PayPal Integrated</h3>
                <p className="text-slate-500 text-sm mt-2">
                  Using Client ID: <code className="bg-slate-100 px-1 rounded">{clientId.substring(0, 8)}...</code>
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-sm font-bold text-slate-700 mb-4">Withdraw Earnings</p>
                <PayPalButtons
                  style={{ layout: "horizontal", color: "blue", shape: "pill", label: "paypal" }}
                  onClick={() => {
                    alert("Automated Payouts (Real Money) require a secure backend and valid PayPal Payouts credentials. This static demo cannot safely handle your PayPal Secret Key. To enable real payouts, you would need to host this on a platform with a Node.js backend.");
                  }}
                />
                <p className="text-[10px] text-slate-400 mt-4">
                  Note: Real payouts require a PayPal Business account. This button creates a test payment.
                </p>
              </div>

              <button
                onClick={() => setConnected(false)}
                className="text-sm text-slate-400 hover:text-slate-600 underline"
              >
                Disconnect & Reset
              </button>
            </div>
          </PayPalScriptProvider>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Live Payout Integration</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs">
              Connect your own PayPal application to enable real-world revenue withdrawal.
            </p>

            {showInput ? (
              <div className="mt-6 w-full max-w-xs space-y-3">
                <input
                  type="text"
                  placeholder="Enter PayPal Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <button
                  onClick={handleConnect}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all text-sm"
                >
                  Activate Integration
                </button>
                <a
                  href="https://developer.paypal.com/dashboard/applications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-500 flex items-center justify-center gap-1 hover:underline"
                >
                  Get Client ID from PayPal Developer <ExternalLink size={10} />
                </a>
              </div>
            ) : (
              <button
                onClick={() => setShowInput(true)}
                className="mt-6 w-full max-w-xs py-3 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <LinkIcon size={18} /> Configure PayPal
              </button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
