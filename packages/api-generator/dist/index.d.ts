import { AppConfig } from '@genforge/shared';
import { Router } from 'express';
export interface IDataService {
    createRecord(projectId: string, modelName: string, data: any): Promise<any>;
    getRecords(projectId: string, modelName: string): Promise<any[]>;
    getRecord(id: string): Promise<any>;
    updateRecord(id: string, data: any): Promise<any>;
    deleteRecord(id: string): Promise<any>;
}
export declare class ApiGenerator {
    static generateRoutes(config: AppConfig, projectId: string, dataService: IDataService): Router;
}
