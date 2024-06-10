const http = require("http");

class LiveServer {
    #server;
    constructor() {
        this.#server = http.createServer(this.#handleRequest);
        this.#server.routes = {};
        this.#server.middleware = [];
    }
    use(middleware) {
        this.#server.middleware.push(middleware);
    }
    get(path, callback) {
        this.#server.routes[path] = { method: "GET", callback };
    }
    listen(port, callback) {
        this.#server.listen(port, callback);
    }
    #handleRequest(req, res) {
        const route = this.routes[req.url];
        const middlewareChain = this.#server.middleware.slice();
        if (route && route.method === req.method) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.send = res.end;
            // create custom req and res
            route.callback(req, res);
        } else {
            res.statusCode = 404;
            res.end("Not found");
        }
    }
}
const liveserver = () => {
    return new LiveServer();
};

module.exports = liveserver;
