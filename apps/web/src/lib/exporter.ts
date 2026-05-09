import { AppConfig } from '@genforge/shared';

export class Exporter {
  static exportToReact(config: AppConfig): string {
    const components = config.pages[0].components.map(c => `      <Renderer config={${JSON.stringify(c)}} />`).join('\n');
    
    return `
import React from 'react';
import { Renderer } from '@genforge/ui-engine';

export default function GeneratedApp() {
  return (
    <div className="min-h-screen bg-[#030712] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">${config.projectName}</h1>
${components}
    </div>
  );
}
    `.trim();
  }
}
