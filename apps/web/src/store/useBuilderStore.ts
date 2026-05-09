import { create } from 'zustand';
import { AppConfig } from '@genforge/shared';
import { RuntimeEngine } from '@genforge/runtime-engine';

interface BuilderState {
  config: AppConfig;
  currentProjectId: string | null;
  projects: any[];
  error: string | null;
  isLoading: boolean;
  setConfig: (config: AppConfig) => void;
  updateConfig: (json: string) => void;
  fetchProjects: () => Promise<void>;
  saveProject: (name: string) => Promise<void>;
  synthesizeApp: () => Promise<any>;
  getAiSuggestion: (customError?: string) => Promise<void>;
  applyImmediateFix: (error: string) => Promise<any>;
  aiSuggestion: { suggestion: string, fixedConfig: any } | null;
}

const API_BASE = 'http://localhost:4000/api';

const defaultConfig: AppConfig = {
  projectName: 'Quantum Analytics',
  version: '2.0.0',
  pages: [
    {
      name: 'Executive Overview',
      path: '/',
      components: [
        {
          type: 'heading',
          props: { children: 'System Intelligence', level: 1 }
        },
        {
          type: 'grid',
          props: { cols: 2 },
          children: [
            {
              type: 'card',
              children: [
                { type: 'heading', props: { children: 'Core Metrics', level: 3 } },
                { type: 'input', props: { placeholder: 'Filter by region...' } },
                { type: 'button', props: { children: 'Refresh Live Data' } }
              ]
            },
            {
              type: 'card',
              children: [
                { type: 'heading', props: { children: 'Neural Traffic', level: 3 } },
                { type: 'table', props: { dataSource: 'traffic_logs' } }
              ]
            }
          ]
        },
        {
          type: 'table',
          dataSource: 'global_users'
        }
      ]
    }
  ]
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  config: defaultConfig,
  currentProjectId: null,
  projects: [],
  error: null,
  isLoading: false,
  aiSuggestion: null,
  setConfig: (config) => set({ config, error: null, aiSuggestion: null }),
  updateConfig: (json) => {
    try {
      const parsed = JSON.parse(json);
      const validation = RuntimeEngine.validateConfig(parsed);
      
      // Update config if we have usable data (even if partial)
      if (validation.data) {
        set({ config: validation.data as AppConfig });
      }

      if (!validation.success) {
        set({ error: validation.error.message });
      } else {
        set({ error: null });
      }
    } catch (e: any) {
      set({ error: `JSON Parse Error: ${e.message}` });
    }
  },
  fetchProjects: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(`${API_BASE}/projects`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      set({ projects: data });
    }
  },
  saveProject: async (name: string) => {
    const token = localStorage.getItem('token');
    const { config } = get();
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, config })
    });
    if (res.ok) {
      const data = await res.json();
      set({ currentProjectId: data.id });
      get().fetchProjects();
    }
  },
  synthesizeApp: async () => {
    const { currentProjectId, config } = get();
    if (!currentProjectId) {
      await get().saveProject(config.projectName || 'Neural Prototype');
    }
    const token = localStorage.getItem('token');
    const projectId = get().currentProjectId;
    
    set({ isLoading: true });
    const res = await fetch(`${API_BASE}/generate/${projectId}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });
    set({ isLoading: false });
    return res.json();
  },
  getAiSuggestion: async (customError?: string) => {
    const { config, error } = get();
    const activeError = customError || error;
    if (!activeError) return;

    const token = localStorage.getItem('token');
    set({ isLoading: true });
    
    try {
      const res = await fetch(`${API_BASE}/ai/suggest-fix`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ config, error: activeError })
      });
      
      if (res.ok) {
        const data = await res.json();
        set({ aiSuggestion: data });
      }
    } catch (err) {
      console.error('AI suggestion failed', err);
    } finally {
      set({ isLoading: false });
    }
  },
  applyImmediateFix: async (errorText: string) => {
    const { config } = get();
    const token = localStorage.getItem('token');
    set({ isLoading: true });
    
    try {
      const res = await fetch(`${API_BASE}/ai/suggest-fix`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ config, error: errorText })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.fixedConfig) {
          set({ config: data.fixedConfig, error: null, aiSuggestion: null });
          return data.fixedConfig;
        }
      }
      return null;
    } catch (err) {
      console.error('Immediate fix failed', err);
      return null;
    } finally {
      set({ isLoading: false });
    }
  }
}));
