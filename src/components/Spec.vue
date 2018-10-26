<template>
  <div>
    <TheHeader
      :is-dev="isDev"
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
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue'
import Screen from './Spec/Screen.vue'
import Separator from './Spec/Separator.vue'
import Document from './Spec/Document.vue'
export default {
  name: 'Spec',
  components: {
    TheHeader,
    Screen,
    Separator,
    Document,
  },
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      screenWidth: '50%',
      documentWidth: '50%',
    }
  },
  methods: {
    onSeparatorDrag({ leftScreenRate }) {
      this.screenWidth = `${leftScreenRate * 100}%`
      this.documentWidth = `${(1 - leftScreenRate) * 100}%`
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
