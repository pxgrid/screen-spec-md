<template>
  <div :style="{ width: width }" class="Document">
    <nav class="Document_NavBar">
      <ul class="Document_NavBarTools">
        <li class="Document_NavBarToolItem">
          <button class="Document_NavBarIconButton" @click="toggleShowEditor">
            <FontAwesomeIcon icon="edit" size="1x" />
          </button>
        </li>
      </ul>
      <ul class="Document_Info">
        <li class="Document_InfoItem">LastUpdate: {{ updatedDate }} {{ updatedAuthorName }}</li>
        <li class="Document_InfoItem">Created: {{ createdDate }} {{ createdAuthorName }}</li>
      </ul>
    </nav>
    <div v-show="!showEditor" class="Document_Inner">
      <!-- eslint-disable vue/no-v-html -->
      <div class="UISP-Md" v-html="convertedHtml"></div>
      <!-- eslint-enable vue/no-v-html -->
      <slot></slot>
    </div>
    <div v-show="showEditor" class="Document_Editor">
      <DocumentEditor class="Document_DocumentEditor"></DocumentEditor>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '../Common/FontAwesomeIcon.vue'
import DocumentEditor from './DocumentEditor/ConnectedDocumentEditor'
export default {
  name: 'Document',
  components: {
    FontAwesomeIcon,
    DocumentEditor,
  },
  props: {
    width: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showEditor: false,
    }
  },
  computed: {
    convertedHtml() {
      return window.SCREEN_SPEC_MD.convertedHtml
    },
    updatedDate() {
      return window.SCREEN_SPEC_MD.updatedDate
    },
    updatedAuthorName() {
      return window.SCREEN_SPEC_MD.updatedAuthorName
    },
    createdDate() {
      return window.SCREEN_SPEC_MD.createdDate
    },
    createdAuthorName() {
      return window.SCREEN_SPEC_MD.createdAuthorName
    },
  },
  methods: {
    toggleShowEditor() {
      this.showEditor = !this.showEditor
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/variable.scss';
.Document {
  width: 50%;
  overflow: hidden;
  &_NavBar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: $navBarsHeight;
    background-color: #eeeeee;
    font-size: 0.9rem;
  }
  &_NavBarTools {
    margin: 0;
    padding: 0;
  }
  &_NavBarToolItem {
    line-height: 100%;
    display: inline-block;
  }
  &_NavBarIconButton {
    color: inherit;
    text-align: center;
    min-width: 30px;
    min-height: $navBarsHeight;
    padding: 0;
    border: none;
    background: none;
    margin-right: 0;
    &._disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.4;
    }
  }
  &_Info {
    margin: 0;
    padding: 0 10px 0 0;
    text-align: right;
  }
  &_InfoItem {
    line-height: $navBarsHeight;
    display: inline-block;
    height: $navBarsHeight;
    font-size: 12px;
    margin-left: 10px;
  }
  &_Inner {
    box-sizing: border-box;
    padding: 20px;
    height: calc(100vh - #{$theHeaderHeight} - #{$navBarsHeight});
    overflow: scroll;
  }
  &_Editor {
    height: calc(100vh - #{$theHeaderHeight} - #{$navBarsHeight});
  }
  &_DocumentEditor {
    height: 100%;
  }
  &_Footer {
    padding: 20px;
    background-color: #eeeeee;
  }
}
</style>
