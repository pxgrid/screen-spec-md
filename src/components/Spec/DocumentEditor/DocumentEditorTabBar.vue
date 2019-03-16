<template>
  <div class="DocumentEditorTabBar">
    <ul class="DocumentEditorTabBar_Tabs">
      <li class="DocumentEditorTabBar_WriteTab" @click="onClickWriteTab">Write</li>
      <li class="DocumentEditorTabBar_PreviewTab" @click="onClickPreviewTab">Preview</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DocumentEditorTabBar',
  methods: {
    onClickWriteTab() {
      this.$emit('clickWriteTab')
    },
    onClickPreviewTab() {
      this.$emit('clickPreviewTab')
    },
  },
}
</script>

<style lang="scss" scoped>
.DocumentEditorTabBar {
  height: 40px;
  background-color: #dfdfdf;
  &_Tabs {
    list-style: none;
    margin: 0;
    padding: 8px 8px 0 8px;
  }
  &_WriteTab,
  &_PreviewTab {
    display: inline-block;
    height: 26px;
    width: 80px;
    text-align: center;
    padding-top: 6px;
    font-size: 12px;
    background-color: #ffffff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}
</style>
