import axios from "axios";
import { MpcCommandsList } from "./commands/mpcCommands.mjs";
import { AbstractPlayerController } from "./commands/commands.mjs";
import { variableParser } from "./variableParser.mjs";
export class MpcControl extends AbstractPlayerController {
    host;
    port;
    config;
    constructor(host, port, config) {
        super();
        this.host = host;
        this.port = port;
        this.config = config || {};
    }
    get apiHost() {
        const base = "http://" + this.host + ":" + this.port;
        return this.config.pathPrefix ? base + this.config.pathPrefix : base;
    }
    buildUrl(path, params) {
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
    getAxiosConfig() {
        const config = {
            timeout: this.config.timeout || 5000,
            headers: this.config.headers || {}
        };
        return config;
    }
    /**
     * @commandId - any supported command from commands/mpcCommands.ts
     * @data - additional data provided in to api call
     */
    async execute(commandId, data) {
        const url = this.buildUrl("command.html", {
            wm_command: MpcCommandsList[commandId].value,
            ...data
        });
        await axios.get(url, this.getAxiosConfig());
    }
    /**
     * @filePath - path to video file
     */
    async openFile(filePath) {
        const url = this.buildUrl("browser.html", { path: filePath });
        await axios.get(url, this.getAxiosConfig());
    }
    async getVariables() {
        const url = this.buildUrl("variables.html");
        const res = await axios.get(url, this.getAxiosConfig());
        return variableParser(res.data);
    }
}
//# sourceMappingURL=index.mjs.map