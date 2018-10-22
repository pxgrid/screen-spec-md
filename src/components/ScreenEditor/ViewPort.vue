<template>
  <div class="Viewport">
    <div class="Viewport_Inner">
      <EditorCanvas
        v-if="editScreen.src"
      />
      <EditorDrop
        v-else
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditorCanvas from './ViewPort/EditorCanvas'
import EditorDrop from './ViewPort/EditorDrop'
export default {
  name: 'Viewport',
  components: {
    EditorCanvas,
    EditorDrop,
  },
  computed: {
    ...mapState({
      editScreen: 'editScreen',
    }),
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
