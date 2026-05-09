'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles, ArrowRight, Github, Search, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/builder';
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030712] relative overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 glass rounded-3xl border border-white/10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/40 font-medium">Sign in to continue to ConfigGen AI</p>
        </div>

        <div className="space-y-4">
          <button 
            type="button"
            className="w-full py-3 glass rounded-xl flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-all group border border-white/10"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-400" />
            <span className="font-bold">Continue with GitHub</span>
          </button>

          <button 
            type="button"
            className="w-full py-3 glass rounded-xl flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-all group border border-white/10"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-400" />
            <span className="font-bold">Continue with Google</span>
          </button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-white/20 text-xs uppercase tracking-widest font-black">or</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 bg-cyan-500 rounded-xl text-black font-black hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] uppercase tracking-widest flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        </div>

        <p className="mt-8 text-center text-sm text-white/40">
          Don't have an account? <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-bold ml-1">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
