import superagent from 'superagent';

const start = Date.now()
let count = 20;
let pending = count;
const interval = 200;
const query = process.argv[2] ? process.args[2] : 'product=book';

function sendRequest() {
  superagent.get(`http://localhost:8080?${query}`)
    .then(result => {
      console.log(result.status, result.body)
      if (!--pending) {
        console.log(`All completed in: ${Date.now() - start}ms`);
      }
    })

  if (--count) {
    setTimeout(sendRequest, interval);
  }
}

sendRequest()