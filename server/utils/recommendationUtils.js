// ===== Vector Math Utilities =====
function dot(a, b) {
  return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}
function magnitude(a) {
  return Math.sqrt(dot(a, a));
}
function cosineSim(a, b) {
  return dot(a, b) / (magnitude(a) * magnitude(b) || 1);
}

// ===== Category Encoding =====
const categoryList = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

function categoryVector(cat) {
  return categoryList.map((c) => (c === cat ? 1 : 0));
}

// ===== Core Recommendation =====
function rankArticlesBySimilarity(
  userProfile,
  articles,
  selectedCategory = "general",
  topN = 10
) {
  const userVec = categoryList.map((c) => userProfile[c] || 0);

  const scored = articles.map((a) => {
    const nVec = categoryVector(selectedCategory);
    return { ...a, score: cosineSim(userVec, nVec) };
  });

  return scored.sort((x, y) => y.score - x.score).slice(0, topN);
}

module.exports = {
  rankArticlesBySimilarity,
  categoryList,
};
