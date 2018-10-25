import loadImage from '../modules/loadImage'
import types from './types'
export default {
  async [types.SET_IMAGE]({ commit }, { src, filename }) {
    const { width, height } = await loadImage(src)
    return commit(types.SET_IMAGE, { width, height, src, filename })
  },
}
