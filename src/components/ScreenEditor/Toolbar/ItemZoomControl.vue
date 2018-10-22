<template>
  <div class="ItemZoomControl">
    <div>
      zoom
    </div>
    <div>
      <input type="range">
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
  grid-template-columns: 100px 1fr;
}
</style>
