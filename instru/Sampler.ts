import { AudioNodeWrapper } from '../central/AudioNodeWrapper';
import { AudioContextManager } from '../central/AudioContextMgr';

export class Sampler extends AudioNodeWrapper {
    private buffer: AudioBuffer | null = null;

    constructor(buffer?: AudioBuffer) {
        super();
        if (buffer) this.buffer = buffer;
    }

    async load(url: string) {
        const context = AudioContextManager.getContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.buffer = await context.decodeAudioData(arrayBuffer);
    }

    play(time: number = 0, loop: boolean = false) {
        if (!this.buffer) throw new Error('No audio buffer loaded.');
        const source = AudioContextManager.getContext().createBufferSource();
        source.buffer = this.buffer;
        source.loop = loop;
        source.connect(this.output);
        source.start(AudioContextManager.getContext().currentTime + time);
    }
}
