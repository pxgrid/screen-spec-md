<template>
  <div class="PageTree">
    <div>
      <input class="PageTree_FilterInput" type="text" @keyup="onKeyUpFilter" />
    </div>
    <ul class="PageTree_List">
      <TreeItem
        class="PageTree_Item"
        :opened="true"
        :filterWord="filterWord"
        :treeData="treeData"
      />
    </ul>
  </div>
</template>

<script>
import TreeItem from './PageTree/TreeItem.vue'
export default {
  name: 'PageTree',
  components: {
    TreeItem,
  },
  props: {
    treeData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filterWord: '',
    }
  },
  methods: {
    onKeyUpFilter(e) {
      this.filterWord = e.target.value
    },
  },
}
</script>

<style lang="scss" scoped>
.PageTree {
  &_FilterInput {
    padding: 5px;
    width: 300px;
    height: 35px;
    box-sizing: border-box;
    outline: 0;
  }
  &_List {
    overflow: scroll;
    height: 80vh;
    width: 600px;
  }
}
</style>
