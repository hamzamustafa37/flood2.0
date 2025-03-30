declare module "nprogress" {
  interface NProgressOptions {
    minimum?: number;
    easing?: string;
    speed?: number;
    showSpinner?: boolean;
    trickle?: boolean;
    trickleSpeed?: number;
    parent?: string;
  }

  interface NProgress {
    configure(options: NProgressOptions): void;
    start(): void;
    done(force?: boolean): void;
    set(n: number): void;
    inc(amount?: number): void;
    remove(): void;
    status: number | null;
  }

  const nprogress: NProgress;
  export default nprogress;
}
