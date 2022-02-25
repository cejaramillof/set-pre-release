const { Octokit } = require('@octokit/core')

/**
 * @class Api
 */
module.exports = class Api {
  /**
   * Generate API to get Data
   *
   * @param {any} auth - Auth method
   * @param {string} repo - Repository in format username/repo-name
   * @returns {Promise<{data: object}>} - Fetch response
   */
  constructor(auth, repo) {
    this.octokit = new Octokit({ auth })
    this._repo = repo
    this._base = 'repos'
  }

  /**
   * Get release by tag
   *
   * @param {string} tag - tag
   * @returns {Promise<{data: { releaseId }}>} - Fetch response
   */
  async getReleaseByTag(tag) {
    const {
      data: { id: releaseId }
    } = await this.octokit.request('GET /:base/:repo/releases/tags/:tag', {
      base: this._base,
      repo: this._repo,
      tag: tag
    })

    return { releaseId }
  }

  /**
   * Update release by ID
   *
   * @param {string} release_id - id of release
   * @returns {Promise<{data: object}>} - Fetch response
   */
  async updateRelease(release_id) {
    return await this.octokit.request('PATCH /:base/:repo/releases/:release_id', {
      base: this._base,
      repo: this._repo,
      release_id: release_id,
      prerelease: true
    })
  }
}
