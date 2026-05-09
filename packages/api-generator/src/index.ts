import { AppConfig } from '@genforge/shared';
import { Router } from 'express';

export interface IDataService {
  createRecord(projectId: string, modelName: string, data: any): Promise<any>;
  getRecords(projectId: string, modelName: string): Promise<any[]>;
  getRecord(id: string): Promise<any>;
  updateRecord(id: string, data: any): Promise<any>;
  deleteRecord(id: string): Promise<any>;
}

export class ApiGenerator {
  static generateRoutes(config: AppConfig, projectId: string, dataService: IDataService): Router {
    const router = Router();

    // Auth Middleware
    const authMiddleware = (req: any, res: any, next: any) => {
      if (config.auth) {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: 'Unauthorized - Auth Ecosystem Active' });
      }
      next();
    };

    router.use(authMiddleware);

    // Generate routes for models
    config.models?.forEach(model => {
      const path = `/${model.name.toLowerCase()}`;
      
      router.get(path, async (req, res) => {
        try {
          const records = await dataService.getRecords(projectId, model.name);
          res.json(records);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch records' });
        }
      });

      router.post(path, async (req, res) => {
        try {
          const record = await dataService.createRecord(projectId, model.name, req.body);
          res.json(record);
        } catch (error) {
          res.status(500).json({ error: 'Failed to create record' });
        }
      });

      router.get(`${path}/:id`, async (req, res) => {
        try {
          const record = await dataService.getRecord(req.params.id);
          if (!record) return res.status(404).json({ error: 'Record not found' });
          res.json(record);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch record' });
        }
      });

      router.put(`${path}/:id`, async (req, res) => {
        try {
          const record = await dataService.updateRecord(req.params.id, req.body);
          res.json(record);
        } catch (error) {
          res.status(500).json({ error: 'Failed to update record' });
        }
      });

      router.delete(`${path}/:id`, async (req, res) => {
        try {
          await dataService.deleteRecord(req.params.id);
          res.json({ message: 'Record deleted' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete record' });
        }
      });
    });

    return router;
  }
}
