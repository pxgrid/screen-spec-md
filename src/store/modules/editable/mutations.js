import types from './types'
export default {
  [types.SET_MARKDOWN](state, { markdown }) {
    state.markdown = markdown
  },
}
