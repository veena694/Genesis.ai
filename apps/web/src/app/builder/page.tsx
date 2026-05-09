'use client';

import { useBuilderStore } from '@/store/useBuilderStore';
import { Renderer, LocalizationProvider } from '@genforge/ui-engine';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Play, Layout, Save, AlertCircle, Sparkles, Search, Bell, History, Github, CheckCircle2, Languages, Wand2, X } from 'lucide-react';
import Link from 'next/link';
import { ThreeDCard } from '@/components/ui/ThreeDCard';
import { Exporter } from '@/lib/exporter';

export default function BuilderPage() {
  const { config, updateConfig, error, isLoading, fetchProjects, saveProject, synthesizeApp, projects, currentProjectId, setConfig, getAiSuggestion, applyImmediateFix, aiSuggestion } = useBuilderStore();
  const [jsonValue, setJsonValue] = React.useState(JSON.stringify(config, null, 2));
  const [showHistory, setShowHistory] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [previewKey, setPreviewKey] = React.useState(0);

  const handleApplyImmediateFix = async (err: string) => {
    const fixed = await applyImmediateFix(err);
    if (fixed) {
      setJsonValue(JSON.stringify(fixed, null, 2));
      setPreviewKey(prev => prev + 1);
      
      setStatusMessage({ type: 'success', text: 'Neural Engine corrected and synchronized!' });
      
      try {
        await synthesizeApp();
      } catch (e) {
        console.error('Auto-synthesis after fix failed', e);
      }
    }
    
    setTimeout(() => setStatusMessage(null), 3000);
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  React.useEffect(() => {
    const currentJson = JSON.stringify(config, null, 2);
    if (jsonValue !== currentJson && !error) {
      setJsonValue(currentJson);
    }
  }, [config]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonValue(val);
    updateConfig(val);
  };

  const handleRun = async () => {
    try {
      const result = await synthesizeApp();
      setStatusMessage({ type: 'success', text: result.message });
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Synthesis failed. Check server connection.' });
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleSave = async () => {
    const name = config.projectName || 'Unnamed Project';
    await saveProject(name);
    setStatusMessage({ type: 'success', text: 'Project saved to vault.' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExport = () => {
    const code = Exporter.exportToReact(config);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.projectName?.replace(/\s+/g, '_')}_App.tsx`;
    a.click();
  };

  const toggleLanguage = () => {
    const nextLang = config.localization?.currentLanguage === 'en' ? 'es' : 'en';
    const newConfig = {
      ...config,
      localization: {
        ...config.localization,
        currentLanguage: nextLang,
        translations: {
          en: { 'Dashboard': 'Dashboard', 'Data': 'Data', 'Entity': 'Entity' },
          es: { 'Dashboard': 'Panel de Control', 'Data': 'Datos', 'Entity': 'Entidad' },
          ...config.localization?.translations
        }
      }
    };
    setConfig(newConfig as any);
    setJsonValue(JSON.stringify(newConfig, null, 2));
  };

  const applyAiFix = () => {
    if (aiSuggestion?.fixedConfig) {
      setConfig(aiSuggestion.fixedConfig);
      setJsonValue(JSON.stringify(aiSuggestion.fixedConfig, null, 2));
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#030712] relative overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-20"></div>
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(3,7,18,1)_100%)] pointer-events-none z-0"></div>

      {/* Header */}
      <header className="h-20 z-50 px-6 lg:px-10 flex items-center justify-between glass border-b border-white/10 relative backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
              <Layout className="text-white w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-xl lg:text-3xl font-black tracking-tighter text-white leading-none">GENESIS</span>
                <span className="text-cyan-400 text-xl lg:text-3xl font-black tracking-tighter leading-none">.AI</span>
              </div>
            </div>
          </Link>

          <div className="h-10 w-px bg-white/10 hidden xl:block"></div>

          <div className="hidden xl:flex items-center gap-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${showHistory ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
            >
              <History className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">History</span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-all hover:bg-white/5"
            >
              <Languages className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-widest">{config.localization?.currentLanguage || 'en'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">

          <button
            onClick={handleExport}
            className="hidden lg:flex px-6 py-2.5 glass rounded-xl text-sm font-black text-white hover:bg-white/10 transition-all items-center gap-2 border border-white/20"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span className="tracking-tight">Export</span>
          </button>
          <button
            onClick={handleSave}
            className="hidden md:flex px-6 py-2.5 glass rounded-xl text-sm font-black text-white hover:bg-white/10 transition-all items-center gap-2 border border-white/20"
          >
            <Save className="w-4 h-4 text-cyan-400" />
            <span className="tracking-tight">Save</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col xl:flex-row overflow-auto xl:overflow-hidden relative z-10 p-4 xl:p-6 gap-6 max-w-[1800px] mx-auto w-full">
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-full xl:w-72 glass-dark border border-white/10 rounded-[2.5rem] p-6 flex flex-col gap-6"
            >
              <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                Projects
              </h3>
              <div className="space-y-3 overflow-y-auto">
                {projects.map(item => (
                  <div key={item.id} className={`p-4 rounded-2xl bg-white/5 border transition-all group cursor-pointer ${currentProjectId === item.id ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/5 hover:border-cyan-500/30'}`}>
                    <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{item.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Editor Side */}
        <ThreeDCard className="w-full xl:w-[500px] h-[500px] xl:h-full">
          <div className="flex flex-col h-full rounded-[2.5rem] overflow-hidden glass-dark border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-cyan-500/20 group-hover:shadow-cyan-500/5">
            {/* Editor Toolbar */}
            <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
                </div>
                <div className="h-4 w-px bg-white/10 mx-2"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" /> config.json
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Actual Editor Container */}
            <div className="flex-1 relative code-editor-bg">
              <div className="absolute top-0 left-0 w-full h-full scanning-line opacity-10 pointer-events-none"></div>
              <textarea
                value={jsonValue}
                onChange={handleJsonChange}
                className="absolute inset-0 w-full h-full bg-transparent p-8 font-mono text-sm text-cyan-100/90 leading-relaxed outline-none resize-none selection:bg-cyan-500/40 focus:text-white transition-colors custom-scrollbar"
                spellCheck={false}
              />

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-6 left-6 right-6 p-5 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-start gap-4 backdrop-blur-xl z-20"
                  >
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Validation Error</span>
                      <p className="text-xs text-red-200/80 leading-relaxed font-mono">{error}</p>
                    </div>
                    <button
                      onClick={getAiSuggestion}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl flex items-center gap-2 transition-all group/ai"
                    >
                      <Wand2 className="w-4 h-4 text-red-400 group-hover/ai:rotate-12 transition-transform" />
                      <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">AI Fix</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Suggestion Modal Overlay */}
              <AnimatePresence>
                {aiSuggestion && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-cyan-500/20 rounded-[2rem] flex items-center justify-center mb-6 border border-cyan-500/30">
                      <Sparkles className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tighter mb-2 uppercase">Neural Suggestion</h3>
                    <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-8">{aiSuggestion.suggestion}</p>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={applyAiFix}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl text-sm font-black text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all uppercase tracking-widest"
                      >
                        Apply Neural Fix
                      </button>
                      <button
                        onClick={() => setConfig(config)} // This effectively clears the suggestion state in store
                        className="px-8 py-3 glass rounded-2xl text-sm font-black text-white hover:bg-white/5 transition-all uppercase tracking-widest border border-white/10"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Editor Footer */}
            <div className="px-6 py-4 bg-slate-900/50 border-t border-white/10 flex items-center gap-4">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: error ? '40%' : '100%' }}
                  className={`h-full transition-all duration-500 ${error ? 'bg-gradient-to-r from-red-600 to-orange-500' : 'bg-gradient-to-r from-cyan-600 to-indigo-500'}`}
                />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${error ? 'text-red-400' : 'text-cyan-400'}`}>
                {error ? 'Invalid Config' : 'Engine Optimized'}
              </span>
            </div>
          </div>
        </ThreeDCard>

        {/* Preview Side */}
        <ThreeDCard className="flex-1 h-full min-h-[600px]">
          <div className="flex flex-col h-full rounded-[2.5rem] overflow-hidden glass border border-white/10 relative shadow-2xl bg-slate-950/40">
            {/* Preview Header */}
            <div className="bg-white/5 border-b border-white/10 px-6 xl:px-10 py-6 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Layout className="w-5 h-5 xl:w-6 xl:h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Live Runtime</span>
                  <span className="text-lg xl:text-xl font-black text-white tracking-tight">{config.projectName}</span>
                </div>
              </div>
              <div className="flex gap-4 xl:gap-8 items-center">
                <div className="hidden sm:flex gap-4">
                  <Search className="w-5 h-5 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors" />
                  <Bell className="w-5 h-5 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors" />
                </div>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20 shadow-lg p-0.5">
                  <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-xs font-black text-white uppercase">Me</div>
                </div>
              </div>
            </div>

            {/* Preview Content Area */}
            <div className="flex-1 overflow-y-auto p-6 xl:p-12 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] custom-scrollbar relative">
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 border-2 border-cyan-500/20 rounded-full animate-ping"></div>
                      <Sparkles className="w-10 h-10 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <span className="mt-8 text-xs font-black text-cyan-400 uppercase tracking-[0.5em] animate-pulse">Neural Synthesizing</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`absolute top-6 right-6 z-40 px-6 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-2xl border ${statusMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                  >
                    {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="text-xs font-bold uppercase tracking-widest">{statusMessage.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div key={previewKey} className="max-w-5xl mx-auto">
                <LocalizationProvider
                  language={config.localization?.currentLanguage || 'en'}
                  translations={config.localization?.translations}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={JSON.stringify(config)}
                      initial={{ opacity: 0, scale: 0.99, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.01, y: -10 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="space-y-8 xl:space-y-12"
                    >
                      {config.pages[0].components.map((comp, idx) => (
                        <Renderer key={idx} config={comp} onAiFix={handleApplyImmediateFix} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </LocalizationProvider>
              </div>

              {/* Floating AI Status */}
              <div className="absolute bottom-6 right-6 xl:bottom-10 xl:right-10 flex items-center gap-3 px-5 py-3 glass rounded-2xl shadow-2xl border-cyan-500/20 group hover:border-cyan-500/40 transition-all cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Render Active</span>
                </div>
              </div>
            </div>
          </div>
        </ThreeDCard>
      </main>
    </div>
  );
}
