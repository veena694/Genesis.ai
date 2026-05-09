'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { ThreeDCard } from '@/components/ui/ThreeDCard';
import { 
  Zap, 
  PlayCircle, 
  Users, 
  Database, 
  Lock, 
  LayoutTemplate, 
  Server, 
  ShieldCheck, 
  Globe, 
  Github, 
  Twitter, 
  Component as ComponentIcon,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0"></div>
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow z-0"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-4 md:px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-4 md:px-6 py-3 border-white/5 shadow-2xl">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <ComponentIcon className="text-white w-5 h-5" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">Config<span className="text-cyan-400">Gen</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-cyan-400 transition-colors">Showcase</a>
            <a href="#runtime" className="hover:text-cyan-400 transition-colors">Runtime</a>
            <a href="#docs" className="hover:text-cyan-400 transition-colors">Documentation</a>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/login" className="text-xs md:text-sm text-slate-300 hover:text-white transition-colors">Sign In</Link>
            <Link href="/signup" className="px-4 md:px-5 py-2 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6 z-10">
        <div className="max-w-7xl mx-auto text-center scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass border-cyan-500/20 rounded-full text-[10px] md:text-xs font-bold text-cyan-400 mb-8 animate-bounce">
            <Sparkles className="w-3 h-3" />
            <span>AI-POWERED DYNAMIC RUNTIME V2.0</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-none">
            Generate Full Stack <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Apps from JSON</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            ConfigGen transforms your declarative schemas into production-grade applications with integrated backends, authentication, and high-performance UI components.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/builder">
              <button className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20">
                <Zap className="w-5 h-5 fill-current" />
                Start Building Now
              </button>
            </Link>
            <button className="px-8 py-4 glass text-white font-bold rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all">
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Floating Visual Container */}
          <div className="relative scroll-reveal">
            <div className="relative max-w-5xl mx-auto aspect-square md:aspect-video glass rounded-3xl border-white/10 shadow-3xl overflow-hidden p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover rounded-[22px] opacity-40 mix-blend-overlay" alt="Dashboard Preview" />
              
              {/* Mock App Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 glass border-white/20 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 transform -rotate-1 skew-x-1">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="px-4 py-1 glass rounded-full text-[10px] text-cyan-400 border-cyan-400/20 uppercase tracking-widest font-black">Status: Generated</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-40 glass rounded-xl border-white/5 flex items-center justify-center p-4">
                      <div className="w-full h-full flex flex-col gap-4">
                        <div className="h-4 w-1/3 bg-slate-700/50 rounded"></div>
                        <div className="flex-1 flex items-end gap-2">
                          <div className="w-full bg-cyan-500/20 h-1/2 rounded-t"></div>
                          <div className="w-full bg-cyan-500/40 h-3/4 rounded-t"></div>
                          <div className="w-full bg-cyan-500/60 h-full rounded-t"></div>
                          <div className="w-full bg-cyan-500/40 h-2/3 rounded-t"></div>
                          <div className="w-full bg-cyan-500/80 h-4/5 rounded-t"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-40 glass rounded-xl border-white/5 flex flex-col justify-center items-center gap-2">
                      <Users className="text-3xl text-indigo-400" />
                      <span className="text-2xl font-bold">12.4k</span>
                      <span className="text-[10px] text-slate-500 uppercase">Active Users</span>
                    </div>
                  </div>
                  <div className="flex-1 glass rounded-xl border-white/5 p-4">
                    <div className="h-4 w-1/4 bg-slate-700/50 rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-800/50 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-800/50 rounded"></div>
                      <div className="h-2 w-4/6 bg-slate-800/50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating 3D Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-12 w-64 glass p-4 rounded-2xl border-cyan-500/30 shadow-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Database className="text-cyan-400 w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white">PostgreSQL Schema</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400/80">
                CREATE TABLE users (<br/>
                &nbsp;&nbsp;id UUID PRIMARY KEY,<br/>
                &nbsp;&nbsp;email TEXT UNIQUE<br/>
                ); 
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: -3 }}
              className="absolute -bottom-10 -right-10 w-56 glass p-4 rounded-2xl border-indigo-500/30 shadow-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Lock className="text-indigo-400 w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white">Auth Hook</span>
              </div>
              <div className="text-[10px] font-mono text-indigo-400/80">
                useAuth((session) =&gt; &#123;<br/>
                &nbsp;&nbsp;redirect(&apos;/dashboard&apos;)<br/>
                &#125;);
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto scroll-reveal">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Engineered for Speed</h2>
              <p className="text-slate-400">The ultimate toolkit for high-growth startups and visionary developers.</p>
            </div>
            <Link href="#" className="text-cyan-400 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform group">
              <span>Explore full capability</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard icon={<LayoutTemplate />} color="cyan" title="Dynamic UI Generation" desc="Instantly generate responsive, accessible, and themeable UI components from any configuration." />
            <FeatureCard icon={<Server />} color="purple" title="Auto API Builder" desc="Automatic generation of REST and GraphQL endpoints mapped directly to your defined schema." />
            <FeatureCard icon={<ShieldCheck />} color="blue" title="Auth Ecosystem" desc="Pre-built OAuth, JWT, and multi-factor authentication modules configured with a single line." />
            <FeatureCard icon={<Database />} color="pink" title="PostgreSQL Engine" desc="Optimized database schemas and migrations generated on the fly for complex data relationships." />
            <FeatureCard icon={<Globe />} color="yellow" title="Edge Deployment" desc="Globally distributed runtime ensures your apps load under 100ms from anywhere on Earth." />
            <FeatureCard icon={<Github />} color="emerald" title="GitHub Sync" desc="Seamless export to clean React/TypeScript code that you can commit and deploy anywhere." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 z-10">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden scroll-reveal">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 pointer-events-none"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to redefine how <br/>you build applications?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">Join over 5,000 developers who have switched to config-driven development and increased their shipping speed by 400%.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/builder">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                Start Building for Free
              </button>
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 glass text-white font-black rounded-2xl hover:bg-white/10 transition-all">
              Schedule Enterprise Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center">
                  <ComponentIcon className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Config<span className="text-cyan-400">Gen</span></span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs mb-8">The world&apos;s first AI-powered configuration-to-application runtime engine. Build faster, scale further.</p>
              <div className="flex gap-4">
                <SocialIcon icon={<Twitter className="w-4 h-4" />} />
                <SocialIcon icon={<Github className="w-4 h-4" />} />
                <SocialIcon icon={<Users className="w-4 h-4" />} />
              </div>
            </div>
            
            <FooterLinkGroup title="Product" links={['Runtime Engine', 'UI Generator', 'API Builder', 'Pricing']} />
            <FooterLinkGroup title="Resources" links={['Documentation', 'Guides', 'API Reference', 'Blog']} />
            <FooterLinkGroup title="Company" links={['About Us', 'Careers', 'Privacy Policy', 'Terms of Service']} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
            <p className="text-xs text-slate-600">© 2024 ConfigGen AI Inc. Built with intelligence.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, color, title, desc }: { icon: React.ReactNode, color: string, title: string, desc: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };

  return (
    <ThreeDCard>
      <div className="glass h-full p-8 rounded-3xl border-white/5 flex flex-col gap-6 relative group overflow-hidden">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${colorMap[color]} shadow-lg group-hover:scale-110 transition-transform`}>
          <div className="w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
        </div>
      </div>
    </ThreeDCard>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Link href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
      {icon}
    </Link>
  );
}

function FooterLinkGroup({ title, links }: { title: string, links: string[] }) {
  return (
    <div>
      <h4 className="font-bold text-white mb-6">{title}</h4>
      <ul className="space-y-4 text-sm text-slate-500">
        {links.map(link => (
          <li key={link}><Link href="#" className="hover:text-cyan-400 transition-colors">{link}</Link></li>
        ))}
      </ul>
    </div>
  );
}
