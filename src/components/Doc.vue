<template>
  <div>
    <TheHeader :isDev="isDev" @openTreeDialog="onOpenTreeDialog" />
    <div class="Doc">
      <Document :isDev="isDev" :width="'100%'" />
    </div>
    <OverlayScreen v-show="isShowTreeDialog" @close="onCloseTreeDialog">
      <BaseDialog :overflowScroll="true" @close="onCloseTreeDialog">
        <div slot="main">
          <PageTree :treeData="treeData" />
        </div>
      </BaseDialog>
    </OverlayScreen>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHeader from './TheHeader.vue'
import OverlayScreen from './Common/OverlayScreen.vue'
import BaseDialog from './Common/BaseDialog.vue'
import Document from './Spec/Document.vue'
import PageTree from './PageTree.vue'

export default {
  name: 'Doc',
  components: {
    TheHeader,
    OverlayScreen,
    BaseDialog,
    Document,
    PageTree,
  },
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      isShowTreeDialog: false,
    }
  },
  computed: {
    ...mapState({
      treeData: 'treeData',
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
@import '../assets/variable.scss';
.Doc {
  display: flex;
  max-height: calc(100vh - #{$theHeaderHeight});
  width: 100%;
}
</style>
