import api from '../../../api'
import types from './types'
export default {
  async [types.FETCH_MARKDOWN]({ commit }) {
    const res = await api.fetchMarkdown({ path: '/settings/index' })
    const markdown = res.data
    return commit(types.SET_MARKDOWN, { markdown })
  },
}
