<template>
  <div class="DocumentEditor">
    <DocumentEditorTabBar />
    <div class="DocumentEditor_InputContainer">
      <DocumentEditorMarkdown :markdown="markdown" />
      <DocumentEditorPreview />
    </div>
    <div class="DocumentEditor_ActionBar">
      <button>Cancel</button>
      <button>Save</button>
    </div>
  </div>
</template>

<script>
import DocumentEditorTabBar from './DocumentEditorTabBar.vue'
import DocumentEditorMarkdown from './DocumentEditorMarkdown.vue'
import DocumentEditorPreview from './DocumentEditorPreview.vue'
export default {
  name: 'DocumentEditor',
  components: {
    DocumentEditorTabBar,
    DocumentEditorMarkdown,
    DocumentEditorPreview,
  },
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.DocumentEditor {
  display: grid;
  grid-template-rows: 40px auto 50px;
  grid-template-columns: auto;
  &_InputContainer {
    height: 100%;
    border: 1px solid #e5e5e5;
    border-top-style: none;
  }
}
</style>
