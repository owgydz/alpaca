import { AudioNodeWrapper } from '../central/AudioNodeWrapper';
import { AudioContextManager } from '../central/AudioContextMgr';

export class Gain extends AudioNodeWrapper {
    private gainNode: GainNode;

    constructor(initialGain: number = 1) {
        super();
        this.gainNode = AudioContextManager.getContext().createGain();
        this.gainNode.gain.value = initialGain;
        this.output.disconnect();
        this.output = this.gainNode; // replace default output with GainNode
    }

    set(value: number) {
        this.gainNode.gain.setValueAtTime(value, AudioContextManager.getContext().currentTime);
    }

    get(): number {
        return this.gainNode.gain.value;
    }
}
