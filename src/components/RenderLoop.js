export default class RenderLoop {
    constructor(callback, fps) {
        this.callback = callback;
        this.fps = 0; // Current fps
        this.msLastFrame = 0;
        this.isActive = false;

        if (fps > 0) { // Limit fps
            this.msFpsLimit = 1000 / fps; // Milliseconds per frame in one second

            this.run = () => {
                const msCurrent = performance.now();
                const msDelta = (msCurrent - this.msLastFrame);
                const deltaTime = msDelta / 1000;

                if (msDelta >= this.msFpsLimit) {
                    this.fps = Math.floor(1 / deltaTime);
                    this.msLastFrame = msCurrent;
                    this.callback(deltaTime);
                }

                if (this.isActive) {
                    window.requestAnimationFrame(this.run);
                }
            }
        } else {
            this.run = () => {
                const msCurrent = performance.now();
                const msDelta = (msCurrent - this.msLastFrame);
                const deltaTime = msDelta / 1000;

                this.fps = Math.floor(1 / deltaTime);
                this.msLastFrame = msCurrent;

                this.callback(deltaTime);

                if (this.isActive) {
                    window.requestAnimationFrame(this.run);
                }
            }
        }
    }

    start() {
        this.isActive = true;
        this.msLastFrame = performance.now();
        window.requestAnimationFrame(this.run);
        return this;
    }

    stop() {
        this.isActive = false;
    }
}
