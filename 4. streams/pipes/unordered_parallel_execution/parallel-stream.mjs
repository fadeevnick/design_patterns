import { Transform } from "stream";

export class ParallelStream extends Transform {
  constructor(userTransform, opt) {
    super({ objectMode: true, ...opt });

    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCb = null;
  }

  _transform(chunk, encoding, cb) {
    this.running++;
    this.userTransform(chunk, encoding, this.push.bind(this), () => {
      this.running--;

      if (this.terminateCb && this.running === 0) {
        this.terminateCb();
      }
    });
    cb();
  }

  _flush(cb) {
    if (this.running > 0) {
      this.terminateCb = cb;
    } else {
      cb();
    }
  }
}
