import { AudioNodeWrapper } from '../central/AudioNodeWrapper';

export class EffectChain extends AudioNodeWrapper {
    private chain: AudioNodeWrapper[] = [];

    constructor() {
        super();
    }

    add(effect: AudioNodeWrapper) {
        this.chain.push(effect);
        this.rebuildChain();
    }

    remove(effect: AudioNodeWrapper) {
        this.chain = this.chain.filter(e => e !== effect);
        this.rebuildChain();
    }

    private rebuildChain() {
        // Disconnect all
        this.chain.forEach(e => e.getOutput().disconnect());

        if (this.chain.length === 0) return;

        // Chain nodes
        for (let i = 0; i < this.chain.length - 1; i++) {
            this.chain[i].getOutput().connect(this.chain[i + 1].getOutput());
        }

        // Connect last node to EffectChain output
        this.chain[this.chain.length - 1].getOutput().connect(this.getOutput());
    }
}