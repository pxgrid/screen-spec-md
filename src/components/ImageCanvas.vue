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
import rootTypes from '../store/types'
import Toolbar from '../components/ScreenEditor/Toolbar.vue'
import ViewPort from '../components/ScreenEditor/ViewPort.vue'
export default {
  name: 'ScreenEditor',
  components: {
    Toolbar,
    ViewPort,
  },
  data() {
    return {}
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
    onAddHighlight(svgCoordinate) {
      this.addHighlight(svgCoordinate)
    },
    onSetImage({ src, filename }) {
      this.setImage({ src, filename })
    },
  },
}
</script>

<style lang="scss" scoped>
.ScreenEditor {
  table-layout: fixed;
  display: table;
  width: 100%;
  min-height: 100%;
  &_Container {
    height: 100%;
    display: table-row;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAF0lEQVR4AWP4DwVvoWCgBGAMmMQACQAAuK72AWHjK4wAAAAASUVORK5CYII=);
  }
}
</style>
