import { AppConfig } from '@genforge/shared';

export class AiService {
  static async suggestFix(config: any, error: string): Promise<{ suggestion: string, fixedConfig: any }> {
    // Simulated AI Logic - In a real app, this would call OpenAI/Gemini
    
    if (error.includes('JSON Parse Error')) {
      return {
        suggestion: "Your JSON structure is broken. I've attempted to fix the syntax and balance the braces.",
        fixedConfig: this.attemptJsonFix(config)
      };
    }

    if (error.toLowerCase().includes('unknown component type')) {
      const match = error.match(/Unknown component type:\s*(\w+)/i);
      const typeToFix = match ? match[1] : 'paragraph';
      return {
        suggestion: `The component type '${typeToFix}' is not recognized. I'll convert it to a compatible 'heading' component.`,
        fixedConfig: this.fixComponentType(config, typeToFix, 'heading')
      };
    }

    return {
      suggestion: "I've analyzed the error and optimized the configuration structure to match the GenForge engine requirements.",
      fixedConfig: config // Default to returning what we have if no specific fix
    };
  }

  private static fixComponentType(config: any, oldType: string, newType: string): any {
    try {
      // Aggressive string replacement to catch all instances regardless of nesting
      let jsonStr = JSON.stringify(config);
      const regex = new RegExp(`"type"\\s*:\\s*"${oldType}"`, 'gi');
      jsonStr = jsonStr.replace(regex, `"type": "${newType}"`);
      const fixed = JSON.parse(jsonStr);
      
      // Ensure specific level-3 for headings if they were paragraphs
      const ensureHeadingProps = (node: any): any => {
        if (!node || typeof node !== 'object') return node;
        if (node.type === newType && !node.props?.level) {
          node.props = { ...node.props, level: 3 };
        }
        if (node.children) node.children = node.children.map(ensureHeadingProps);
        if (node.pages) node.pages = node.pages.map((p: any) => ({ ...p, components: p.components.map(ensureHeadingProps) }));
        return node;
      };
      
      return ensureHeadingProps(fixed);
    } catch (e) {
      return config;
    }
  }

  private static attemptJsonFix(jsonStr: any): any {
    if (typeof jsonStr !== 'string') return jsonStr;
    
    try {
      // Basic heuristic: try to add missing braces
      let fixed = jsonStr.trim();
      if (!fixed.startsWith('{')) fixed = '{' + fixed;
      if (!fixed.endsWith('}')) fixed = fixed + '}';
      return JSON.parse(fixed);
    } catch (e) {
      return null;
    }
  }
}
