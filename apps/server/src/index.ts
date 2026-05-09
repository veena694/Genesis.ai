import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AppConfigSchema } from '@genforge/shared';
import { ApiGenerator } from '@genforge/api-generator';
import { DbGenerator } from '@genforge/db-generator';
import prisma from './prisma';
import { DataService } from './services/DataService';
import { AiService } from './services/AiService';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_premium_glow_secret_key';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ message: 'User created successfully', token, user: { id: user.id, email, name } });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Project Endpoints
app.get('/api/projects', authenticateToken, async (req: any, res) => {
  const projects = await prisma.project.findMany({ where: { userId: req.user.id } });
  res.json(projects);
});

app.post('/api/projects', authenticateToken, async (req: any, res) => {
  const { name, config } = req.body;
  const project = await prisma.project.create({
    data: { name, config, userId: req.user.id }
  });
  res.json(project);
});

const dataService = new DataService();

// Dynamic API Generation Endpoint
app.post('/api/generate/:projectId', authenticateToken, async (req: any, res) => {
  const { projectId } = req.params;
  const result = AppConfigSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  const config = result.data;
  
  // Save/Update Project Config
  await prisma.project.update({
    where: { id: projectId },
    data: { config: config as any }
  });

  // Generate Prisma Schema (for export visualization)
  const prismaSchema = DbGenerator.generatePrismaSchema(config);

  // Generate and Register Routes with DataService
  const dynamicRouter = ApiGenerator.generateRoutes(config, projectId, dataService);
  app.use(`/api/v1/app/${projectId}`, dynamicRouter);

  res.json({
    message: `Application '${config.projectName}' synthesized successfully.`,
    baseUrl: `/api/v1/app/${projectId}`,
    prismaSchema: prismaSchema,
    endpoints: config.models?.map(m => `/api/v1/app/${projectId}/${m.name.toLowerCase()}`) || []
  });
});

// Import Endpoints
app.post('/api/import/:projectId/:modelName', authenticateToken, async (req: any, res) => {
  const { projectId, modelName } = req.params;
  const dataArray = req.body; // Expecting array of objects

  if (!Array.isArray(dataArray)) {
    return res.status(400).json({ error: 'Expected an array of records' });
  }

  try {
    const records = await Promise.all(dataArray.map(item => 
      dataService.createRecord(projectId, modelName, item)
    ));
    res.json({ message: `Imported ${records.length} records into ${modelName}`, count: records.length });
  } catch (error) {
    res.status(500).json({ error: 'Import failed' });
  }
});

// AI Suggestion Endpoint
app.post('/api/ai/suggest-fix', authenticateToken, async (req: any, res) => {
  const { config, error } = req.body;
  
  try {
    const result = await AiService.suggestFix(config, error);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'AI Suggestion failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
