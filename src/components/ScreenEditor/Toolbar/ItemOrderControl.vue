<template>
  <div class="ItemOrderControl">
    <div>
      <a
        @click="onChangeSelectedItemLabel(-1)"
      >
        &lt;
      </a>
    </div>
    <div>
      <input
        :value="selectedItemLabel"
        type="text"
      >
    </div>
    <div>
      <a
        @click="onChangeSelectedItemLabel(1)"
      >
        &gt;
      </a>
    </div>
  </div>
</template>

<script>
import rootTypes from '../../../store/types'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ItemOrderControl',
  computed: {
    ...mapGetters({
      selectedItemLabel: 'selectedItemLabel',
    }),
  },
  methods: {
    ...mapMutations({
      changeSelectedItemLabel: rootTypes.CHANGE_SELECTED_ITEM_LABEL,
    }),
    onChangeSelectedItemLabel(relativeValue) {
      this.changeSelectedItemLabel({ relativeValue })
    },
  },
}
</script>

<style lang="scss" scoped>
.ItemOrderControl {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
}
</style>
