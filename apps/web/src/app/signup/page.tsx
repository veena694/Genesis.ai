'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Sparkles, ArrowRight, Github, Search } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/auth/signup', {
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
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-20"></div>
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-10 glass rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 bg-slate-900/40 backdrop-blur-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass border-cyan-500/20 rounded-full text-[10px] font-bold text-cyan-400 mb-4 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>Join the Future</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">Create Account</h2>
          <p className="text-slate-400 font-medium text-sm">Start building cinematic apps today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-cyan-500/10"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-cyan-500/10"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-cyan-500/10"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-4 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] uppercase tracking-widest flex items-center justify-center gap-2 group"
          >
            Create My Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative flex items-center py-8">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">Social Connect</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
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
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold ml-1">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
