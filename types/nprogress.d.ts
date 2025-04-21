declare module "nprogress" {
  interface NProgressOptions {
    /** Minimum percentage used upon starting */
    minimum?: number;
    /** CSS easing to apply to animations */
    easing?: string;
    /** Animation speed in ms */
    speed?: number;
    /** Whether to show the spinner */
    showSpinner?: boolean;
    /** Turn on/off the trickle behavior */
    trickle?: boolean;
    /** Adjust how often to trickle/increment in ms */
    trickleSpeed?: number;
    /** Parent element selector */
    parent?: string;
  }

  interface NProgress {
    /** Configuration method */
    configure(options: NProgressOptions): void;
    /** Start the progress bar */
    start(): void;
    /** End the progress bar */
    done(force?: boolean): void;
    /** Set a specific progress percentage */
    set(n: number): void;
    /** Increment by a given amount */
    inc(amount?: number): void;
    /** Remove the progress element */
    remove(): void;
    /** Get the current status */
    status: number | null;
  }

  const nprogress: NProgress;
  export default nprogress;
}
