import type { MpcCommands } from "./mpcCommands.mjs";
import type { Dictionary } from "../types.mjs";
export interface IPlayerVariables {
    version: string;
    file: string;
    filepath: string;
    filedir: string;
    size: string;
    state: number;
    statestring: string;
    position: number;
    positionstring: string;
    duration: number;
    durationstring: string;
    volumelevel: number;
    muted: boolean;
}
export interface IPositionInfo {
    duration: number;
    position: number;
}
export declare abstract class AbstractPlayerController {
    abstract execute(commandId: MpcCommands, data?: Dictionary<string | number | boolean>): Promise<void>;
    abstract getVariables(): Promise<IPlayerVariables>;
    isPlaying(): Promise<boolean>;
    isPaused(): Promise<boolean>;
    isStopped(): Promise<boolean>;
    isMuted(): Promise<boolean>;
    getVolume(): Promise<number>;
    getPosition(): Promise<IPositionInfo>;
    play(): Promise<void>;
    pause(): Promise<void>;
    togglePlay(): Promise<void>;
    stop(): Promise<void>;
    toggleFullscreen(): Promise<void>;
    /**
     * @position - new position in ms
     */
    seek(position: number): Promise<void>;
    /**
     * @delta - delta from current position in ms
     */
    jump(delta: number): Promise<void>;
    skipBack(): Promise<void>;
    skipForward(): Promise<void>;
    /**
     * @volume - new volume in percents
     */
    setVolume(volume: number): Promise<void>;
    toggleMute(): Promise<void>;
    nextAudioTrack(): Promise<void>;
    prevAudioTrack(): Promise<void>;
    nextSubtitles(): Promise<void>;
    prevSubtitles(): Promise<void>;
}
//# sourceMappingURL=commands.d.mts.map