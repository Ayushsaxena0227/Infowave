import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 }); // 10 min cache

export async function fetchNewsByCategory(category = "general") {
  const cacheKey = `news_${category}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

  const { data } = await axios.get(url);
  const articles = (data.articles || []).map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    image: a.urlToImage,
    source: a.source.name,
    publishedAt: a.publishedAt,
  }));

  cache.set(cacheKey, articles);
  return articles;
}
