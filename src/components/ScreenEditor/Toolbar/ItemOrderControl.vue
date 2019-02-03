<template>
  <div class="ItemOrderControl">
    <div class="ItemOrderControl_Item">
      <a @click="onChangeSelectedItemLabel(-1)">
        &lt;
      </a>
    </div>
    <div>
      <input class="ItemOrderControl_Input" :value="selectedItemLabel" type="text" />
    </div>
    <div class="ItemOrderControl_Item">
      <a @click="onChangeSelectedItemLabel(1)">
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
  grid-template-columns: 20px 50px 20px;
  &_Item {
    text-align: center;
  }
  &_Input {
    height: 14px;
    width: 40px;
  }
}
</style>
