import api from '../../../api'
import types from './types'
export default {
  async [types.FETCH_MARKDOWN]({ commit }) {
    const path = location.pathname
    const res = await api.fetchMarkdown({ path })
    const markdown = res.data
    commit(types.SET_MARKDOWN, { markdown })
  },

  async [types.WRITE_MARKDOWN]({ commit }, { markdown }) {
    const path = location.pathname
    const res = await api.writeMarkdown({ path, markdown })
    commit(types.SET_PAGE_CONTEXT, res.data.context)
    commit(types.SET_MARKDOWN, { markdown })
  },
}
