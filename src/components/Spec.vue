<template>
  <div>
    <TheHeader
      :is-dev="isDev"
      @openTreeDialog="onOpenTreeDialog"
    />
    <div class="Spec">
      <Screen
        :is-dev="isDev"
        :width="screenWidth"
      />
      <Separator
        @drag="onSeparatorDrag"
      />
      <Document
        :is-dev="isDev"
        :width="documentWidth"
      />
    </div>
    <OverlayScreen
      v-show="isShowTreeDialog"
      @close="onCloseTreeDialog"
    >
      <BaseDialog
        :overflowScroll="true"
        @close="onCloseTreeDialog"
      >
        <div slot="main">
          <PageTree />
        </div>
      </BaseDialog>
    </OverlayScreen>
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue'
import OverlayScreen from './Common/OverlayScreen.vue'
import BaseDialog from './Common/BaseDialog.vue'
import Screen from './Spec/Screen.vue'
import Separator from './Spec/Separator.vue'
import Document from './Spec/Document.vue'
import PageTree from './PageTree.vue'

export default {
  name: 'Spec',
  components: {
    TheHeader,
    OverlayScreen,
    BaseDialog,
    Screen,
    Separator,
    Document,
    PageTree,
  },
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      isShowTreeDialog: false,
      screenWidth: '50%',
      documentWidth: '50%',
    }
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
.Spec {
  display: flex;
  max-height: calc(100vh - 48px);
  width: 100%;
}
</style>
