"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpcControl = void 0;
const axios_1 = __importDefault(require("axios"));
const mpcCommands_1 = require("./commands/mpcCommands");
const commands_1 = require("./commands/commands");
const variableParser_1 = require("./variableParser");
class MpcControl extends commands_1.AbstractPlayerController {
    constructor(host, port) {
        super();
        this.host = host;
        this.port = port;
    }
    get apiHost() {
        return "http://" + this.host + ":" + this.port;
    }
    /**
     * @commandId - any supported command from commands/mpcCommands.ts
     * @data - additional data provided in to api call
     */
    execute(commandId, data) {
        const url = this.apiHost + "/command.html";
        return axios_1.default.get(url, {
            params: {
                wm_command: mpcCommands_1.MpcCommandsList[commandId].value,
                ...data
            }
        });
    }
    /**
     * @filePath - path to video file
     */
    openFile(filePath) {
        const url = this.apiHost + "/browser.html?path=" + filePath;
        return axios_1.default.get(url);
    }
    getVariables() {
        const url = this.apiHost + "/variables.html";
        return axios_1.default.get(url).then((res) => {
            return (0, variableParser_1.variableParser)(res.data);
        });
    }
}
exports.MpcControl = MpcControl;
