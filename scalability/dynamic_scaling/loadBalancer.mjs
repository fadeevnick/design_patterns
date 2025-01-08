import { createServer } from 'http';
import Consul from 'consul';
import httpProxy from 'http-proxy';

const routing = [
  {
    path: '/api',
    service: 'api-service',
    index: 0
  },
  {
    path: '/',
    service: 'web-service',
    index: 0
  }
]

const consulClient = new Consul({
  host: 'consul-server',
  port: 8500
});

const proxy = httpProxy.createProxyServer()

const server = createServer(async (req, res) => {
  console.log('req.url', req.url)
  const route = routing.find((route) => req.url.startsWith(route.path))

  try {
    const services = await consulClient.agent.service.list();
    const servers = Object.values(services).filter(service => service.Tags.includes(route.service))

    console.log('servers', servers)

    if (!servers.length) {
      return respondError(res)
    }

    route.index = (route.index + 1) % servers.length;

    const server = servers[route.index]
    const target = `http://${server.Address}:${server.Port}`

    proxy.web(req, res, { target })

  } catch (e) {
    console.log('e', e)
    respondError(res)
  }

  console.log('3')
})

server.listen(8080, () => {
  console.log('Load balancer started on port 8080')
})

function respondError(res) {
  res.writeHead(502)
  return res.end('Bad gateway')
}
