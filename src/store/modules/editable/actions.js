import api from '../../../api'
import types from './types'
export default {
  async [types.FETCH_MARKDOWN]({ commit }) {
    const path = location.pathname
    const res = await api.fetchMarkdown({ path })
    const markdown = res.data
    return commit(types.SET_MARKDOWN, { markdown })
  },

  async [types.WRITE_MARKDOWN]({ commit }, { markdown }) {
    const path = location.pathname
    await api.writeMarkdown({ path, markdown })
    return commit(types.SET_MARKDOWN, { markdown })
  },
}
