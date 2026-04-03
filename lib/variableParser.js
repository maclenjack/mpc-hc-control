"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variableParser = variableParser;
function variableParser(variablePageHtml) {
    const reg = /<p id="(\w+)">(.*)<\/p>/ig;
    const fields = {};
    let result;
    while ((result = reg.exec(variablePageHtml)) !== null) {
        fields[result[1]] = result[2];
    }
    return {
        version: fields["version"] ?? "",
        file: fields["file"] ?? "",
        filepath: fields["filepath"] ?? "",
        filedir: fields["filedir"] ?? "",
        size: fields["size"] ?? "",
        state: parseInt(fields["state"] ?? "0", 10),
        statestring: fields["statestring"] ?? "",
        position: parseFloat(fields["position"] ?? "0"),
        positionstring: fields["positionstring"] ?? "",
        duration: parseFloat(fields["duration"] ?? "0"),
        durationstring: fields["durationstring"] ?? "",
        volumelevel: parseFloat(fields["volumelevel"] ?? "0"),
        muted: fields["muted"] !== "0"
    };
}
