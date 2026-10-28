import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types.ts';
import { ShieldCheck, Users, KeyRound, Mail, RefreshCw, Send, CheckCircle, Database } from 'lucide-react';

interface AdminPanelProps {
  currentUser: UserProfile;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Broadcast alert state
  const [broadcastSubject, setBroadcastSubject] = useState<string>('Celestial Transit Alert: Major Planetary Shift');
  const [broadcastMessage, setBroadcastMessage] = useState<string>('Planetary ephemerides indicate a significant planetary transit alignment. Review your personal houses in AstroVerse.');
  const [broadcastTarget, setBroadcastTarget] = useState<string>('all');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);
  const [dispatching, setDispatching] = useState<boolean>(false);

  const fetchAdminData = () => {
    setLoading(true);
    fetch('/api/auth/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
        if (data.codes) setCodes(data.codes);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching admin data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatching(true);
    setDispatchStatus(null);

    // Send transit alert to current user or all
    const targetRecipient = broadcastTarget === 'self' ? currentUser.email : 'vinayagarmurugan307@gmail.com';

    fetch('/api/email/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toEmail: targetRecipient,
        title: broadcastSubject,
        content: broadcastMessage,
        reportType: 'Administrator Celestial Broadcast',
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to dispatch broadcast');
        setDispatchStatus(`Broadcast transmitted via SMTP to ${targetRecipient}`);
        setDispatching(false);
      })
      .catch((err) => {
        setDispatchStatus(`Dispatch notice: ${err.message}`);
        setDispatching(false);
      });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>Imperium Astrologicum</span>
            <span aria-hidden="true">·</span>
            <span>Administrator Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 flex items-center gap-3">
            <span>AstroVerse Admin Dashboard</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-sans font-medium border border-amber-500/30">
              Admin Access Active
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Manage authenticated seekers and administrators, inspect email verification code logs, and dispatch transit broadcasts.
          </p>
        </div>

        <button
          onClick={fetchAdminData}
          className="px-4 py-2 text-xs text-slate-300 hover:text-amber-300 bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="uppercase tracking-wider">Registered Accounts</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <h4 className="text-3xl font-serif font-bold text-slate-100 tabular-nums">
            {users.length}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Stored in verified seeker directory
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="uppercase tracking-wider">Verification Codes Generated</span>
            <KeyRound className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-3xl font-serif font-bold text-slate-100 tabular-nums">
            {codes.length}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Logged in security OTP verification records
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="uppercase tracking-wider">Active Admin Session</span>
            <ShieldCheck className="w-4 h-4 text-sky-400" />
          </div>
          <h4 className="text-base font-serif font-bold text-slate-100 truncate">
            {currentUser.name}
          </h4>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {currentUser.email}
          </p>
        </div>
      </div>

      {/* Broadcast Alert Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="pb-3 border-b border-slate-800">
          <h3 className="text-base font-serif font-bold text-slate-100 flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Dispatch Celestial Transit Broadcast via SMTP</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Send an official email broadcast to users regarding significant planetary stations or eclipses.
          </p>
        </div>

        <form onSubmit={handleBroadcast} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Subject Title</label>
              <input
                type="text"
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Recipient Destination</label>
              <select
                value={broadcastTarget}
                onChange={(e) => setBroadcastTarget(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="self">Current Admin ({currentUser.email})</option>
                <option value="all">Default Account (vinayagarmurugan307@gmail.com)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Astrological Directive</label>
            <textarea
              rows={2}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          {dispatchStatus && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs">
              {dispatchStatus}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={dispatching}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{dispatching ? 'Transmitting...' : 'Dispatch Broadcast'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Users & Verification Log Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registered Users */}
        <div className="space-y-3">
          <h3 className="text-base font-serif font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Registered Accounts Directory</span>
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 max-h-80 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Sun Sign</th>
                  <th className="py-2.5 px-3">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3">
                      <span className="font-medium text-slate-100 block">{u.name}</span>
                      <span className="font-mono text-[10px] text-slate-400">{u.email}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        u.role === 'admin'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-300">{u.sun_sign || '—'}</td>
                    <td className="py-2 px-3 text-[10px] text-slate-500 font-mono">
                      {u.created_at ? u.created_at.split('T')[0] : 'Today'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Codes Audit Log */}
        <div className="space-y-3">
          <h3 className="text-base font-serif font-bold text-slate-100 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <span>Verification Code Audit Log</span>
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 max-h-80 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Recipient Email</th>
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {codes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono text-slate-300">{c.email}</td>
                    <td className="py-2 px-3 font-mono font-bold text-amber-300">{c.code}</td>
                    <td className="py-2 px-3">
                      {c.used ? (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          <CheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-amber-400 text-[11px]">Dispatched</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-[10px] text-slate-500 font-mono">
                      {c.created_at ? c.created_at.split('T')[0] : 'Just now'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
