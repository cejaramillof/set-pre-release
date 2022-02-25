const Core = require('@actions/core')
const { context } = require('@actions/github')

const Api = require('./src/api')

/**
 * Set as pre release
 * This actions is for MercadoLibre
 *
 * @param {Api} api - Api instance
 * @param {string} tag - Current tag
 */
const boostrap = async (api, tag) => {

  try {

    const { releaseId } = await api.getReleaseByTag(tag)
    const response = await api.updateRelease(releaseId)

    console.error(response.status, response.data)

    if (response.status >= 400) {
      Core.setFailed(response.data)
    } else {
      Core.setOutput('status', response.status)
      Core.setOutput('data', response.data)
    }

  } catch (e) {
    Core.setFailed(e.message)
    console.error(e)
  }
}


try {
  const token = Core.getInput('token')

  const keywords = Core.getInput('keywords', { required: true }).split('\n').filter(key => key.trim().length > 0)

  const tag = context.ref.replace('refs/tags/', '')

  const preReleaseVersion = keywords.some((keyword) => {
    if (!keyword) return false
    return tag.includes(keyword)
  })

  if (preReleaseVersion) {
    const repository = Core.getInput('repository')
    const api = new Api(token, repository)
    boostrap(api, tag)
  }

} catch (error) {
  Core.setFailed(error.message)
}
