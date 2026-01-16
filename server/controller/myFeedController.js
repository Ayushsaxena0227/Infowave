const axios = require("axios");
const { db } = require("../firebase/firebaseAdmin");
const { rankArticlesBySimilarity } = require("../utils/recommendationUtils");

const getMyFeed = async (req, res) => {
  try {
    const userId = req.query.uid;
    if (!userId)
      return res.status(400).json({ success: false, message: "UID missing" });

    // 🔹 Fetch user profile
    const docSnap = await db.collection("users").doc(userId).get();
    if (!docSnap.exists)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const { age = 25, genre = "general", interests = [] } = docSnap.data();

    // 🔹 if user has no interests, fall back to mix feed
    if (!interests.length)
      return res.redirect(`/api/news?uid=${userId}&category=mix`);

    // 🔹 build user profile vector
    const userProfile = {
      business: interests.includes("business") ? 1 : 0.2,
      entertainment: interests.includes("entertainment") ? 1 : 0.2,
      general: 0.8,
      health: interests.includes("health") ? 1 : 0.2,
      science: interests.includes("science") ? 1 : 0.2,
      sports: interests.includes("sports") ? 1 : 0.2,
      technology: interests.includes("technology") ? 1 : 0.3,
    };

    if (age < 25) {
      userProfile.technology += 0.3;
      userProfile.sports += 0.3;
    } else if (age > 40) {
      userProfile.business += 0.3;
      userProfile.health += 0.2;
    }

    // 🔹 Fetch articles for the user's interests only
    const requests = interests.map((cat) =>
      axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${cat.trim()}&apiKey=${
          process.env.NEWS_API_KEY
        }`
      )
    );
    const results = await Promise.all(requests);
    const allArticles = results.flatMap((r) => r.data.articles || []);

    const articles = allArticles.map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      source: a.source.name,
      publishedAt: a.publishedAt,
    }));

    const personalized = rankArticlesBySimilarity(
      userProfile,
      articles,
      "personal",
      40
    );

    return res.status(200).json({
      success: true,
      userId,
      usedInterests: interests,
      count: personalized.length,
      articles: personalized,
    });
  } catch (err) {
    console.error("Error creating myFeed:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to build personalized feed",
    });
  }
};

module.exports = { getMyFeed };
