//var db = require("./models");
module.exports = function(app, axios, cheerio, db) {
  app.post("/scraped", function(req, res) {
    axios
      .get("https://www.newsweek.com/newsfeed")
      .then(function(response) {
        var $ = cheerio.load(response.data);
        var result = {};
        $("article").each(function(i, element) {
          console.log(i);
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
          console.log(result);
          //         // db.Article.create(result)
          //         //   .then(function(dbArticle) {
          //         //     console.log(dbArticle);
          //         //   })
          //         //   .catch(function(err) {
          //         //     console.log(err);
          //         //   });
          //       });

          //});
        });

        res.send("scraped");
      })
      .catch(function(err) {
        if (err) {
          console.log(err);
        }
      });
  });

  app.get("/", function(req, res) {
    res.render("noArticles");
  });
};
