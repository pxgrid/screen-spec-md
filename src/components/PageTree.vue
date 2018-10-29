<template>
  <ul class="PageTree">
    <TreeItem
      class="PageTree_Item"
      :opened="true"
      :treeData="treeData"
    />
  </ul>
</template>

<script>
import dummyTreeData from './PageTree/dummies/tree.json'
import TreeItem from './PageTree/TreeItem.vue'
export default {
  name: 'PageTree',
  computed: {
    treeData() {
      return dummyTreeData //TODO: modeがdevelopment時のみdummyデータ
    },
  },
  components: {
    TreeItem,
  },
}
</script>

<style lang="scss" scoped>
.PageTree {
  overflow: scroll;
  height: 80vh;
  width: 600px;
}
</style>
