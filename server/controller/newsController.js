const axios = require("axios");
const { db } = require("../firebase/firebaseAdmin"); // adjust path to where you export admin+db
const { rankArticlesBySimilarity } = require("../utils/recommendationUtils");

const getNews = async (req, res) => {
  try {
    const userId = req.query.uid;
    let age = 25;
    let genre = "general";
    let interests = [];

    // 🧾 Fetch user profile from Firestore
    if (userId) {
      const docSnap = await db.collection("users").doc(userId).get();
      if (docSnap.exists) {
        const userData = docSnap.data();
        age = userData.age || 25;
        genre = userData.genre || "general";
        interests = userData.interests || [];
      }
    }

    // 🚀 Determine which category feed to build
    const category = req.query.category || genre || "general";

    // 🧠 Build user vector using age + genre + interests
    const userProfile = {
      business:
        genre === "business" || interests.includes("business") ? 1 : 0.2,
      entertainment:
        genre === "entertainment" || interests.includes("entertainment")
          ? 1
          : 0.2,
      general: 0.8,
      health: genre === "health" || interests.includes("health") ? 1 : 0.2,
      science: genre === "science" || interests.includes("science") ? 1 : 0.2,
      sports: genre === "sports" || interests.includes("sports") ? 1 : 0.2,
      technology:
        genre === "technology" || interests.includes("technology") ? 1 : 0.3,
    };

    // 🧒 Age bias
    if (age < 25) {
      userProfile.technology += 0.3;
      userProfile.sports += 0.3;
    } else if (age > 40) {
      userProfile.business += 0.3;
      userProfile.health += 0.2;
    }

    let articles = [];

    // 📰 If mix/all request → fetch multiple categories in parallel
    if (category === "mix" || category === "all") {
      const cats = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ];
      const requests = cats.map((c) =>
        axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${c}&apiKey=${process.env.NEWS_API_KEY}`
        )
      );
      const results = await Promise.all(requests);
      const allArticles = results.flatMap((r) => r.data.articles || []);

      articles = allArticles.map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.urlToImage,
        source: a.source.name,
        publishedAt: a.publishedAt,
      }));
    } else {
      // ✅ Single‑category request (normal mode)
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
      const { data } = await axios.get(url);
      articles = (data.articles || []).map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.urlToImage,
        source: a.source.name,
        publishedAt: a.publishedAt,
      }));
    }

    // 🎯 Rank & return (raise limit for mix feed)
    const limit = category === "mix" || category === "all" ? 40 : 20;
    const personalized = rankArticlesBySimilarity(
      userProfile,
      articles,
      category,
      limit
    );

    return res.status(200).json({
      success: true,
      userReference: { userId, age, genre, interests },
      count: personalized.length,
      articles: personalized,
    });
  } catch (error) {
    console.error("Error fetching personalized news:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch personalized news",
    });
  }
};

module.exports = { getNews };
