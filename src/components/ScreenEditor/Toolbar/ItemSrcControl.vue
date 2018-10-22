<template>
  <div class="ItemSrcControl">
    <div>
      <input
        ref="filename"
        :value="filenameWithCoordinates"
        class="ItemSrcControl_Url"
        type="text"
        readonly="readonly"
        @click="onClickFilename()"
      >
    </div>
    <div>
      <a
        @click="onClickCopy"
      >
        Copy
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ItemSrcControl',
  computed: {
    ...mapGetters({
      filenameWithCoordinates: 'filenameWithCoordinates',
    }),
  },
  methods: {
    onClickFilename() {
      this.$refs.filename.focus()
      this.$refs.filename.select()
    },
    onClickCopy() {
      this.onClickFilename()
      document.execCommand('copy')
    },
  },
}
</script>

<style lang="scss" scoped>
.ItemSrcControl {
  display: grid;
  grid-template-columns: 1fr 200px;
  &_Url {
    width: 100%;
  }
}
</style>
