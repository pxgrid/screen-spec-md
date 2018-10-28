<template>
  <div class="ScreenToolbar">
    <a
      :class="{_disabled: isScreenFit}"
      class="ScreenToolbar_Item"
      @click="zoomOut()"
    >
      <FontAwesomeIcon
        icon="search-minus"
        size="1x"
      />
    </a>
    <span
      :class="{_disabled: isScreenFit}"
      class="Screen_Magnification"
    >
      {{ zoomValue }}
    </span>
    <a
      :class="{_disabled: isScreenFit}"
      class="ScreenToolbar_Item"
      @click="zoomIn()"
    >
      <FontAwesomeIcon
        icon="search-plus"
        size="1x"
      />
    </a>
    <a
      class="ScreenToolbar_Item"
      @click="zoomFit()"
    >
      <FontAwesomeIcon
        icon="expand-arrows-alt"
        size="1x"
      />
    </a>
    <a
      class="ScreenToolbar_Item"
      @click="toggleHighlight()"
    >
      highlight
    </a>
  </div>
</template>

<script>
import FontAwesomeIcon from '../../Common/FontAwesomeIcon.vue'

export default {
  name: 'ScreenToolbar',
  props: {
    zoomValue: {
      type: Number,
      required: true,
    },
    isScreenFit: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    zoomFit() {
      this.$emit('zoomFit')
    },
    zoomIn() {
      this.$emit('zoomIn')
    },
    zoomOut() {
      this.$emit('zoomOut')
    },
    toggleHighlight() {
      this.$emit('toggleHighlight')
    },
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style lang="scss" scoped>
.ScreenToolbar {
  &_Item {
    &._disabled {
      color: #999999;
      cursor: default;
    }
  }
}
</style>
