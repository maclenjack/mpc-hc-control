"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.millisecondsToDuration = millisecondsToDuration;
function millisecondsToDuration(ms) {
    if (ms <= 0) {
        return "00:00:00";
    }
    let duration = Math.floor(ms / 1000);
    const hours = Math.floor(duration / 3600);
    duration = duration % 3600;
    const minutes = Math.floor(duration / 60);
    duration = duration % 60;
    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + duration.toString().padStart(2, "0");
}
//# sourceMappingURL=timeConvert.js.map