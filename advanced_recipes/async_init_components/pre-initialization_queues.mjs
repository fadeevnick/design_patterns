import { EventEmitter } from 'events';

class DB extends EventEmitter {
  connected = false;
  commandsQueue = [];

  connect() {
    setTimeout(() => {
      this.connected = true;
      this.emit('connected');
      this.commandsQueue.forEach(c => c())
      this.commandsQueue = [];
    }, 500)
  }

  async query(queryString) {
    if (!this.connected) {

      return new Promise((res, rej) => {
        async function command() {
          await this.query(queryString)
          res()
        }

        this.commandsQueue.push(command.bind(this));
      })
    }

    console.log(`Query executed: ${queryString}`);
  }
}

const db = new DB();

db.connect()

db.query('select')

setTimeout(() => {
  db.query('update')
}, 600);