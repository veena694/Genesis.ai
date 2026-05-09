"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGenerator = void 0;
class DbGenerator {
    static generatePrismaSchema(config) {
        let schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;
        config.models?.forEach(model => {
            schema += `
model ${model.name} {
  id        Int      @id @default(autoincrement())
${model.fields.map(f => `  ${f.name}      ${this.mapType(f.type)}${f.required ? '' : '?'} ${f.unique ? '@unique' : ''}`).join('\n')}
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;
        });
        return schema;
    }
    static mapType(type) {
        switch (type.toLowerCase()) {
            case 'string': return 'String';
            case 'number': return 'Int';
            case 'boolean': return 'Boolean';
            case 'date': return 'DateTime';
            default: return 'String';
        }
    }
}
exports.DbGenerator = DbGenerator;
