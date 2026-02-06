const express = require('express');
const router = express.Router();
const GitHubAPI = require('../config/github');
const { authenticateToken } = require('../middleware/auth');

const github = new GitHubAPI(process.env.GITHUB_TOKEN || 'demo_token');

// Get all repositories for a user
router.get('/user/:username', authenticateToken, async (req, res) => {
  try {
    const repos = await github.getRepos(req.params.username);
    res.json({ repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get detailed stats for a specific repository
router.get('/stats/:username/:repo', authenticateToken, async (req, res) => {
  try {
    const stats = await github.getRepoStats(req.params.username, req.params.repo);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activity data for a repository
router.get('/activity/:username/:repo', authenticateToken, async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const activity = await github.getActivity(req.params.username, req.params.repo, parseInt(days));
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
