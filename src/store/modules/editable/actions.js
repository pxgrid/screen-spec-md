import api from '../../../api'
import types from './types'

export default {
  async [types.FETCH_MARKDOWN]({ commit }) {
    const path = location.pathname
    const res = await api.fetchMarkdown({ path })
    const markdown = res.data
    commit(types.SET_MARKDOWN, { markdown })
  },

  async [types.FETCH_CONVERTED_HTML]({ commit }, { markdown }) {
    const res = await api.fetchConvertedHtml({ markdown })
    const html = res.data.html
    commit(types.SET_CONVERTED_HTML, { html })
  },

  async [types.WRITE_MARKDOWN]({ commit }, { markdown }) {
    const path = location.pathname.replace(/^\//, '')
    const res = await api.writeMarkdown({ path, markdown })
    commit(types.SET_PAGE_CONTEXT, res.data.context)
    commit(types.SET_MARKDOWN, { markdown })
  },

  async [types.WRITE_SCREEN_METADATA]({ commit }, { screenMetadata }) {
    const path = location.pathname.replace(/^\//, '')
    const res = await api.writeMetadataScreen({ path, screenMetadata })
    commit(types.SET_PAGE_CONTEXT, res.data.context)
    return res.data.context
  },
}
