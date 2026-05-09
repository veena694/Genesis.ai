"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const shared_1 = require("@genforge/shared");
const api_generator_1 = require("@genforge/api-generator");
const db_generator_1 = require("@genforge/db-generator");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Dynamic API Generation Endpoint
app.post('/api/generate', (req, res) => {
    const result = shared_1.AppConfigSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }
    const config = result.data;
    // Generate Prisma Schema
    const prismaSchema = db_generator_1.DbGenerator.generatePrismaSchema(config);
    console.log('Generated Prisma Schema:', prismaSchema);
    // Generate and Register Routes
    const dynamicRouter = api_generator_1.ApiGenerator.generateRoutes(config);
    app.use('/api/v1', dynamicRouter);
    res.json({
        message: `Application '${config.projectName}' generated and mounted successfully.`,
        prismaSchema: prismaSchema,
        endpoints: config.pages.map((p) => `/api/v1/${p.name.toLowerCase()}`)
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
