# article-scraper

## Overview

A web application that lets users view and leave comments on the latest news. Mongoose and Cheerio are used to scrape news from `www.newsweek.com`.

## How to use app

- Whenever a user visits the web-site, the app scrapes stories from a news outlet and display them for the user. Each scraped article is saved to the database. Each article displays the following information:

  - Headline - the title of the article

  - Summary - a short summary of the article

  - URL - the url to the original article

  - Image

  - Category

- Users are also able to leave comments on the articles displayed and revisit them later. The comments are saved to the database as well and associated with their articles. Users also are able to delete comments left on articles. All stored comments are visible to every user.

## Tech:

- [node.js]
- [express.js]
- [mongoose]
- [MongoDB]
- [express-handlebars.js]
- [cheerio]
- [axios]

I think the biggest technical challenge was to use populate() method, which lets you reference documents in other collections.
