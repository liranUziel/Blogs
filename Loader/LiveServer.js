const http = require("http");

class LiveServer {
    #server;
    constructor() {
        this.#server = http.createServer(this.#handleRequest);
        this.#server.routes = {};
        this.#server.middleware = {};
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
        if (route && route.method === req.method) {
            res.statusCode = 200;
            /**
             res.setHeader("Content-Type", "text/html");
            // Read the HTML file
            const fs = require('fs');
            const path = require('path');
            const htmlFilePath = path.join(__dirname, 'path/to/your/html/file.html');
            const html = fs.readFileSync(htmlFilePath, 'utf8');
             */
            res.setHeader("Content-Type", "text/plain");
            res.send = res.end;
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
