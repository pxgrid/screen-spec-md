<template>
  <div>
    <TheHeader @openTreeDialog="onOpenTreeDialog" />
    <div class="Spec">
      <Screen :width="screenWidth" />
      <Separator @drag="onSeparatorDrag" />
      <Doc
        :editable="editable"
        :width="documentWidth"
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
import Screen from './Spec/Screen.vue'
import Separator from './Spec/Separator.vue'
import Doc from './Spec/Doc.vue'

export default {
  name: 'ScreenSpec',
  components: {
    TheHeader,
    OverlayScreen,
    BaseDialog,
    Screen,
    Separator,
    Doc,
    Tree,
  },
  data() {
    return {
      isShowTreeDialog: false,
      screenWidth: '50%',
      documentWidth: '50%',
    }
  },
  computed: {
    ...mapState({
      treeData: 'treeData',
    }),
    ...mapState('editable', {
      editable: 'editable',
      convertedHtml: 'body',
      updatedDate: 'updatedDate',
      updatedAuthorName: 'updatedAuthorName',
      createdDate: 'createdDate',
      createdAuthorName: 'createdAuthorName',
    }),
  },
  methods: {
    onSeparatorDrag({ leftScreenRate }) {
      this.screenWidth = `${leftScreenRate * 100}%`
      this.documentWidth = `${(1 - leftScreenRate) * 100}%`
    },
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
.Spec {
  display: flex;
  max-height: calc(100vh - #{$theHeaderHeight});
  width: 100%;
}
</style>