import { AppConfig } from '@genforge/shared';
export declare class RuntimeEngine {
    static validateConfig(config: any): {
        success: boolean;
        data?: AppConfig;
        error?: any;
    };
    static getSafeConfig(partialConfig: any): AppConfig;
    static getSafeDefaults(): AppConfig;
}
