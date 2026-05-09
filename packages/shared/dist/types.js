"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigSchema = exports.PageSchema = exports.ComponentSchema = void 0;
const zod_1 = require("zod");
exports.ComponentSchema = zod_1.z.object({
    type: zod_1.z.enum(['table', 'form', 'chart', 'card', 'button', 'input', 'modal', 'stats', 'sidebar', 'navbar', 'heading', 'grid', 'toast']),
    name: zod_1.z.string().optional(),
    dataSource: zod_1.z.string().optional(),
    props: zod_1.z.record(zod_1.z.any()).optional(),
    children: zod_1.z.array(zod_1.z.lazy(() => exports.ComponentSchema)).optional(),
});
exports.PageSchema = zod_1.z.object({
    name: zod_1.z.string(),
    path: zod_1.z.string(),
    components: zod_1.z.array(exports.ComponentSchema),
});
exports.AppConfigSchema = zod_1.z.object({
    projectName: zod_1.z.string().optional(),
    version: zod_1.z.string().optional(),
    theme: zod_1.z.object({
        primaryColor: zod_1.z.string().optional(),
        secondaryColor: zod_1.z.string().optional(),
        mode: zod_1.z.enum(['dark', 'light']).optional(),
    }).optional(),
    auth: zod_1.z.boolean().optional(),
    localization: zod_1.z.object({
        defaultLanguage: zod_1.z.string().default('en'),
        currentLanguage: zod_1.z.string().optional(),
        translations: zod_1.z.record(zod_1.z.record(zod_1.z.string())).optional(),
    }).optional(),
    pages: zod_1.z.array(exports.PageSchema),
    models: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        fields: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            type: zod_1.z.string(),
            required: zod_1.z.boolean().optional(),
            unique: zod_1.z.boolean().optional(),
            relation: zod_1.z.string().optional(),
        })),
    })).optional(),
});
