<template>
  <div
    :style="{ width: width }"
    class="Document"
  >
    <nav class="Document_Tools">
      <div>
        <span>
          LastUpdate: {{ updatedDate }} {{ updatedAuthorName }}
        </span>
        <span>
          Created: {{ createdDate }} {{ createdAuthorName }}
        </span>
      </div>
    </nav>
    <div
      class="Document_Inner"
    >
      <div
        class="UISP-Md"
        v-html="convertedHtml"
      >
      </div>
    </div>
  </div>
</template>

<script>
import dummyBodyHtml from './dummies/dummyBody.html'
export default {
  name: 'Document',
  props: {
    isDev: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  computed: {
    convertedHtml() {
      if (this.isDev) return dummyBodyHtml
      return window.SCREEN_SPEC_MD.convertedHtml
    },
    updatedDate() {
      if (this.isDev) return '2018/12/31'
      return window.SCREEN_SPEC_MD.updatedDate
    },
    updatedAuthorName() {
      if (this.isDev) return 'Pixel Gurio'
      return window.SCREEN_SPEC_MD.updatedAuthorName
    },
    createdDate() {
      if (this.isDev) return '2018/01/01'
      return window.SCREEN_SPEC_MD.createdDate
    },
    createdAuthorName() {
      if (this.isDev) return 'Pixel Gurio'
      return window.SCREEN_SPEC_MD.createdAuthorName
    },
  },
}
</script>

<style lang="scss" scoped>
.Document {
  width: 50%;
  overflow: hidden;
  &_Tools {
    background-color: #eeeeee;
    font-size: 0.9rem;
    min-height: 2em;
  }
  &_Inner {
    padding: 20px;
    height: calc(100vh - 48px - 30px); // 30pxはScreen_Toolsクラスの高さ
    overflow: scroll;
  }
  &_Footer {
    padding: 20px;
    background-color: #eeeeee;
  }
}
</style>
