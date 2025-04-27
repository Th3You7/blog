const db = require("../../db.json");

exports.getAllArticles = (req, res) => {
  res.json(db.articles);
};

exports.getArticle = (req, res) => {
  const article = db.articles.find((a) => a.id === parseInt(req.params.id));
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
};

exports.createArticle = (req, res) => {
  const newArticle = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    authorId: req.user.id,
    date: new Date().toISOString().split("T")[0],
  };

  db.articles.push(newArticle);
  require("fs").writeFileSync("db.json", JSON.stringify(db, null, 2));

  res.status(201).json(newArticle);
};

exports.updateArticle = (req, res) => {
  const articleId = parseInt(req.params.id);
  const articleIndex = db.articles.findIndex((a) => a.id === articleId);

  if (articleIndex === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  if (db.articles[articleIndex].authorId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only edit your own articles" });
  }

  const updatedArticle = {
    ...db.articles[articleIndex],
    title: req.body.title || db.articles[articleIndex].title,
    content: req.body.content || db.articles[articleIndex].content,
  };

  db.articles[articleIndex] = updatedArticle;
  require("fs").writeFileSync("db.json", JSON.stringify(db, null, 2));

  res.json(updatedArticle);
};

exports.deleteArticle = (req, res) => {
  const articleId = parseInt(req.params.id);
  const articleIndex = db.articles.findIndex((a) => a.id === articleId);

  if (articleIndex === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  if (db.articles[articleIndex].authorId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only delete your own articles" });
  }

  db.articles.splice(articleIndex, 1);
  require("fs").writeFileSync("db.json", JSON.stringify(db, null, 2));

  res.status(204).send();
};
