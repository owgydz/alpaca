// god help us all
// even the ai is confused
export class AudioContextManager {
    private static instance: AudioContext;

    static getContext(): AudioContext {
        if (!this.instance) {
            this.instance = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.instance;
    }

    static resumeContext(): Promise<void> {
        return this.getContext().state === 'suspended'
            ? this.getContext().resume()
            : Promise.resolve();
    }
}
