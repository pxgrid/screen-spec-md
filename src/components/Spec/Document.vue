<template>
  <div
    :style="{ width: width }"
    class="Document"
  >
    <nav class="Document_Tools">
      <div>
        <div
          v-if="isDev"
        >
          <span>
            LastUpdate: {{ updatedDate }} {{ updatedAuthorName }}
          </span>
          <span>
            Created: {{ createdDate }} {{ createdAuthorName }}
          </span>
        </div>
        <div
          v-else
        >
          <span
            v-pre
          >
            <!-- eslint-disable-next-line vue/no-parsing-error -->
            LastUpdate: {{ updatedDate }} {{ updatedAuthorName }}
          </span>
          <span
            v-pre
          >
            <!-- eslint-disable-next-line vue/no-parsing-error -->
            Created: {{ createdDate }} {{ createdAuthorName }}
          </span>
        </div>
      </div>
    </nav>
    <div
      v-if="isDev"
      class="Document_Inner"
    >
      <div
        class="UISP-Md"
        v-html="dummyBodyHtml"
      />
    </div>
    <div
      v-else
      class="Document_Inner"
    >
      <div
        v-pre
        class="UISP-Md"
      >
        <!-- eslint-disable-next-line vue/no-parsing-error -->
        {{{ body }}}
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
    dummyBodyHtml() {
      return dummyBodyHtml
    },
    updatedDate() {
      return '2018/12/31'
    },
    updatedAuthorName() {
      return 'Pixel Gurio'
    },
    createdDate() {
      return '2018/01/01'
    },
    createdAuthorName() {
      return 'Pixel Gurio'
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
