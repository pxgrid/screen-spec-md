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
        :draggingElement="draggingElement"
        @addHighlight="onAddHighlight"
        @setDraggingElement="onSetDraggingElement"
        @selectHighlight="onSelectHighlight"
      />
      <EditorDrop v-else @setImage="onSetImage" />
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
  methods: {
    onAddHighlight(svgCoordinate) {
      this.$emit('addHighlight', svgCoordinate)
    },
    onSetImage({ src, filename }) {
      this.$emit('setImage', { src, filename })
    },
    onSetDraggingElement({ refCode, startOffsetX, startOffsetY }) {
      this.$emit('setDraggingElement', { refCode, startOffsetX, startOffsetY })
    },
    onSelectHighlight(order) {
      this.$emit('selectHighlight', order)
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
