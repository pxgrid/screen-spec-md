<template>
  <li>
    <div @click="toggle">
      <span v-if="isDir"> [{{ open ? '-' : '+' }}] </span>
      <a class="TreeItem_PageTitle" :class="{ _match: !matchFilter }" :href="treeData.rootPath">
        {{ treeData.title }}
      </a>
    </div>
    <ul v-if="isDir" v-show="open">
      <TreeItem
        v-for="(treeDataChild, index) in treeDataChildren"
        :key="index"
        class="item"
        :filterWord="filterWord"
        :treeData="treeDataChild"
        @expand="onExpand"
      >
      </TreeItem>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    filterWord: {
      type: String,
      default: '',
    },
    treeData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    isDir() {
      return this.treeData.children && this.treeData.children.length
    },
    treeDataChildren() {
      return this.treeData.children
    },
    matchFilter() {
      const title = this.treeData.title
      const regExp = new RegExp(this.filterWord)
      if (this.filterWord === '' || !title) return true
      return regExp.test(title)
    },
  },
  watch: {
    filterWord(newWord) {
      if (this.matchFilter && newWord !== '') {
        this.$emit('expand')
      }
    },
  },
  mounted() {
    if (this.opened) {
      this.open = true
    }
  },
  methods: {
    toggle() {
      if (this.isDir) {
        this.open = !this.open
      }
    },
    onExpand() {
      this.open = true
      this.$emit('expand')
    },
  },
}
</script>

<style lang="scss" scoped>
.TreeItem {
  &_PageTitle {
    &._match {
      color: #bbbbbb;
    }
  }
}
</style>
