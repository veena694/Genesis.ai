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
  id        String   @id @default(cuid())
${model.fields.map(f => {
                let line = `  ${f.name}      ${this.mapType(f.type)}${f.required ? '' : '?'} ${f.unique ? '@unique' : ''}`;
                if (f.relation) {
                    line += ` @relation(fields: [${f.name}Id], references: [id])\n  ${f.name}Id    String`;
                }
                return line;
            }).join('\n')}
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
