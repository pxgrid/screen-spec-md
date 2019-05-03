<template>
  <div class="DocumentEditor">
    <DocumentEditorTabBar @activeWrite="activeWrite" @activePreview="activePreview" />
    <div class="DocumentEditor_InputContainer">
      <DocumentEditorMarkdown
        v-show="isActiveWrite"
        :markdown="editingMarkdown"
        @updateMarkdown="updateMarkdown"
      />
      <DocumentEditorPreview
        v-show="!isActiveWrite"
        class="DocumentEditor_Preview"
        :previewedHtml="previewedHtml"
      />
    </div>
    <div class="DocumentEditor_ActionBar">
      <button @click="cancelEditMarkdown()">Cancel</button>
      <button @click="writeMarkdown()">Save</button>
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
    previewedHtml: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isActiveWrite: true,
      editingMarkdown: '',
    }
  },
  watch: {
    markdown: function(newVal, oldVal) {
      // markdownの値は非同期で取得するためmounted時のpropsの値がnullになってしまうので、非同期後に取得できるようにwatchしている
      this.editingMarkdown = newVal
    },
  },
  methods: {
    activeWrite() {
      this.isActiveWrite = true
    },
    activePreview() {
      this.$emit('fetchConvertedHtml', { markdown: this.editingMarkdown })
      this.isActiveWrite = false
    },
    updateMarkdown(changedMarkdown) {
      this.editingMarkdown = changedMarkdown
    },
    writeMarkdown() {
      this.$emit('writeMarkdown', { markdown: this.editingMarkdown })
      this.$emit('closeEditor')
    },
    cancelEditMarkdown() {
      this.editingMarkdown = this.markdown
      this.$emit('closeEditor')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/variable.scss';
.DocumentEditor {
  display: grid;
  grid-template-rows: 40px auto 50px;
  grid-template-columns: auto;
  &_InputContainer {
    height: 100%;
    border: 1px solid #e5e5e5;
    border-top-style: none;
  }
  &_Preview {
    box-sizing: border-box;
    padding: 20px;
    height: calc(100vh - #{$documentEditorTabBarHeight} - #{$theHeaderHeight} - #{$navBarsHeight});
    overflow: scroll;
  }
}
</style>
