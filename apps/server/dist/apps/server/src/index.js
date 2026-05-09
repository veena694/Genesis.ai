"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const shared_1 = require("@genforge/shared");
const api_generator_1 = require("@genforge/api-generator");
const db_generator_1 = require("@genforge/db-generator");
const prisma_1 = __importDefault(require("./prisma"));
const DataService_1 = require("./services/DataService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_premium_glow_secret_key';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Auth Endpoints
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: { email, password: hashedPassword, name }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ message: 'User created successfully', token, user: { id: user.id, email, name } });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to create user' });
    }
});
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !user.password)
            return res.status(401).json({ error: 'Invalid credentials' });
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
// Project Endpoints
app.get('/api/projects', authenticateToken, async (req, res) => {
    const projects = await prisma_1.default.project.findMany({ where: { userId: req.user.id } });
    res.json(projects);
});
app.post('/api/projects', authenticateToken, async (req, res) => {
    const { name, config } = req.body;
    const project = await prisma_1.default.project.create({
        data: { name, config, userId: req.user.id }
    });
    res.json(project);
});
const dataService = new DataService_1.DataService();
// Dynamic API Generation Endpoint
app.post('/api/generate/:projectId', authenticateToken, async (req, res) => {
    const { projectId } = req.params;
    const result = shared_1.AppConfigSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }
    const config = result.data;
    // Save/Update Project Config
    await prisma_1.default.project.update({
        where: { id: projectId },
        data: { config: config }
    });
    // Generate Prisma Schema (for export visualization)
    const prismaSchema = db_generator_1.DbGenerator.generatePrismaSchema(config);
    // Generate and Register Routes with DataService
    const dynamicRouter = api_generator_1.ApiGenerator.generateRoutes(config, projectId, dataService);
    app.use(`/api/v1/app/${projectId}`, dynamicRouter);
    res.json({
        message: `Application '${config.projectName}' synthesized successfully.`,
        baseUrl: `/api/v1/app/${projectId}`,
        prismaSchema: prismaSchema,
        endpoints: config.models?.map(m => `/api/v1/app/${projectId}/${m.name.toLowerCase()}`) || []
    });
});
// Import Endpoints
app.post('/api/import/:projectId/:modelName', authenticateToken, async (req, res) => {
    const { projectId, modelName } = req.params;
    const dataArray = req.body; // Expecting array of objects
    if (!Array.isArray(dataArray)) {
        return res.status(400).json({ error: 'Expected an array of records' });
    }
    try {
        const records = await Promise.all(dataArray.map(item => dataService.createRecord(projectId, modelName, item)));
        res.json({ message: `Imported ${records.length} records into ${modelName}`, count: records.length });
    }
    catch (error) {
        res.status(500).json({ error: 'Import failed' });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
