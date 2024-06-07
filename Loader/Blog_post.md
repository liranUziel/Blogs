# Creating node express server from screach

## node `http` moudle

The http moudle from node, let use create a simple http server. using this server we will get req from the client and use res to return the content.

```javascript
const http = require("http");
http.createServer();
```

To create a simple http sever we use `node:http` and call `createServer()`\
The function tample is like this `http.createServer([options][, requestListener])`\
There a are many option that we can use, how ever for our simple server all we need is just the `requestListener` that get req and res as arguments.

so it will look like this.

```javascript
const server = http.createServer((req, res) => {});
```

Then in the body of the funcitn will get callded every time the client send a req to the server.

## creating LiveServer class

So let convert our server code to static class called **LiveServer**.

```javascript
const http = require("http");
class LiveServer {
    #server;
    constructor() {
        this.#server = http.createServer((req, res) => {
            res.end("hello, world");
        });
    }
}
```

next we will create a function to handle all incoming request and choose what to do with them.

```javascript
class LiveServer {
    #server;
    constructor() {
        this.#server = http.createServer(this.#handleRequest);
    }
    #handleRequest(req, res) {
        res.end("hello, world");
    }
}
```

now we need to add Listen

## Adding `listen` and `Get`

**Adding Get**

How we can use get to make sure server call the right call back of the routes we set?
Well, let's think of this, this way the handleRequest is called every time all he need is the look at `req.url` and base on that call the right callback.
so we need to make a map of `path` or `routes` to `callback` functions.

and that is what we are going to do.

```javascript
class LiveServer {
    #server;
    constructor() {
        this.#server = http.createServer(this.#handleRequest);
        this.#server.routes = {};
    }
    get(path, callback) {
        this.#server.routes[path] = { method: GET, callback };
    }
    #handleRequest(req, res) {
        // This here is the server so to get the path save to him, all need is this.routes and not this.#server.routes
        const route = this.routes[req.url];
        if (route) {
            //this route is set with LiveServer.get so we can call it's callback.
        }
    }
}
```

not we can just call the route callback function, note that we need to set the header, later we can make this header part of get fucntion, and set custom content.

here in this code i make res.send = res.end
making calling res.send that was undefined to be the same as res.end.

```javascript
#handleRequest(req, res) {
    // This here is the server so to get the path save to him, all need is this.routes and not this.#server.routes
    const route = this.routes[req.url];
    if (route && route.method === req.method) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.send = res.end;
        route.callback(req, res);
    } else {
        res.statusCode = 404;
        res.end("Not found");
    }
}
```

**Adding listen**

This part is very easy as it's simmler to the http listen.

```javascript
listen(port, callback) {
    this.#server.listen(port, callback);
}
```

## Exporting the server object.

In express you call `express()` and set the return value to `app` and use app to call `.get` `.listen` and more.

we can do this by simple makeing the same fucntion, and create new object of LiveServer and return it.

```javascript
const liveserver = () => {
    return new LiveServer();
};
module.exports = liveserver;
```

Now all you need to do is call `liveserver()`

Here is a simple main.js code.

```javascript
const liveserver = require("./LiveServer");
const app = liveserver();
const PORT = 3000;
app.get("/", (req, res) => {
    res.end("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```
