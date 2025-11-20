import { AudioNodeWrapper } from '../central/AudioNodeWrapper';

export class Oscillator extends AudioNodeWrapper {
    private osc: OscillatorNode;

    constructor(type: OscillatorType = 'sine', frequency: number = 440) {
        super();
        this.osc = this.context.createOscillator();
        this.osc.type = type;
        this.osc.frequency.value = frequency;
        this.osc.connect(this.output);
    }

    play(time: number = 0) {
        this.osc.start(this.context.currentTime + time);
    }

    stop(time: number = 0) {
        this.osc.stop(this.context.currentTime + time);
    }

    setFrequency(freq: number) {
        this.osc.frequency.setValueAtTime(freq, this.context.currentTime);
    }

    setType(type: OscillatorType) {
        this.osc.type = type;
    }
}
