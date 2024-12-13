const Profile = require("../models/profile");

// Get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a profile by user ID
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate("user", "name email");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create or update profile
const upsertProfile = async (req, res) => {
  const { bio, skills, location, experience } = req.body;

  try {
    let profile = await Profile.findOne({ user: req.user });
    if (profile) {
      // Update profile
      profile.bio = bio;
      profile.skills = skills;
      profile.location = location;
      profile.experience = experience;
      await profile.save();
    } else {
      // Create profile
      profile = await Profile.create({
        user: req.user,
        bio,
        skills,
        location,
        experience,
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllProfiles, getProfileById, upsertProfile };
