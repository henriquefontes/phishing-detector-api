// JSON Server module
const fs = require("fs");
const path = require("path");

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const getBackupDB = (req, res, next) => {
  const route = req.path.split("/")[1];

  if (route === "backup") {
    const filePath = path.join("db.json");
    const data = fs.readFileSync(filePath, "utf-8");
    
    res.send(data);
  } else {
    next();
  }
};

// Make sure to use the default middleware
const middlewares = [....jsonServer.defaults(), getBackupDB];

server.use(middlewares);
// Add this before server.use(router)
server.use(
  // Add custom route here if needed
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);
// Listen to port
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
