"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class DataService {
    async createRecord(projectId, modelName, data) {
        return prisma_1.default.dynamicData.create({
            data: {
                projectId,
                modelName,
                data,
            },
        });
    }
    async getRecords(projectId, modelName) {
        const records = await prisma_1.default.dynamicData.findMany({
            where: {
                projectId,
                modelName,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return records.map((r) => ({ id: r.id, ...r.data }));
    }
    async getRecord(id) {
        const record = await prisma_1.default.dynamicData.findUnique({
            where: { id },
        });
        if (!record)
            return null;
        return { id: record.id, ...record.data };
    }
    async updateRecord(id, data) {
        return prisma_1.default.dynamicData.update({
            where: { id },
            data: {
                data,
            },
        });
    }
    async deleteRecord(id) {
        return prisma_1.default.dynamicData.delete({
            where: { id },
        });
    }
}
exports.DataService = DataService;
