<template>
  <div
    class="EditorDrop"
    @dragenter.prevent="onDragEnter"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div class="EditorDrop_Target">
      <svg class="EditorDrop_Icon" width="50" height="43" viewBox="0 0 50 43">
        <path
          d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"
        />
      </svg>
      Drag an image here.
    </div>
  </div>
</template>

<script>
import loadImage from '../../../modules/loadImage'
export default {
  name: 'EditorDrop',
  methods: {
    onDragEnter(e) {},
    onDragOver(e) {},
    onDragLeave(e) {},
    async onDrop(e) {
      const file = e.dataTransfer.files[0]
      if (!/image/.test(file.type)) {
        return
      }
      const imagePath = prompt('Please enter the image file path.', './img/undefined.png')
      if (imagePath === null) {
        return false
      }
      const imageItem = e.dataTransfer.items[0]
      const imageFile = imageItem.getAsFile()
      const imageBase64 = await this.readFileBase64(file)
      const { width, height } = await loadImage(imageBase64)
      this.setImage(
        {
          src: imageBase64,
          filename: imagePath,
          width,
          height,
        },
        {
          fileToUpload: imageFile,
        },
      )
    },
    async readFileBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => resolve(e.target.result)
        reader.onerror = e => reject(e)
        reader.readAsDataURL(file)
      })
    },
    setImage({ src, filename, width, height }, { fileToUpload }) {
      this.$emit('setImage', { src, filename, width, height }, { fileToUpload })
    },
  },
}
</script>

<style lang="scss" scoped>
.EditorDrop {
  color: #0f3c4b;
  font-size: 18px;
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  display: table;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  border-spacing: 10px;
  border-collapse: separate;
  background: #c8dadf;
  transition: all 0.1s;
  &_Target {
    pointer-events: none;
    vertical-align: middle;
    display: table-cell;
    box-sizing: border-box;
    height: 100%;
    padding: 10px;
    border: 2px dashed #92b0b3;
  }
  &_Icon {
    width: 75px;
    height: 65px;
    display: block;
    margin: 0 auto 20px;
    fill: #92b0b3;
  }
}
</style>
