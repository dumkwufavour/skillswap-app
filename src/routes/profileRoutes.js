const express = require("express");
const {
  getAllProfiles,
  getProfileById,
  upsertProfile,
} = require("../controllers/profileController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:id", protect, getProfileById);
router.post("/", protect, upsertProfile);

module.exports = router;
