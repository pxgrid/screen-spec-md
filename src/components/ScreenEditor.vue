<template>
  <div class="ScreenEditor">
    <Toolbar
      :editScreen="editScreen"
      :coordinates="coordinates"
      :selectedItemLabel="selectedItemLabel"
      :filenameWithCoordinates="filenameWithCoordinates"
      @changeSelectedItemLabel="onChangeSelectedItemLabel"
      @zoom="onZoom"
    />
    <div class="ScreenEditor_Container">
      <ViewPort
        :editScreen="editScreen"
        :coordinates="coordinates"
        :zoomedWidth="zoomedWidth"
        :zoomedHeight="zoomedHeight"
        :viewbox="viewbox"
        @addHighlight="onAddHighlight"
        @setImage="onSetImage"
        @selectHighlight="onSelectHighlight"
        @setCoordinates="onSetCoordinates"
        @removeHighlight="onRemoveHighlight"
      />
    </div>
  </div>
</template>

<script>
import Toolbar from './ScreenEditor/Toolbar.vue'
import ViewPort from './ScreenEditor/ViewPort.vue'
import ScreenEditorManager from '../class/ScreenEditorManager'
export default {
  name: 'ScreenEditor',
  components: {
    Toolbar,
    ViewPort,
  },
  props: {
    screen: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      manager: new ScreenEditorManager(),
    }
  },
  computed: {
    editScreen() {
      return this.manager.editScreen
    },
    coordinates() {
      return this.manager.coordinates
    },
    zoomedWidth() {
      return this.manager.zoomedWidth
    },
    zoomedHeight() {
      return this.manager.zoomedHeight
    },
    viewbox() {
      return this.manager.viewbox
    },
    selectedItemLabel() {
      return this.manager.selectedItemLabel
    },
    filenameWithCoordinates() {
      return this.manager.filenameWithCoordinates
    },
  },
  mounted() {
    this.manager.init({ screen: this.screen })
  },
  methods: {
    onSelectHighlight(order) {
      this.manager.selectHighlight = order
    },
    onChangeSelectedItemLabel({ relativeValue }) {
      this.manager.changeSelectedItemLabel = { relativeValue }
    },
    onZoom(zoomValue) {
      this.manager.zoom = zoomValue
    },
    // onUpdateFilenameWithCoordinates
    onAddHighlight(svgCoordinate) {
      this.manager.addHighlight = svgCoordinate
      this.onUpdateFilenameWithCoordinates()
    },
    onSetImage({ src, filename }) {
      this.manager.setImage = { src, filename }
      this.onUpdateFilenameWithCoordinates()
    },
    onSetCoordinates({ order, coordinateArray }) {
      this.manager.setCoordinates = { order, coordinateArray }
      this.onUpdateFilenameWithCoordinates()
    },
    onRemoveHighlight() {
      this.manager.removeHighlight()
      this.onUpdateFilenameWithCoordinates()
    },
    onUpdateFilenameWithCoordinates() {
      this.$emit('updateFilenameWithCoordinates', {
        filenameWithCoordinates: this.manager.filenameWithCoordinates,
      })
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
