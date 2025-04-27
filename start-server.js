const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route handling can be added here
server.use((req, res, next) => {
  if (req.method === "POST") {
    // Add createdAt and updatedAt fields for POST requests
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
  }

  if (req.method === "PUT") {
    // Update updatedAt field for PUT requests
    req.body.updatedAt = new Date().toISOString();
  }

  next();
});

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/articles`);
});
