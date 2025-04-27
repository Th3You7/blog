const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("./articles.controller");

export default function articlesRoutes(server) {
  server.get("/articles", getAllArticles);
  server.get("/articles/:id", getArticle);
  server.post("/articles", createArticle);
  server.put("/articles/:id", updateArticle);
  server.delete("/articles/:id", deleteArticle);
}
