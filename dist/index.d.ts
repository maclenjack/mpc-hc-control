import { MpcCommands } from "./commands/mpcCommands";
import { Dictionary } from "./types";
import { IPlayerVariables, AbstractPlayerController } from "./commands/commands";
export interface MpcControlConfig {
    timeout?: number;
    headers?: Dictionary<string>;
    pathPrefix?: string;
    queryParams?: {
        host: string;
        port: number;
    };
}
export declare class MpcControl extends AbstractPlayerController {
    private host;
    private port;
    private config;
    constructor(host: string, port: number, config?: MpcControlConfig);
    private get apiHost();
    private buildUrl;
    private getAxiosConfig;
    /**
     * @commandId - any supported command from commands/mpcCommands.ts
     * @data - additional data provided in to api call
     */
    execute(commandId: MpcCommands, data?: Dictionary<string | number | boolean>): Promise<void>;
    /**
     * @filePath - path to video file
     */
    openFile(filePath: string): Promise<void>;
    getVariables(): Promise<IPlayerVariables>;
}
//# sourceMappingURL=index.d.ts.map