const express = require('express');
const { createSkillPost, getSkillPosts, getSkillPostById, deleteSkillPost } = require('../controllers/skillController');

const router = express.Router();

router.post('/skills', createSkillPost);
router.get('/skills', getSkillPosts);
router.get('/skills/:id', getSkillPostById);
router.delete('/skills/:id', deleteSkillPost);

module.exports = router;
