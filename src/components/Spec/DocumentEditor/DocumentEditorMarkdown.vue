<template>
  <div class="DocumentEditorMarkdown">
    <textarea
      :value="markdown"
      class="DocumentEditorMarkdown_TextArea"
      @change="changeMarkdown"
      @paste="handlePaste"
    ></textarea>
  </div>
</template>

<script>
import api from '../../../api'

export default {
  name: 'DocumentEditorMarkdown',
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
  methods: {
    changeMarkdown(e) {
      this._updateMarkdown(e.target.value)
    },
    handlePaste(e) {
      if (!this._isSingleFileType(e.clipboardData)) return true
      const imagePath = prompt(
        'Please enter the image file path. If the width is specified, specify as \'! [./img/foo.png] (./img/foo.png "=100x")\'.',
        './img/undefined.png',
      )
      if (imagePath === '') {
        return false
      }
      const imageFile = e.clipboardData.items[0].getAsFile()
      this._uploadImage(imagePath, imageFile)
        .then(() => {
          const textBefore = e.target.value.substring(0, e.target.selectionStart)
          const textAfter = e.target.value.substring(e.target.selectionEnd, e.target.value.length)
          const markdown = textBefore + `![${imagePath}](${imagePath})` + textAfter
          this._updateMarkdown(markdown)
        })
        .catch(e => {
          console.error(e)
        })
    },
    _updateMarkdown(markdown) {
      this.$emit('updateMarkdown', markdown)
    },
    _isSingleFileType(clipboardData) {
      if (!clipboardData) return false
      if (!clipboardData.types) return false
      if (clipboardData.types.length !== 1) return false
      return clipboardData.types[0] === 'Files'
    },
    _uploadImage(imagePath, imageFile) {
      const formData = new FormData()
      formData.append('path', imagePath)
      formData.append('image', imageFile)
      return api.uploadImage({ formData })
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
