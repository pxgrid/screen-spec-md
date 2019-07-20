<template>
  <div>
    <TheHeader @openTreeDialog="onOpenTreeDialog" />
    <div class="Doc">
      <Document
        :width="'100%'"
        :convertedHtml="convertedHtml"
        :updatedDate="updatedDate"
        :createdDate="createdDate"
        :createdAuthorName="createdAuthorName"
      />
    </div>
    <OverlayScreen v-show="isShowTreeDialog" @close="onCloseTreeDialog">
      <BaseDialog :overflowScroll="true" @close="onCloseTreeDialog">
        <div slot="main">
          <Tree :treeData="treeData" />
        </div>
      </BaseDialog>
    </OverlayScreen>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHeader from '../TheHeader.vue'
import OverlayScreen from '../Common/OverlayScreen.vue'
import BaseDialog from '../Common/BaseDialog.vue'
import Tree from '../Common/Tree.vue'
import Document from './Spec/Document.vue'

export default {
  name: 'Doc',
  components: {
    TheHeader,
    OverlayScreen,
    BaseDialog,
    Document,
    Tree,
  },
  data() {
    return {
      isShowTreeDialog: false,
    }
  },
  computed: {
    ...mapState({
      treeData: 'treeData',
    }),
    ...mapState('editable', {
      convertedHtml: 'body',
      updatedDate: 'updatedDate',
      updatedAuthorName: 'updatedAuthorName',
      createdDate: 'createdDate',
      createdAuthorName: 'createdAuthorName',
    }),
  },
  methods: {
    onOpenTreeDialog() {
      this.isShowTreeDialog = true
    },
    onCloseTreeDialog() {
      this.isShowTreeDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/variable.scss';
.Doc {
  display: flex;
  max-height: calc(100vh - #{$theHeaderHeight});
  width: 100%;
}
</style>
