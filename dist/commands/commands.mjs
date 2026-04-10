import { millisecondsToDuration } from "../utils/timeConvert.mjs";
export class AbstractPlayerController {
    async isPlaying() {
        const variables = await this.getVariables();
        return variables.state === 2;
    }
    async isPaused() {
        const variables = await this.getVariables();
        return variables.state === 1;
    }
    async isStopped() {
        const variables = await this.getVariables();
        return variables.state === 0;
    }
    async isMuted() {
        const variables = await this.getVariables();
        return variables.muted;
    }
    async getVolume() {
        const variables = await this.getVariables();
        return variables.volumelevel;
    }
    async getPosition() {
        const variables = await this.getVariables();
        return {
            duration: variables.duration,
            position: variables.position
        };
    }
    play() {
        return this.execute("PLAY");
    }
    pause() {
        return this.execute("PAUSE");
    }
    togglePlay() {
        return this.execute("PLAY_PAUSE");
    }
    stop() {
        return this.execute("STOP");
    }
    toggleFullscreen() {
        return this.execute("FULLSCREEN");
    }
    /**
     * @position - new position in ms
     */
    seek(position) {
        return this.execute("SEEK", {
            position: millisecondsToDuration(position)
        });
    }
    /**
     * @delta - delta from current position in ms
     */
    async jump(delta) {
        const variables = await this.getVariables();
        return this.execute("SEEK", {
            position: millisecondsToDuration(variables.position + delta)
        });
    }
    skipBack() {
        return this.execute("PREVIOUS");
    }
    skipForward() {
        return this.execute("NEXT");
    }
    /**
     * @volume - new volume in percents
     */
    setVolume(volume) {
        return this.execute("SET_VOLUME", {
            volume: volume
        });
    }
    toggleMute() {
        return this.execute("VOLUME_MUTE");
    }
    nextAudioTrack() {
        return this.execute("NEXT_AUDIO");
    }
    prevAudioTrack() {
        return this.execute("PREV_AUDIO");
    }
    nextSubtitles() {
        return this.execute("NEXT_SUBTITLE");
    }
    prevSubtitles() {
        return this.execute("PREV_SUBTITLE");
    }
}
//# sourceMappingURL=commands.mjs.map