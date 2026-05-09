import { AppConfigSchema, AppConfig } from '@genforge/shared';

export class RuntimeEngine {
  static validateConfig(config: any): { success: boolean; data?: AppConfig; error?: any } {
    // Attempt deep partial validation for live editing
    const result = AppConfigSchema.safeParse(config);
    if (result.success) {
      return { success: true, data: result.data };
    }
    
    // If it's a valid object but doesn't match schema, we still might want to render what we can
    if (config && typeof config === 'object' && Array.isArray(config.pages)) {
      return { success: true, data: this.getSafeConfig(config), error: result.error };
    }

    return { success: false, error: result.error };
  }

  static getSafeConfig(partialConfig: any): AppConfig {
    const base = this.getSafeDefaults();
    return {
      ...base,
      ...partialConfig,
      projectName: partialConfig?.projectName || base.projectName,
      pages: Array.isArray(partialConfig?.pages) ? partialConfig.pages.map((p: any) => ({
        name: p?.name || 'New Page',
        path: p?.path || '/',
        components: Array.isArray(p?.components) ? p.components : []
      })) : base.pages
    };
  }

  static getSafeDefaults(): AppConfig {
    return {
      projectName: 'Neural Prototype',
      version: '1.0.0',
      pages: [
        {
          name: 'Dashboard',
          path: '/',
          components: []
        }
      ]
    };
  }
}
