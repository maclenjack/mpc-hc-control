import { MpcCommands } from "./commands/mpcCommands";
import { Dictionary } from "./types";
import { IPlayerVariables, AbstractPlayerController } from "./commands/commands";
export declare class MpcControl extends AbstractPlayerController {
    private host;
    private port;
    constructor(host: string, port: number);
    get apiHost(): string;
    /**
     * @commandId - any supported command from commands/mpcCommands.ts
     * @data - additional data provided in to api call
     */
    execute(commandId: MpcCommands, data?: Dictionary<any>): Promise<any>;
    /**
     * @filePath - path to video file
     */
    openFile(filePath: string): Promise<any>;
    getVariables(): Promise<IPlayerVariables>;
}
//# sourceMappingURL=index.d.ts.map