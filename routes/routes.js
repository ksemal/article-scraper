module.exports = function(app, axios, cheerio, db, mongoose) {
  app.post("/scrape", function(req, res) {
    db.Article.deleteMany({ saved: false }, function(err) {
      if (err) return handleError(err);
    });
    axios
      .get("https://www.newsweek.com/newsfeed")
      .then(function(response) {
        var $ = cheerio.load(response.data);
        var result = {};
        $("article").each(function(i, element) {
          if (i <= 20) {
            result.title = $(this)
              .find(".inner")
              .find("h3")
              .children("a")
              .text()
              .trim();
            result.link =
              "https://www.newsweek.com" +
              $(this)
                .find(".inner")
                .find("h3")
                .children("a")
                .attr("href");
            result.summary = $(this)
              .find(".inner")
              .find(".summary")
              .text()
              .trim();
            result.category = $(this)
              .find(".inner")
              .find(".category")
              .text()
              .trim();
            result.image = $(this)
              .find(".image")
              .find("picture")
              .find("img")
              .attr("src");
          } else {
            return;
          }
          db.Article.create(result)
            .then(function(dbArticle) {})
            .catch(function(err) {
              console.log(err);
            });
        });
      })
      .catch(function(err) {
        if (err) {
          console.log(err);
        }
      });

    res.redirect("/");
  });

  app.get("/", function(req, res) {
    db.Article.find({})
      .then(function(response) {
        if (Object.keys(response).length === 0) {
          res.render("noArticles");
        } else {
          res.render("articles", { newArticles: response });
        }
      })
      .catch(function(err) {
        if (err) {
          console.log(err);
        }
      });
  });

  app.post("/article/:id", function(req, res) {
    db.Article.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $set: { saved: true } }
    )
      .then(function(response) {
        res.send(response);
      })
      .catch(function(err) {
        if (err) {
          console.log(err);
        }
      });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({ saved: true })
      .then(function(response) {
        res.render("saved", { newArticles: response });
      })
      .catch(function(err) {
        if (err) {
          console.log(err);
        }
      });
  });
};
