import { AppConfig } from '@genforge/shared';

export class DbGenerator {
  static generatePrismaSchema(config: AppConfig): string {
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

  private static mapType(type: string): string {
    switch (type.toLowerCase()) {
      case 'string': return 'String';
      case 'number': return 'Int';
      case 'boolean': return 'Boolean';
      case 'date': return 'DateTime';
      default: return 'String';
    }
  }
}
