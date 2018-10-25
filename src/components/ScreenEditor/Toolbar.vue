<template>
  <div class="Toolbar">

    <div>
      <label class="Toolbar_Label">
        src
      </label>
    </div>
    <div>
      <ItemSrcControl/>
    </div>

    <div>
      <label class="Toolbar_Label">
        label
      </label>
    </div>
    <div class="Toolbar_HighlightControllers">
      <ItemOrderControl/>
      <ItemCoordinateControl
        :coordinate-key="'x'"
      />
      <ItemCoordinateControl
        :coordinate-key="'y'"
      />
      <ItemCoordinateControl
        :coordinate-key="'w'"
      />
      <ItemCoordinateControl
        :coordinate-key="'h'"
      />
      <ItemZoomControl/>
    </div>

  </div>
</template>

<script>
import ItemSrcControl from './Toolbar/ItemSrcControl.vue'
import ItemCoordinateControl from './Toolbar/ItemCoordinateControl.vue'
import ItemZoomControl from './Toolbar/ItemZoomControl.vue'
import ItemOrderControl from './Toolbar/ItemOrderControl.vue'
export default {
  name: 'Toolbar',
  components: {
    ItemSrcControl,
    ItemCoordinateControl,
    ItemZoomControl,
    ItemOrderControl,
  },
}
</script>

<style lang="scss" scoped>
.Toolbar {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 30px 30px;
  column-gap: 10px;
  row-gap: 10px;
  padding: 0.5rem;
  color: #eeeeee;
  background-color: #666666;
  &_Label {
    color: #dddddd;
  }
  &_FieldLabel {
  }
  &_HighlightControllers {
    display: grid;
    grid-template-columns: 300px 100px 100px 100px 100px 300px;
  }
}
</style>
