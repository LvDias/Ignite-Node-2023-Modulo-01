import http from "http"
import { handleRoute } from "./middleware/handle-route.js"
import { routes } from "./middleware/route.js"

const server = http.createServer(async (req, res) => {

    await handleRoute(req, res)

    let { method, url } = req

    const route = routes.find(route => route.method === method && route.path.test(url))

    if(route) {

        const routeParams = req.url.match(route.path)

        const { ...params } = routeParams.groups

        req.params = params

        return route.handler(req, res)

    }   

    res.writeHead(404).end()
})

server.listen(3333)