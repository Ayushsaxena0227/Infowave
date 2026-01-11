const { db } = require("../../server/firebase/firebaseAdmin");
const handleLike = async (req, res) => {
  try {
    const { uid, category } = req.body;
    if (!uid)
      return res.status(400).json({ success: false, message: "UID required" });

    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();
    if (!snap.exists)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const userData = snap.data();
    const interests = userData.interests || [];

    // avoid duplicates, trim whitespace
    const cleanCat = (category || "general").trim().toLowerCase();
    if (!interests.includes(cleanCat)) interests.push(cleanCat);

    await userRef.update({ interests });
    return res.status(200).json({ success: true, interests });
  } catch (err) {
    console.error("Error saving like:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { handleLike };
