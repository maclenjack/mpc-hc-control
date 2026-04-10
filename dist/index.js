"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpcControl = void 0;
const axios_1 = __importStar(require("axios"));
const mpcCommands_1 = require("./commands/mpcCommands");
const types_1 = require("./types");
const commands_1 = require("./commands/commands");
const variableParser_1 = require("./variableParser");
class MpcControl extends commands_1.AbstractPlayerController {
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
            wm_command: mpcCommands_1.MpcCommandsList[commandId].value,
            ...data
        });
        await axios_1.default.get(url, this.getAxiosConfig());
    }
    /**
     * @filePath - path to video file
     */
    async openFile(filePath) {
        const url = this.buildUrl("browser.html", { path: filePath });
        await axios_1.default.get(url, this.getAxiosConfig());
    }
    async getVariables() {
        const url = this.buildUrl("variables.html");
        const res = await axios_1.default.get(url, this.getAxiosConfig());
        return (0, variableParser_1.variableParser)(res.data);
    }
}
exports.MpcControl = MpcControl;
//# sourceMappingURL=index.js.map