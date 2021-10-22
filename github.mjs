import { Octokit } from 'octokit';

export default class GitHubQuery {
  constructor({
    owner, repo, token, isOwnerUser, perPage,
  }) {
    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
    this.isOwnerUser = isOwnerUser;
    this.perPage = perPage;
  }

  async getData() {
    const { owner, repo, perPage } = this;
    return this.octokit.paginate(this.octokit.rest.issues.listMilestones, {
      owner,
      repo,
      perPage,
    });
  }

  async getProjects() {
    const { owner, repo, perPage } = this;
    return this.octokit.paginate(this.octokit.rest.projects.listForRepo, {
      owner,
      repo,
      perPage,
    });
  }

  async getProjectColumns(projectId) {
    const { perPage } = this;
    return this.octokit.paginate(this.octokit.rest.projects.listColumns, {
      per_page: perPage,
      project_id: projectId,
    });
  }

  async getColumnCards(columnId) {
    const { perPage } = this;
    return this.octokit.paginate(this.octokit.rest.projects.listCards, {
      per_page: perPage,
      column_id: columnId,
    });
  }

  async getCard(cardId) {
    const { perPage } = this;
    return this.octokit.paginate(this.octokit.rest.projects.getCard, {
      card_id: cardId,
      per_page: perPage,
    });
  }

  async getIssue(issueId) {
    const { owner, repo, perPage } = this;
    return this.octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueId,
      per_page: perPage,
    });
  }

  /**
   * Async function getting all issues from a GitHub repository.
   * @param {string} owner  A GitHub owner or organisation.
   * @param {string} repo   A repository.
   * @returns All the repository issues if succesful.
   */
  async getRepoIssues() {
    const { owner, repo } = this;
    return this.octokit.paginate(this.octokit.rest.issues.listForRepo, {
      owner,
      repo,
      state: 'all',
    });
  }
}
