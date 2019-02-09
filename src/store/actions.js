import axios from 'axios'
import loadImage from '../modules/loadImage'
import types from './types'

export default {
  async [types.SET_IMAGE]({ commit }, { src, filename }) {
    const { width, height } = await loadImage(src)
    return commit(types.SET_IMAGE, { width, height, src, filename })
  },

  async [types.FETCH_TREE_DATA]({ commit }) {
    const res = await axios.get('/tree.json')
    const treeData = res.data
    return commit(types.SET_TREE_DATA, { treeData })
  },
}
