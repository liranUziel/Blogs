const liveserver = require("./LiveServer");
const app = liveserver();

app.get("/", (req, res) => {
    res.end("Hello, World!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
