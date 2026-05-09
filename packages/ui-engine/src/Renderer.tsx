import React from 'react';
import { ComponentConfig } from '@genforge/shared';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from './LocalizationContext';
import { Wand2 } from 'lucide-react';

const Table = ({ dataSource }: { dataSource?: string }) => {
  const { t } = useI18n();
  const [isImporting, setIsImporting] = React.useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    // Mock CSV parsing
    const mockData = [
      { name: 'Imported User 1', plan: 'Enterprise', status: 'Active' },
      { name: 'Imported User 2', plan: 'Pro', status: 'Pending' }
    ];

    try {
      // In a real app, we'd use currentProjectId from a context or store
      // For the renderer, we'll mock the API call
      console.log(`Importing to ${dataSource}...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`${t('Import Successful')}: 2 ${t('records added')}`);
    } catch (err) {
      alert(t('Import Failed'));
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="glass rounded-[2rem] border-white/5 overflow-hidden shadow-2xl bg-slate-900/40">
      <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-cyan-400 rounded-sm"></div>
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-slate-200">{t('Recent')} {dataSource || t('Data')}</span>
        </div>
        <div className="flex gap-4 items-center">
          <label className="cursor-pointer text-[10px] text-cyan-400 uppercase font-black hover:text-cyan-300 transition-colors flex items-center gap-2">
            {isImporting ? t('Processing...') : t('Import CSV')}
            <input type="file" className="hidden" accept=".csv" onChange={handleImport} disabled={isImporting} />
          </label>
          <button className="text-[10px] text-slate-500 uppercase font-black hover:text-white transition-colors">{t('View All')}</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white/5 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              <th className="px-8 py-4">{t('Entity')}</th>
              <th className="px-8 py-4">{t('Classification')}</th>
              <th className="px-8 py-4">{t('Status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <TableRow name="Alex Rivera" plan="Pro" status="Active" />
            <TableRow name="Sarah Chen" plan="Enterprise" status="Pending" />
            <TableRow name="Marcus Wright" plan="Starter" status="Active" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = ({ name, plan, status }: { name: string, plan: string, status: string }) => {
  const { t } = useI18n();
  return (
    <tr className="hover:bg-white/[0.02] transition-colors">
      <td className="px-8 py-4 text-white font-medium">{name}</td>
      <td className="px-8 py-4 text-slate-400">{plan}</td>
      <td className="px-8 py-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
          status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {t(status)}
        </span>
      </td>
    </tr>
  );
};

const Button = ({ children, props }: { children?: React.ReactNode, props?: any }) => {
  const { t } = useI18n();
  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className="px-8 py-4 bg-cyan-500 text-black rounded-2xl font-black text-sm shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 transition-all uppercase tracking-widest"
      {...props}
    >
      {children || t('Execute Action')}
    </motion.button>
  );
};

const Card = ({ children }: { children?: React.ReactNode }) => (
  <div className="p-10 glass border-white/10 rounded-[2.5rem] shadow-3xl bg-slate-900/40 relative group overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    {children}
  </div>
);

const Heading = ({ children, level = 2 }: { children?: React.ReactNode, level?: number }) => {
  const Tag = `h${level}` as any;
  return (
    <Tag className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
      {children}
    </Tag>
  );
};

const Input = ({ placeholder }: { placeholder?: string }) => {
  const { t } = useI18n();
  return (
    <div className="relative group">
      <input 
        type="text" 
        placeholder={placeholder || t('Enter value...')}
        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-cyan-500/10"
      />
    </div>
  );
};

const Grid = ({ children, cols = 2 }: { children?: React.ReactNode, cols?: number }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-8`}>
    {children}
  </div>
);

const Stats = ({ props }: { props?: any }) => {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {(props?.items || [1, 2, 3, 4]).map((item: any, i: number) => (
        <div key={i} className="glass p-6 rounded-2xl border-white/5 bg-white/5">
          <p className="text-[10px] text-slate-500 uppercase font-black mb-1">{item.label || t('Metric')}</p>
          <p className="text-2xl font-black text-white">{item.value || '0.00'}</p>
        </div>
      ))}
    </div>
  );
};

