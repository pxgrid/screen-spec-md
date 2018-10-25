<template>
  <div class="ScreenEditor">
    <Toolbar />
    <div class="ScreenEditor_Container">
      <ViewPort />
    </div>
  </div>
</template>

<script>
import Toolbar from '../components/ScreenEditor/Toolbar.vue'
import ViewPort from '../components/ScreenEditor/ViewPort.vue'
export default {
  name: 'ScreenEditor',
  layout: 'ImageCanvasEditorLayout',
  components: {
    Toolbar,
    ViewPort,
  },
  data() {
    return {}
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
