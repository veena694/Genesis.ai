import { z } from 'zod';

export type ComponentType = 'table' | 'form' | 'chart' | 'card' | 'button' | 'input' | 'modal' | 'stats' | 'sidebar' | 'navbar' | 'heading' | 'grid' | 'toast';

export type ComponentConfig = {
  type: ComponentType;
  name?: string;
  dataSource?: string;
  props?: Record<string, any>;
  children?: ComponentConfig[];
};

export const ComponentSchema: z.ZodType<ComponentConfig> = z.object({
  type: z.enum(['table', 'form', 'chart', 'card', 'button', 'input', 'modal', 'stats', 'sidebar', 'navbar', 'heading', 'grid', 'toast']),
  name: z.string().optional(),
  dataSource: z.string().optional(),
  props: z.record(z.any()).optional(),
  children: z.array(z.lazy(() => ComponentSchema)).optional(),
});

export const PageSchema = z.object({
  name: z.string(),
  path: z.string(),
  components: z.array(ComponentSchema),
});

export const AppConfigSchema = z.object({
  projectName: z.string().optional(),
  version: z.string().optional(),
  theme: z.object({
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
    mode: z.enum(['dark', 'light']).optional(),
  }).optional(),
  auth: z.boolean().optional(),
  localization: z.object({
    defaultLanguage: z.string().default('en'),
    currentLanguage: z.string().optional(),
    translations: z.record(z.record(z.string())).optional(),
  }).optional(),
  pages: z.array(PageSchema),
  models: z.array(z.object({
    name: z.string(),
    fields: z.array(z.object({
      name: z.string(),
      type: z.string(),
      required: z.boolean().optional(),
      unique: z.boolean().optional(),
      relation: z.string().optional(),
    })),
  })).optional(),
});

export type PageConfig = z.infer<typeof PageSchema>;
export type AppConfig = z.infer<typeof AppConfigSchema>;
