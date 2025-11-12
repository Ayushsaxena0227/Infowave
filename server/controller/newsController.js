const axios = require("axios");

const getNews = async (req, res) => {
  try {
    const category = req.query.category || "general";
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

    const { data } = await axios.get(url);

    const articles = (data.articles || []).map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      source: a.source.name,
      publishedAt: a.publishedAt,
    }));

    return res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    });
  }
};

module.exports = { getNews };
