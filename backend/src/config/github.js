const axios = require('axios');

class GitHubAPI {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://api.github.com';
    this.headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AwesomeDevOpsDashboard'
    };
  }

  async getRepos(owner) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${owner}/repos?per_page=100`, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repos: ${error.message}`);
    }
  }

  async getRepoStats(owner, repo) {
    try {
      const [statsResponse, prsResponse, issuesResponse, deploymentsResponse] = await Promise.all([
        axios.get(`${this.baseURL}/repos/${owner}/${repo}`, { headers: this.headers }),
        axios.get(`${this.baseURL}/repos/${owner}/${repo}/pulls?state=open`, { headers: this.headers }),
        axios.get(`${this.baseURL}/repos/${owner}/${repo}/issues?state=open&per_page=100`, { headers: this.headers }),
        axios.get(`${this.baseURL}/repos/${owner}/${repo}/deployments`, { headers: this.headers })
      ]);

      return {
        repo: statsResponse.data,
        openPrs: prsResponse.data.length,
        openIssues: issuesResponse.data.length,
        deployments: deploymentsResponse.data.slice(0, 5),
        healthScore: this.calculateHealthScore(statsResponse.data, prsResponse.data.length, issuesResponse.data.length)
      };
    } catch (error) {
      throw new Error(`Failed to fetch repo stats: ${error.message}`);
    }
  }

  async getActivity(owner, repo, days = 7) {
    try {
      const [commitsResponse, prActivity, issueActivity] = await Promise.all([
        axios.get(`${this.baseURL}/repos/${owner}/${repo}/commits?per_page=100`, { headers: this.headers }),
        axios.get(`${this.baseURL}/repos/${owner}/${repo}/pulls?state=all&per_page=100`, { headers: this.headers }),
        axios.get(`${this.baseURL}/repos/${owner}/${repo}/issues?state=all&per_page=100`, { headers: this.headers })
      ]);

      return {
        commits: this.groupByDate(commitsResponse.data),
        prs: this.groupByDate(prActivity.data),
        issues: this.groupByDate(issueActivity.data)
      };
    } catch (error) {
      throw new Error(`Failed to fetch activity: ${error.message}`);
    }
  }

  calculateHealthScore(repo, openPrs, openIssues) {
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const watchers = repo.subscribers_count || 0;
    const language = repo.language ? 1 : 0;
    const openIssues = openIssues || 0;

    let score = 0;
    score += stars * 0.3;
    score += forks * 0.2;
    score += watchers * 0.15;
    score += language * 0.1;
    score -= openIssues * 0.1;

    return Math.max(0, Math.min(100, score)).toFixed(1);
  }

  groupByDate(items) {
    const grouped = {};
    items.forEach(item => {
      const date = new Date(item.commit?.committer?.date || item.created_at).toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + 1;
    });
    return grouped;
  }
}

module.exports = GitHubAPI;
