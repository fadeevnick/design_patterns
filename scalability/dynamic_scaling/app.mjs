import { createServer } from 'http';
import Consul from 'consul';
// import portfinder from 'portfinder';
import { nanoid } from 'nanoid';

const serviceType = process.env.SERVICE_TYPE
const { pid } = process;

async function main() {
  const consulClient = new Consul({
    host: 'consul-server',
    port: 8500
  });

  // const port = await portfinder.getPortPromise()
  const port = process.env.PORT || 8000
  const address = process.env.ADDRESS || 'localhost'
  const serviceId = nanoid()

  function registerService() {
    consulClient.agent.service.register({
      id: serviceId,
      name: serviceType,
      address,
      port,
      tags: [serviceType]
    }, () => {
      console.log(`${serviceType} registered successfully`);
    })
  }

  function unregisterService(err) {
    err && console.log(err)
    console.log(`deregistering ${serviceId}`)
    consulClient.agent.service.deregister(serviceId, () => {
      process.exit(err ? 1 : 0)
    })
  }

  process.on('exit', unregisterService)
  process.on('uncaughtException', unregisterService)
  process.on('SIGINT', unregisterService)
  process.on('SIGTERM', unregisterService)

  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) { i-- }
    console.log(`Handling request from ${pid}`)
    res.end(`${serviceType} response from ${pid}\n`)
  })

  server.listen(port, address, () => {
    registerService()
    console.log(`Started ${serviceType} at ${pid} on port ${port}`)
  })
}

main().catch((err) => {
  console.log('MY CATCH')
  console.error(err)
  process.exit(1)
}) 