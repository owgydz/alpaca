import { AudioContextManager } from './AudioContextMgr';

export abstract class AudioNodeWrapper {
    protected context: AudioContext;
    protected output: AudioNode;

    constructor() {
        this.context = AudioContextManager.getContext();
        this.output = this.context.createGain(); // Default output node
    }

    /** Public getter for the output AudioNode */
    public getOutput(): AudioNode {
        return this.output;
    }

    connect(destination: AudioNode) {
        this.output.connect(destination);
    }

    disconnect() {
        this.output.disconnect();
    }
}
