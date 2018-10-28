<template>
  <div class="ItemZoomControl">
    <div class="ItemZoomControl_Label">
      zoom
    </div>
    <div class="ItemZoomControl_Item">
      <input
        class="ItemZoomControl_Range"
        type="range"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemZoomControl',
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
