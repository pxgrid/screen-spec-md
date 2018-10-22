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
      v-bind="{'xlink:href':editScreen.src}"
      :width="editScreen.width"
      :height="editScreen.height"
      class="EditorCanvas_Image"
    />
    <Highlight
      v-for="(coordinate, index) in coordinates"
      :key="index"
      :order="index"
      :coordinate="coordinate"
      :selected="index===coordinate.selectedItem"
      :width="editScreen.width"
      :height="editScreen.height"
      :getCoordinateByXY="getCoordinateByXY"
    />
  </svg>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import rootTypes from '../../../store/types'
import Highlight from './EditorCanvas/Highlight'
export default {
  name: 'EditorCanvas',
  components: {
    Highlight,
  },
  computed: {
    ...mapState({
      editScreen: 'editScreen',
      coordinates: 'coordinates',
    }),
    ...mapGetters({
      zoomedWidth: 'zoomedWidth',
      zoomedHeight: 'zoomedHeight',
      viewbox: 'viewbox',
    }),
  },
  methods: {
    ...mapMutations({
      addHighlight: rootTypes.ADD_HIGHLIGHT,
    }),
    ...mapActions({
      setImage: rootTypes.SET_IMAGE,
    }),
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
