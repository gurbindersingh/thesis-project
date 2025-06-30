import { type TimerEventHook, type TimerMessage } from "./interfaces/index.ts";

/**
 * This class abstracts the creation of the web worker with the timer
 * functionality and the message passing between it and the main thread.
 */
export class TimerWorker {
  private readonly workerId: string;
  private readonly webWorker: Worker;

  /**
   * Create a new worker that executes the timer in background thread.
   *
   * @param timerResolution The number of milliseconds after which each tick event will be fired.
   */
  constructor(timerResolution: number) {
    if (timerResolution < 1) {
      throw new Error("Timer resolution must be at least 1 ms.");
    }

    this.workerId = crypto.randomUUID();
    // Using `new URL()` is the syntax as specified in the Vite documentation
    this.webWorker = new Worker(new URL("./worker", import.meta.url), {
      type: "module",
    });
    this.createTimer(timerResolution);
  }

  /**
   * Setup event listeners for the timer events.
   *
   * Each callback will be executed in the same order you specify them in the array.
   *
   * @param eventHooks The callbacks to execute on the specified events.
   * @returns `this`
   */
  setupEventListeners(eventHooks: TimerEventHook[]) {
    console.log(`[${this.workerId}] Setting up message Handlers.`);

    // Sets up the event listener for the web worker. When ever the web worker
    // calls `postMessage` this function will be executed.
    this.webWorker.onmessage = (message: MessageEvent<TimerMessage>) => {
      if (message.data.event === "error") {
        console.error("Error in web worker:", message.data.errorDetails);
        return;
      }
      // Run the event hooks matching the type of event emitted by the timer.
      eventHooks
        .filter((hook) => hook.onEvent === message.data.event)
        .forEach((hook) => {
          hook.execute();
        });
    };
    return this;
  }

  private notifyWebWorker(message: TimerMessage) {
    this.webWorker.postMessage(message);
  }

  /**
   * Will send a message to the web worker to create the timer.
   *
   * @param timerResolution The number of milliseconds after which to fire the `tick` events.
   */
  private createTimer(timerResolution: number) {
    this.notifyWebWorker({
      event: "create",
      workerId: this.workerId,
      timerResolution: timerResolution,
    });
  }

  /**
   * Will send a message to the web worker to start the timer.
   *
   * @param milliseconds The number of milliseconds the timer should run for.
   */
  public startTimer(milliseconds: number) {
    this.notifyWebWorker({
      event: "start",
      milliseconds: milliseconds,
      workerId: this.workerId,
    });
  }

  /**
   * Sends a message to the web worker to stop the timer.
   */
  public stopTimer() {
    this.notifyWebWorker({ event: "stop", workerId: this.workerId });
  }

  /**
   * Terminate the worker thread.
   */
  public terminate() {
    this.webWorker.terminate();
  }
}
