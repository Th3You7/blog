import jsonServer from "json-server";
import routes from "./routes";
const server = jsonServer.create();
const router = jsonServer.router("./db.json");

export default router;

// Import route files
const routes = require("./routes");

//server.use(middlewares);
server.use(jsonServer.bodyParser);

// Apply authentication middleware
//server.use(authMiddleware.verifyToken);

// Register routes
server.use("/articles", routes.articles(server));

// Default JSON Server router for other routes
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