const Navbar = ({ props }: { props?: any }) => {
  const { t } = useI18n();
  return (
    <nav className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
      <div className="text-xl font-black text-white">{props?.title || t('Dashboard')}</div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10"></div>
      </div>
    </nav>
  );
};

const Chart = ({ props }: { props?: any }) => {
  const { t } = useI18n();
  return (
    <div className="glass rounded-[2.5rem] border-white/5 p-8 bg-slate-900/40 min-h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-white font-bold text-lg">{props?.title || t('Data Analytics')}</h3>
          <p className="text-slate-500 text-xs uppercase tracking-widest font-black mt-1">{t('Real-time Visualization')}</p>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{t('Live')}</span>
        </div>
      </div>
      <div className="flex-1 flex items-end gap-4 px-4 pb-4">
        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
            className="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-500 rounded-t-xl relative group"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {h}%
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-4 px-4 text-[10px] text-slate-600 font-bold uppercase">
        <span>{t('Mon')}</span><span>{t('Tue')}</span><span>{t('Wed')}</span><span>{t('Thu')}</span><span>{t('Fri')}</span><span>{t('Sat')}</span><span>{t('Sun')}</span>
      </div>
    </div>
  );
};

const Form = ({ children, props }: { children?: React.ReactNode, props?: any }) => {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and Notification Trigger
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('System Event: Transactional Email Dispatched to user@example.com');
    alert(t('Form Submitted Successfully! Notification Dispatched.'));
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2.5rem] border-white/10 p-10 bg-slate-900/60 shadow-3xl">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-white tracking-tight">{props?.title || t('Configuration Form')}</h3>
        <p className="text-slate-400 text-sm mt-2">{props?.description || t('Please provide the required information below.')}</p>
      </div>
      <div className="space-y-6">
        {children}
      </div>
      <div className="mt-10 flex justify-end">
        <Button props={{ type: 'submit', disabled: isSubmitting }}>
          {isSubmitting ? t('Sending...') : (props?.submitLabel || t('Submit Request'))}
        </Button>
      </div>
    </form>
  );
};

const Modal = ({ children, props }: { children?: React.ReactNode, props?: any }) => {
  const { t } = useI18n();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="max-w-2xl w-full glass rounded-[3rem] border-white/20 p-12 bg-slate-900 relative shadow-4xl"
      >
        <button className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">✕</div>
        </button>
        <div className="mb-8">
          <h3 className="text-3xl font-black text-white tracking-tight">{props?.title || t('Notification')}</h3>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

const componentRegistry: Record<string, React.FC<any>> = {
  table: Table,
  button: Button,
  card: Card,
  heading: Heading,
  input: Input,
  grid: Grid,
  stats: Stats,
  navbar: Navbar,
  chart: Chart,
  form: Form,
  modal: Modal,
};

export const Renderer: React.FC<{ config: ComponentConfig, onAiFix?: (error: string) => void }> = ({ config, onAiFix }) => {
  const Component = componentRegistry[config.type];

  if (!Component) {
    const { t } = useI18n();
    return (
      <div className="p-6 glass border-red-500/20 rounded-2xl flex items-center justify-between gap-4 text-red-400">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">!</div>
          <div>
            <p className="font-bold uppercase text-xs tracking-widest">{t('Generation Error')}</p>
            <p className="text-sm opacity-60">{t('Unknown component type')}: {config.type}</p>
          </div>
        </div>
        {onAiFix && (
          <button
            onClick={() => onAiFix(`Unknown component type: ${config.type}`)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl flex items-center gap-2 transition-all group/ai"
          >
            <Wand2 className="w-4 h-4 text-red-400 group-hover/ai:rotate-12 transition-transform" />
            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">{t('AI Fix')}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <Component {...config.props} dataSource={config.dataSource}>
      {config.children && config.children.length > 0 
        ? config.children.map((child, index) => (
            <Renderer key={index} config={child} onAiFix={onAiFix} />
          ))
        : config.props?.children
      }
    </Component>
  );
};
