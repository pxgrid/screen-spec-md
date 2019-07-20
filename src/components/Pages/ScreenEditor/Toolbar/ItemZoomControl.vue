<template>
  <div class="ItemZoomControl">
    <div class="ItemZoomControl_Label">
      zoom
    </div>
    <div class="ItemZoomControl_Item">
      <input
        class="ItemZoomControl_Range"
        type="range"
        step="0.25"
        min="0.5"
        max="1.5"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import rootTypes from '../../../../store/types'
export default {
  name: 'ItemZoomControl',
  methods: {
    ...mapMutations({
      zoom: rootTypes.ZOOM,
    }),
    onInput(e) {
      //changeイベントでは、リアルタイムに変更が反映されない
      this.zoom(e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.ItemZoomControl {
  display: grid;
  grid-template-columns: 50px 1fr;
  &_Label {
    text-align: right;
  }
  &_Item {
    padding: 0 10px;
  }
  &_Range {
    height: 20px;
  }
}
</style>
