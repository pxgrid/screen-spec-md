export default {
  selectedItemLabel(state) {
    return state.editScreen.selectedItem + 1
  },
  zoomedWidth(state) {
    return state.editScreen.width * state.editScreen.zoom
  },
  zoomedHeight(state) {
    return state.editScreen.height * state.editScreen.zoom
  },
  viewbox(state) {
    const w = state.editScreen.width
    const h = state.editScreen.height
    return `0 0 ${w} ${h}`
  },
  filenameWithCoordinates(state) {
    const filename = state.editScreen.filename
    const coordinates = state.coordinates
    if (!filename || filename.length === 0) {
      return ''
    }
    return `${filename}?highlight=${JSON.stringify(coordinates)}`
  },
}
