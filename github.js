const axios = require("axios");

const API_URL = "https://api.github.com";

class GitHubQuery {
  constructor({ owner, repo, token, isOwnerUser, per_page }) {
    this.owner = owner;
    this.repo = repo;
    this.token = token;
    this.isOwnerUser = isOwnerUser;
    this.per_page = 60
  }

  get = async (url, { prependAPIURL = true } = {}) => {
    return (
      await axios.get(prependAPIURL ? `${API_URL}/${url}` : url, {
        headers: {
          Accept: "application/vnd.github.inertia-preview+json",
          Authorization: `token ${this.token}`,
        },
      })
    ).data;
  };

  getProjects = async () => {
    return await this.get(
      this.repo.length
        ? `repos/${this.owner}/${this.repo}/projects`
        : `${this.isOwnerUser ? "users" : "orgs"}/${this.owner}/projects`
    );
  };

  getProjectColumns = async (projectId) => {
    return await this.get(`projects/${projectId}/columns`);
  };

  getColumnCards = async (columnId) => {
    return await this.get(`projects/columns/${columnId}/cards?per_page=${this.per_page}`);
  };
}

module.exports = { GitHubQuery };
