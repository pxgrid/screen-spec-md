<template>
  <li>
    <div
      @click="toggle"
    >
      <a :href="treeData.rootPath">
        {{ treeData.title }}
      </a>
      <span
        v-if="isDir"
      >
        [{{ open ? '-' : '+' }}]
      </span>
    </div>
    <ul
      v-if="isDir"
      v-show="open"
    >
      <TreeItem
        class="item"
        v-for="(treeData, index) in treeData.children"
        :key="index"
        :treeData="treeData"
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
    treeData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.opened) {
      this.open = true
    }
  },
  data: function() {
    return {
      open: false,
    }
  },
  computed: {
    isDir: function() {
      return this.treeData.children && this.treeData.children.length
    },
  },
  methods: {
    toggle: function() {
      if (this.isDir) {
        this.open = !this.open
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
