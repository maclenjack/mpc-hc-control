import axios, { type AxiosRequestConfig } from "axios";
import {type MpcCommands, MpcCommandsList} from "./commands/mpcCommands.mjs";
import type { Dictionary } from "./types.mjs";
import {type IPlayerVariables, AbstractPlayerController} from "./commands/commands.mjs";
import {variableParser} from "./variableParser.mjs";

export interface MpcControlConfig {
    timeout?: number;
    headers?: Dictionary<string>;
    pathPrefix?: string;
    queryParams?: {
      host: string,
      port: number
    };
}

export class MpcControl extends AbstractPlayerController {
    private host: string;
    private port: number;
    private config: MpcControlConfig;

    public constructor(host: string, port: number, config?: MpcControlConfig) {
        super();
        this.host = host;
        this.port = port;
        this.config = config || {};
    }

    private get apiHost(): string {
        const base = "http://" + this.host + ":" + this.port;
        return this.config.pathPrefix ? base + this.config.pathPrefix : base;
    }

    private buildUrl(path: string, params?: Dictionary<string | number | boolean>): string {
        let url = this.apiHost + "/" + path;
        
        // Add query parameters
        const queryParams = new URLSearchParams();
        
        // Add config query params
        if (this.config.queryParams) {
            for (const [key, value] of Object.entries(this.config.queryParams)) {
                queryParams.append(key, String(value));
            }
        }
        
        // Add method params
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                queryParams.append(key, String(value));
            }
        }
        
        const queryString = queryParams.toString();
        if (queryString) {
            url += "?" + queryString;
        }
        
        return url;
    }

    private getAxiosConfig(): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            timeout: this.config.timeout || 5000,
            headers: this.config.headers || {}
        };
        return config;
    }

    /**
     * @commandId - any supported command from commands/mpcCommands.ts
     * @data - additional data provided in to api call
     */
    public async execute(commandId: MpcCommands, data?: Dictionary<string | number | boolean>): Promise<void> {
        const url = this.buildUrl("command.html", {
            wm_command: MpcCommandsList[commandId].value,
            ...data
        });
        await axios.get(url, this.getAxiosConfig());
    }

    /**
     * @filePath - path to video file
     */
    public async openFile(filePath: string): Promise<void> {
        const url = this.buildUrl("browser.html", { path: filePath });
        await axios.get(url, this.getAxiosConfig());
    }

    public async getVariables(): Promise<IPlayerVariables> {
        const url = this.buildUrl("variables.html");
        const res = await axios.get(url, this.getAxiosConfig());
        return variableParser(res.data);
    }
}
