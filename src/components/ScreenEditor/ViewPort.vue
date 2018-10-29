<template>
  <div class="Viewport">
    <div class="Viewport_Inner">
      <EditorCanvas
        v-if="editScreen.src"
        :editScreen="editScreen"
        :coordinates="coordinates"
        :zoomedWidth="zoomedWidth"
        :zoomedHeight="zoomedHeight"
        :viewbox="viewbox"
        @addHighlight="onAddHighlight"
      />
      <EditorDrop
        v-else
        @setImage="onSetImage"
      />
    </div>
  </div>
</template>

<script>
import EditorCanvas from './ViewPort/EditorCanvas.vue'
import EditorDrop from './ViewPort/EditorDrop.vue'
export default {
  name: 'Viewport',
  components: {
    EditorCanvas,
    EditorDrop,
  },
  props: {
    editScreen: {
      type: Object,
    },
    coordinates: {
      type: Array,
    },
    zoomedWidth: {
      type: Number,
    },
    zoomedHeight: {
      type: Number,
    },
    viewbox: {
      type: String,
    },
  },
  methods: {
    onAddHighlight(svgCoordinate) {
      this.$emit('addHighlight', svgCoordinate)
    },
    onSetImage({ src, filename }) {
      this.$emit('setImage', { src, filename })
    },
  },
}
</script>

<style lang="scss" scoped>
.Viewport {
  position: relative;
  display: table-cell;
  &_Inner {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 20px;
    text-align: center;
    overflow: auto;
  }
}
</style>
