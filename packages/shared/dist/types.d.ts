import { z } from 'zod';
export type ComponentType = 'table' | 'form' | 'chart' | 'card' | 'button' | 'input' | 'modal' | 'stats' | 'sidebar' | 'navbar' | 'heading' | 'grid' | 'toast';
export type ComponentConfig = {
    type: ComponentType;
    name?: string;
    dataSource?: string;
    props?: Record<string, any>;
    children?: ComponentConfig[];
};
export declare const ComponentSchema: z.ZodType<ComponentConfig>;
export declare const PageSchema: z.ZodObject<{
    name: z.ZodString;
    path: z.ZodString;
    components: z.ZodArray<z.ZodType<ComponentConfig, z.ZodTypeDef, ComponentConfig>, "many">;
}, "strip", z.ZodTypeAny, {
    path: string;
    name: string;
    components: ComponentConfig[];
}, {
    path: string;
    name: string;
    components: ComponentConfig[];
}>;
export declare const AppConfigSchema: z.ZodObject<{
    projectName: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodString>;
    theme: z.ZodOptional<z.ZodObject<{
        primaryColor: z.ZodOptional<z.ZodString>;
        secondaryColor: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<["dark", "light"]>>;
    }, "strip", z.ZodTypeAny, {
        primaryColor?: string | undefined;
        secondaryColor?: string | undefined;
        mode?: "dark" | "light" | undefined;
    }, {
        primaryColor?: string | undefined;
        secondaryColor?: string | undefined;
        mode?: "dark" | "light" | undefined;
    }>>;
    auth: z.ZodOptional<z.ZodBoolean>;
    localization: z.ZodOptional<z.ZodObject<{
        defaultLanguage: z.ZodDefault<z.ZodString>;
        currentLanguage: z.ZodOptional<z.ZodString>;
        translations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        defaultLanguage: string;
        currentLanguage?: string | undefined;
        translations?: Record<string, Record<string, string>> | undefined;
    }, {
        defaultLanguage?: string | undefined;
        currentLanguage?: string | undefined;
        translations?: Record<string, Record<string, string>> | undefined;
    }>>;
    pages: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        path: z.ZodString;
        components: z.ZodArray<z.ZodType<ComponentConfig, z.ZodTypeDef, ComponentConfig>, "many">;
    }, "strip", z.ZodTypeAny, {
        path: string;
        name: string;
        components: ComponentConfig[];
    }, {
        path: string;
        name: string;
        components: ComponentConfig[];
    }>, "many">;
    models: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        fields: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodString;
            required: z.ZodOptional<z.ZodBoolean>;
            unique: z.ZodOptional<z.ZodBoolean>;
            relation: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            relation?: string | undefined;
        }, {
            type: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            relation?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        fields: {
            type: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            relation?: string | undefined;
        }[];
    }, {
        name: string;
        fields: {
            type: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            relation?: string | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    pages: {
        path: string;
        name: string;
        components: ComponentConfig[];
    }[];
    projectName?: string | undefined;
    version?: string | undefined;
    theme?: {
        primaryColor?: string | undefined;
        secondaryColor?: string | undefined;
        mode?: "dark" | "light" | undefined;
    } | undefined;
    auth?: boolean | undefined;
    localization?: {
        defaultLanguage: string;
        currentLanguage?: string | undefined;
        translations?: Record<string, Record<string, string>> | undefined;
    } | undefined;
    models?: {
        name: string;
        fields: {
            type: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            relation?: string | undefined;
        }[];
    }[] | undefined;
}, {
    pages: {
        path: string;
        name: string;
        components: ComponentConfig[];
    }[];
    projectName?: string | undefined;
    version?: string | undefined;
    theme?: {
        primaryColor?: string | undefined;
        secondaryColor?: string | undefined;
        mode?: "dark" | "light" | undefined;
    } | undefined;
    auth?: boolean | undefined;
    localization?: {
        defaultLanguage?: string | undefined;
        currentLanguage?: string | undefined;
        translations?: Record<string, Record<string, string>> | undefined;
    } | undefined;
    models?: {
        name: string;
        fields: {
            type: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            relation?: string | undefined;
        }[];
    }[] | undefined;
}>;
export type PageConfig = z.infer<typeof PageSchema>;
export type AppConfig = z.infer<typeof AppConfigSchema>;
