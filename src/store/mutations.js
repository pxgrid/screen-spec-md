import types from './types'
import calcCoordinate from '../modules/calcCoordinate'

export default {
  [types.SET_IMAGE](state, { width, height, src, filename }) {
    Object.assign(state.editScreen, { width, height, src, filename })
  },
  [types.INIT_COORDINATES](state, { coordinateArrayList }) {
    state.coordinates = coordinateArrayList
  },

  [types.SET_COORDINATES](state, { order, coordinateArray }) {
    const currentCoordinate = state.coordinates[order]
    const { x, y, w, h } = calcCoordinate(currentCoordinate, coordinateArray, {
      imageWidth: state.editScreen.width,
      imageHeight: state.editScreen.height,
    })
    state.coordinates[order] = [x, y, w, h]
    state.coordinates = [...state.coordinates] //変更を検知させるため
  },

  [types.ADD_HIGHLIGHT](state, { x, y }) {
    const coordinate = [x, y, 100, 100]
    state.editScreen.selectedItem = state.coordinates.length
    state.coordinates.push(coordinate)
  },

  [types.REMOVE_HIGHLIGHT](state) {
    if (state.selectedItem < 0) {
      return
    }
    state.coordinates.splice(state.selectedItem, 1)
  },

  [types.SELECT_HIGHLIGHT](state, selectedItem) {
    state.editScreen.selectedItem = selectedItem
  },

  [types.SHIFT_HIGHLIGHT](state) {
    const index = state.editScreen.selectedItem
    if (index <= 0) {
      return
    }
    ;[state.editScreen.selectedItem[index], state.editScreen.selectedItem[index - 1]] = [
      state.editScreen.selectedItem[index - 1],
      state.editScreen.selectedItem[index],
    ]
    state.editScreen.selectedItem--
  },

  [types.UNSHIFT_HIGHLIGHT](state) {
    if (state.editScreen.selectedItem < 0) {
      return
    }
    if (state.editScreen.selectedItem >= state.coordinates.length) {
      return
    }
    const index = state.editScreen.selectedItem + 1
    ;[state.editScreen.selectedItem[index], state.editScreen.selectedItem[index - 1]] = [
      state.editScreen.selectedItem[index - 1],
      state.editScreen.selectedItem[index],
    ]
    state.editScreen.selectedItem = index
  },

  [types.ZOOM](state, inputZoom) {
    state.editScreen.zoom = inputZoom
  },

  [types.SET_DRAGGING_ELEMENT](state, { refCode, startOffsetX, startOffsetY }) {
    state.draggingElement = { refCode, startOffsetX, startOffsetY }
  },

  [types.CHANGE_SELECTED_ITEM_LABEL](state, { relativeValue }) {
    const editScreen = state.editScreen
    const selectedIndex = editScreen.selectedItem

    const changedIndex = selectedIndex + relativeValue
    if (changedIndex < 0 || changedIndex >= state.coordinates.length) {
      console.warn("Invalid CHANGE_SELECTED_ITEM_LABEL's relativeValue.")
      return
    }
    const selectedCoordinate = state.coordinates.splice(selectedIndex, 1)[0]
    state.coordinates.splice(changedIndex, 0, selectedCoordinate)
    state.editScreen.selectedItem = changedIndex
  },
}
