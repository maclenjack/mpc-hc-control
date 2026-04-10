# MPC-HC Control

> ⚠️ **This is a maintained fork**
> 
> Original repository: [rzcoder/mpc-hc-control](https://github.com/rzcoder/mpc-hc-control)
> 
> This fork includes updates, fixes, and modernization of the original library.

Basic control over [Media Player Classic - Home Cinema](https://mpc-hc.org/) via http api.

## Setup
Enable web interface in mpc-hc settings.
 
Install directly from GitHub:
`npm install github:maclenjack/mpc-hc-control`

## Usage

### ESM Import
```ts
import { MpcControl } from 'mpc-hc-control';

// Create client instance
const mpc = new MpcControl('localhost', 13579);

// Example usage
await mpc.openFile('C:\\video.mkv');
await mpc.setVolume(75);
await mpc.play();
```

### With proxy configuration
```ts
import { MpcControl } from 'mpc-hc-control';

// Connect via reverse proxy / remote host
const mpc = new MpcControl('your-server-ip', 80,
  {
    pathPrefix: '/proxy',
    queryParams: {
      host: 'localhost',
      port: 13579
    }
  }
);
```

## Methods list

Basic methods list:
```ts
/**
 * @filePath - path to video file
 */
openFile(filePath: string): Promise<any>;
```

```ts
isPlaying(): Promise<boolean>
```

```ts
isPaused(): Promise<boolean>
```

```ts
isStopped(): Promise<boolean>
```

```ts
isMuted(): Promise<boolean>
```

```ts
getVolume(): Promise<number>
```

```ts
getPosition(): Promise<IPositionInfo>

interface IPositionInfo {
    duration: number;
    position: number;
}
```

```ts
play(): Promise<void>
```

```ts
pause(): Promise<void>
```

```ts
togglePlay(): Promise<void>
```

```ts
stop(): Promise<boolean>
```

```ts
toggleFullscreen(): Promise<void>
```

```ts
/**
 * @position - new position in ms
 */
seek(position: number): Promise<void>
```

```ts
/**
 * @delta - delta from current position in ms
 */
async jump(delta: number): Promise<void>
```

```ts
skipBack(): Promise<void>
```

```ts
skipForward(): Promise<void>
```

```ts
/**
 * @volume - new volume in percents
 */
setVolume(volume: number): Promise<void>
```

```ts
toggleMute(): Promise<void>
```

```ts
nextAudioTrack(): Promise<void>
```

```ts
prevAudioTrack(): Promise<void>
```

```ts
nextSubtitles(): Promise<void>
```

```ts
prevSubtitles(): Promise<void>
```

```ts
getVariables(): Promise<IPlayerVariables>

interface IPlayerVariables {
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
```

Also you can use:

```ts
/**
 * @commandId - any mpc-hc supported command from commands/mpcCommands.ts
 * @data - additional data provided in to api call
 */
execute(commandId: MpcCommands, data?: Dictionary<any>): Promise<any>
```  
 
 


 

