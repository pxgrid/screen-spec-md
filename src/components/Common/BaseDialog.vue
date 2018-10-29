<template>
  <div class="BaseDialog">
    <div class="BaseDialog_HeaderBtn">
      <button class="BaseDialog_CloseBtn"
        v-if="!disableCloseButton"
        @click="close"
        data-test="closeBtn"
      >
        <FontAwesomeIcon
          icon="close"
          size="2x"
        />
      </button>
    </div>
    <div
      class="BaseDialog_Wrapper"
      ref="wrapper"
    >
      <div class="BaseDialog_Header"
        data-test="headerSlot"
        v-if="$slots.header"
      >
        <slot name="header"></slot>
      </div>
      <div class="BaseDialog_Main"
        :class="{_overflowScroll: overflowScroll}"
        data-test="mainSlot"
        v-if="$slots.main"
      >
        <slot name="main"></slot>
      </div>
      <div class="BaseDialog_Footer"
        data-test="footerSlot"
        v-if="$slots.footer"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from './FontAwesomeIcon.vue'
export default {
  name: 'BaseDialog',
  props: {
    overflowScroll: {
      type: Boolean,
      default: true,
    },
    disableCloseButton: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.$refs.wrapper) {
      this.redrawHack(this.$refs.wrapper)
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    // IE11でダイアログの中身が多いときにスクロールが有効にならない不具合対策。
    // DevToolsなどでCSSのプロパティをOFF/ONにするとスクロールが有効になる。つまり再描画が必要。
    // なので再描画を強制的に起こすハックを使い再描画させることでスクロールされるようにする
    async redrawHack(el) {
      el.style.height = 'auto'
      await this.$nextTick()
      el.style.height = ''
    },
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style lang="scss" scoped>
.BaseDialog {
  margin: 0 auto;
  display: inline-flex;
  flex-direction: column;
  &_Wrapper {
    box-sizing: border-box;
    min-width: 392px;
    min-height: 280px;
    display: inline-flex;
    flex-direction: column;
    padding: 32px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #eee;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    height: 100%;
  }

  &_Header {
    font-weight: 600;
    margin-bottom: 24px;
  }
  &_Main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    &._overflowScroll {
      overflow: auto;
      -ms-overflow-style: none;
    }
  }
  &_Footer {
    min-height: 40px;
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_HeaderBtn {
    position: relative;
    width: 100%;
  }
  &_CloseBtn {
    position: absolute;
    cursor: pointer;
    /*top: 16px;*/
    /*right: 16px;*/
    /* アイコンがなくて見栄え上の変更 */
    top: 15px;
    right: 17px;
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    color: #999999;
    &:hover {
      color: #666;
    }
  }
}
</style>
