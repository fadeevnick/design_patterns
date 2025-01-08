import { EventEmitter } from 'events';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ProcessPool } from './processPool.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'workers', 'subsetSumProcessWorker.js');

const processPool = new ProcessPool(workerFile, 2);

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super()
    this.sum = sum;
    this.set = set;
  }

  async start() {
    const worker = await processPool.acquire()
    worker.send({ sum: this.sum, set: this.set })

    function onMessage(msg) {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        processPool.release(worker);
      }

      this.emit(msg.event, msg.data)
    }

    worker.on('message', onMessage)
  }
}
