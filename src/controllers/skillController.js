const SkillPost = require('../models/skillPost');

// Create a new skill post
exports.createSkillPost = async (req, res) => {
    try {
        const { title, description, contactInfo, category, location } = req.body;
        const newSkillPost = new SkillPost({ title, description, contactInfo, category, location });
        const savedSkillPost = await newSkillPost.save();
        res.status(201).json(savedSkillPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all skill posts
exports.getSkillPosts = async (req, res) => {
    try {
        const skillPosts = await SkillPost.find();
        res.status(200).json(skillPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single skill post
exports.getSkillPostById = async (req, res) => {
    try {
        const skillPost = await SkillPost.findById(req.params.id);
        if (!skillPost) return res.status(404).json({ message: 'Skill post not found' });
        res.status(200).json(skillPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a skill post
exports.deleteSkillPost = async (req, res) => {
    try {
        const deletedSkillPost = await SkillPost.findByIdAndDelete(req.params.id);
        if (!deletedSkillPost) return res.status(404).json({ message: 'Skill post not found' });
        res.status(200).json({ message: 'Skill post deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
