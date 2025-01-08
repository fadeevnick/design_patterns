export class ParallelStream extends Transform {
  constructor(userTransform, opt) {
    super({ objectMode: true, ...opt });
    this.running = 0;
    this.noMoreIncomingData = false;
    this.cb = null;
  }

  _transform(chunk, encoding, cb) {
    this.running++;
    this.userTransform(chunk, encoding, this.push.bind(this), () => {
      this.running--;

      if (this.noMoreIncomingData && this.running === 0) {
        this.cb();
      }
    });
    cb();
  }

  _flush(cb) {
    this.noMoreIncomingData = true;
    this.cb = cb;
  }
}
