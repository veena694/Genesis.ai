import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from './LocalizationContext';
const Table = ({ dataSource }) => {
    const { t } = useI18n();
    const [isImporting, setIsImporting] = React.useState(false);
    const handleImport = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
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
        }
        catch (err) {
            alert(t('Import Failed'));
        }
        finally {
            setIsImporting(false);
        }
    };
    return (_jsxs("div", { className: "glass rounded-[2rem] border-white/5 overflow-hidden shadow-2xl bg-slate-900/40", children: [_jsxs("div", { className: "px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center", children: _jsx("div", { className: "w-4 h-4 border-2 border-cyan-400 rounded-sm" }) }), _jsxs("span", { className: "text-sm font-bold uppercase tracking-widest text-slate-200", children: [t('Recent'), " ", dataSource || t('Data')] })] }), _jsxs("div", { className: "flex gap-4 items-center", children: [_jsxs("label", { className: "cursor-pointer text-[10px] text-cyan-400 uppercase font-black hover:text-cyan-300 transition-colors flex items-center gap-2", children: [isImporting ? t('Processing...') : t('Import CSV'), _jsx("input", { type: "file", className: "hidden", accept: ".csv", onChange: handleImport, disabled: isImporting })] }), _jsx("button", { className: "text-[10px] text-slate-500 uppercase font-black hover:text-white transition-colors", children: t('View All') })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-white/5 text-slate-500 font-bold uppercase text-[10px] tracking-widest", children: [_jsx("th", { className: "px-8 py-4", children: t('Entity') }), _jsx("th", { className: "px-8 py-4", children: t('Classification') }), _jsx("th", { className: "px-8 py-4", children: t('Status') })] }) }), _jsxs("tbody", { className: "divide-y divide-white/5", children: [_jsx(TableRow, { name: "Alex Rivera", plan: "Pro", status: "Active" }), _jsx(TableRow, { name: "Sarah Chen", plan: "Enterprise", status: "Pending" }), _jsx(TableRow, { name: "Marcus Wright", plan: "Starter", status: "Active" })] })] }) })] }));
};
const TableRow = ({ name, plan, status }) => {
    const { t } = useI18n();
    return (_jsxs("tr", { className: "hover:bg-white/[0.02] transition-colors", children: [_jsx("td", { className: "px-8 py-4 text-white font-medium", children: name }), _jsx("td", { className: "px-8 py-4 text-slate-400", children: plan }), _jsx("td", { className: "px-8 py-4", children: _jsx("span", { className: `px-3 py-1 rounded-full text-[10px] font-bold ${status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`, children: t(status) }) })] }));
};
const Button = ({ children, props }) => {
    const { t } = useI18n();
    return (_jsx(motion.button, { whileHover: { scale: 1.02, translateY: -2 }, whileTap: { scale: 0.98 }, className: "px-8 py-4 bg-cyan-500 text-black rounded-2xl font-black text-sm shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 transition-all uppercase tracking-widest", ...props, children: children || t('Execute Action') }));
};
const Card = ({ children }) => (_jsxs("div", { className: "p-10 glass border-white/10 rounded-[2.5rem] shadow-3xl bg-slate-900/40 relative group overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }), children] }));
const Heading = ({ children, level = 2 }) => {
    const Tag = `h${level}`;
    return (_jsx(Tag, { className: "text-3xl md:text-5xl font-black text-white tracking-tighter mb-4", children: children }));
};
const Input = ({ placeholder }) => {
    const { t } = useI18n();
    return (_jsx("div", { className: "relative group", children: _jsx("input", { type: "text", placeholder: placeholder || t('Enter value...'), className: "w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-cyan-500/10" }) }));
};
const Grid = ({ children, cols = 2 }) => (_jsx("div", { className: `grid grid-cols-1 md:grid-cols-${cols} gap-8`, children: children }));
const Stats = ({ props }) => {
    const { t } = useI18n();
    return (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: (props?.items || [1, 2, 3, 4]).map((item, i) => (_jsxs("div", { className: "glass p-6 rounded-2xl border-white/5 bg-white/5", children: [_jsx("p", { className: "text-[10px] text-slate-500 uppercase font-black mb-1", children: item.label || t('Metric') }), _jsx("p", { className: "text-2xl font-black text-white", children: item.value || '0.00' })] }, i))) }));
};
const Navbar = ({ props }) => {
    const { t } = useI18n();
    return (_jsxs("nav", { className: "flex items-center justify-between mb-8 pb-8 border-b border-white/5", children: [_jsx("div", { className: "text-xl font-black text-white", children: props?.title || t('Dashboard') }), _jsx("div", { className: "flex items-center gap-4", children: _jsx("div", { className: "w-8 h-8 rounded-full bg-white/5 border border-white/10" }) })] }));
};
const Chart = ({ props }) => {
    const { t } = useI18n();
    return (_jsxs("div", { className: "glass rounded-[2.5rem] border-white/5 p-8 bg-slate-900/40 min-h-[300px] flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-white font-bold text-lg", children: props?.title || t('Data Analytics') }), _jsx("p", { className: "text-slate-500 text-xs uppercase tracking-widest font-black mt-1", children: t('Real-time Visualization') })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-cyan-500 animate-pulse" }), _jsx("span", { className: "text-[10px] text-cyan-400 font-bold uppercase tracking-widest", children: t('Live') })] })] }), _jsx("div", { className: "flex-1 flex items-end gap-4 px-4 pb-4", children: [40, 70, 45, 90, 65, 80, 55].map((h, i) => (_jsx(motion.div, { initial: { height: 0 }, animate: { height: `${h}%` }, transition: { delay: i * 0.1, duration: 1, ease: "circOut" }, className: "flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-500 rounded-t-xl relative group", children: _jsxs("div", { className: "absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity", children: [h, "%"] }) }, i))) }), _jsxs("div", { className: "flex justify-between mt-4 px-4 text-[10px] text-slate-600 font-bold uppercase", children: [_jsx("span", { children: t('Mon') }), _jsx("span", { children: t('Tue') }), _jsx("span", { children: t('Wed') }), _jsx("span", { children: t('Thu') }), _jsx("span", { children: t('Fri') }), _jsx("span", { children: t('Sat') }), _jsx("span", { children: t('Sun') })] })] }));
};
const Form = ({ children, props }) => {
    const { t } = useI18n();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call and Notification Trigger
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('System Event: Transactional Email Dispatched to user@example.com');
        alert(t('Form Submitted Successfully! Notification Dispatched.'));
        setIsSubmitting(false);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "glass rounded-[2.5rem] border-white/10 p-10 bg-slate-900/60 shadow-3xl", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h3", { className: "text-2xl font-black text-white tracking-tight", children: props?.title || t('Configuration Form') }), _jsx("p", { className: "text-slate-400 text-sm mt-2", children: props?.description || t('Please provide the required information below.') })] }), _jsx("div", { className: "space-y-6", children: children }), _jsx("div", { className: "mt-10 flex justify-end", children: _jsx(Button, { props: { type: 'submit', disabled: isSubmitting }, children: isSubmitting ? t('Sending...') : (props?.submitLabel || t('Submit Request')) }) })] }));
};
const Modal = ({ children, props }) => {
    const { t } = useI18n();
    return (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md", children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0, y: 20 }, animate: { scale: 1, opacity: 1, y: 0 }, className: "max-w-2xl w-full glass rounded-[3rem] border-white/20 p-12 bg-slate-900 relative shadow-4xl", children: [_jsx("button", { className: "absolute top-8 right-8 text-slate-500 hover:text-white transition-colors", children: _jsx("div", { className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center", children: "\u2715" }) }), _jsx("div", { className: "mb-8", children: _jsx("h3", { className: "text-3xl font-black text-white tracking-tight", children: props?.title || t('Notification') }) }), children] }) }));
};
const componentRegistry = {
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
export const Renderer = ({ config }) => {
    const Component = componentRegistry[config.type];
    if (!Component) {
        const { t } = useI18n();
        return (_jsxs("div", { className: "p-6 glass border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400", children: [_jsx("div", { className: "w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center", children: "!" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold uppercase text-xs tracking-widest", children: t('Generation Error') }), _jsxs("p", { className: "text-sm opacity-60", children: [t('Unknown component type'), ": ", config.type] })] })] }));
    }
    return (_jsx(Component, { ...config.props, dataSource: config.dataSource, children: config.children?.map((child, index) => (_jsx(Renderer, { config: child }, index))) }));
};
