<template>
  <svg
    ref="svg"
    :width="zoomedWidth"
    :height="zoomedHeight"
    :viewBox="viewbox"
    class="EditorCanvas"
    @click="onClickSVG($event)"
  >
    <image
      v-bind="{ 'xlink:href': editScreen.src }"
      :width="editScreen.width"
      :height="editScreen.height"
      class="EditorCanvas_Image"
    />
    <Highlight
      v-for="(coordinate, index) in coordinates"
      :key="index"
      :order="index"
      :coordinate="coordinate"
      :selected="index === coordinate.selectedItem"
      :width="editScreen.width"
      :height="editScreen.height"
      :getCoordinateByXY="getCoordinateByXY"
      :draggingElement="draggingElement"
      @setDraggingElement="onSetDraggingElement"
      @selectHighlight="onSelectHighlight"
      @setCoordinates="onSetCoordinates"
    />
  </svg>
</template>

<script>
import { mapMutations } from 'vuex'
import rootTypes from '../../../store/types'
import Highlight from './EditorCanvas/Highlight.vue'
export default {
  name: 'EditorCanvas',
  components: {
    Highlight,
  },
  props: {
    editScreen: {
      type: Object,
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
    },
    zoomedWidth: {
      type: Number,
      required: true,
    },
    zoomedHeight: {
      type: Number,
      required: true,
    },
    viewbox: {
      type: String,
      required: true,
    },
    draggingElement: {
      type: Object,
      required: true,
    },
  },
  created() {
    this._handleKeyDown = this._handleKeyDown.bind(this)
  },
  mounted() {
    document.removeEventListener('keydown', this._handleKeyDown)
    document.addEventListener('keydown', this._handleKeyDown)
  },
  unmounted() {
    document.removeEventListener('keydown', this._handleKeyDown)
  },
  methods: {
    ...mapMutations({
      removeHighlight: rootTypes.REMOVE_HIGHLIGHT,
    }),
    onSetDraggingElement({ refCode, startOffsetX, startOffsetY }) {
      this.$emit('setDraggingElement', { refCode, startOffsetX, startOffsetY })
    },
    onSelectHighlight(order) {
      this.$emit('selectHighlight', order)
    },
    onSetCoordinates({ order, coordinateArray }) {
      this.$emit('setCoordinates', { order, coordinateArray })
    },
    _handleKeyDown(e) {
      if (e.keyCode === 8) {
        e.preventDefault()
        this.removeHighlight()
      }
    },
    onClickSVG(e) {
      e.preventDefault
      e.stopPropagation()
      if (!e.target.classList.contains('EditorCanvas_Image')) {
        return
      }
      const svgCoordinate = this.getCoordinateByXY(e)
      this.addHighlight(svgCoordinate)
    },
    getCoordinateByXY({ x, y }) {
      let svg = this.$refs.svg
      let p = svg.createSVGPoint()
      p.x = x | 0
      p.y = y | 0
      return p.matrixTransform(svg.getScreenCTM().inverse())
    },
    addHighlight(svgCoordinate) {
      this.$emit('addHighlight', svgCoordinate)
    },
  },
}
</script>

<style lang="scss" scoped>
.EditorCanvas {
  transition: all 0.3s;
  cursor: crosshair;
  &_Image {
  }
}
</style>
