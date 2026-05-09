import prisma from '../prisma';

export class DataService {
  async createRecord(projectId: string, modelName: string, data: any) {
    return prisma.dynamicData.create({
      data: {
        projectId,
        modelName,
        data,
      },
    });
  }

  async getRecords(projectId: string, modelName: string) {
    const records = await prisma.dynamicData.findMany({
      where: {
        projectId,
        modelName,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return records.map((r: any) => ({ id: r.id, ...(r.data as any) }));
  }

  async getRecord(id: string) {
    const record = await prisma.dynamicData.findUnique({
      where: { id },
    });
    if (!record) return null;
    return { id: record.id, ...(record.data as any) };
  }

  async updateRecord(id: string, data: any) {
    return prisma.dynamicData.update({
      where: { id },
      data: {
        data,
      },
    });
  }

  async deleteRecord(id: string) {
    return prisma.dynamicData.delete({
      where: { id },
    });
  }
}
