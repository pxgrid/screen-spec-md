import api from '../../../api'
import types from './types'
export default {
  async [types.FETCH_MARKDOWN]({ commit }) {
    const path = location.pathname
    const res = await api.fetchMarkdown({ path })
    const markdown = res.data
    return commit(types.SET_MARKDOWN, { markdown })
  },
}
