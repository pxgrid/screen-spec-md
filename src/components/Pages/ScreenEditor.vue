<template>
  <div class="ScreenEditor">
    <Toolbar />
    <div class="ScreenEditor_Container">
      <ViewPort
        :editScreen="editScreen"
        :coordinates="coordinates"
        :zoomedWidth="zoomedWidth"
        :zoomedHeight="zoomedHeight"
        :viewbox="viewbox"
        @addHighlight="onAddHighlight"
        @setImage="onSetImage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import rootTypes from '../../store/types'
import Toolbar from './ScreenEditor/Toolbar.vue'
import ViewPort from './ScreenEditor/ViewPort.vue'
export default {
  name: 'ScreenEditor',
  components: {
    Toolbar,
    ViewPort,
  },
  props: {
    screenPath: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
    },
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
      filenameWithCoordinates: 'filenameWithCoordinates',
    }),
  },
  mounted() {
    this.initByQueries()
  },
  methods: {
    ...mapMutations({
      addHighlight: rootTypes.ADD_HIGHLIGHT,
      initCoordinates: rootTypes.INIT_COORDINATES,
      selectHighlight: rootTypes.SELECT_HIGHLIGHT,
    }),
    ...mapActions({
      setImage: rootTypes.SET_IMAGE,
    }),
    onAddHighlight(svgCoordinate) {
      this.addHighlight(svgCoordinate)
    },
    onSetImage({ src, filename }) {
      this.setImage({ src, filename })
    },
    initByQueries() {
      // TODO: この辺りが旧アプリ(ui-spec)からの移行の影響で実装が雑なので、store含めてリファクタリングする
      this.setImage({ src: this.screenPath, filename: this.screenPath })
      this.selectHighlight(0)
      this.initCoordinates({ coordinateArrayList: JSON.parse(this.highlight) })
    },
  },
}
</script>

<style lang="scss" scoped>
.ScreenEditor {
  table-layout: fixed;
  display: table;
  width: 100%;
  height: 100%;
  &_Container {
    height: 100%;
    display: table-row;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAF0lEQVR4AWP4DwVvoWCgBGAMmMQACQAAuK72AWHjK4wAAAAASUVORK5CYII=);
  }
}
</style>
