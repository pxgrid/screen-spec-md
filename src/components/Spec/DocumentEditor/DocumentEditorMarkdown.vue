<template>
  <div class="DocumentEditorMarkdown">
    <textarea v-model="markdown" class="DocumentEditorMarkdown_TextArea"></textarea>
  </div>
</template>

<script>
export default {
  name: 'DocumentEditorMarkdown',
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.DocumentEditorMarkdown {
  box-sizing: border-box;
  padding: 8px;
  height: 100%;
  &_TextArea {
    box-sizing: border-box;
    font-size: 14px;
    padding: 8px;
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
  }
}
</style>
