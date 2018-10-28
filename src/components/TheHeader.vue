<template>
  <div class="TheHeader">
    <nav class="TheHeader_MainNav">
      <a
        class="TheHeader_IconLink"
        href="/"
      >
        <FontAwesomeIcon
          icon="search"
          size="lg"
        />
      </a>
      <a
        class="TheHeader_IconLink"
        href="/"
      >
        <FontAwesomeIcon
          icon="home"
          size="lg"
        />
      </a>
    </nav>
    <span
      class="TheHeader_PageTitle"
    >
      {{ title }}
    </span>
    <div class="TheHeader_NavForDeveloper"
      v-if="isDev"
    >
      <a
        class="TheHeader_Link"
        href="/spec"
      >
        Spec
      </a>
      <a
        class="TheHeader_Link"
        href="/list"
      >
        List
      </a>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from './Common/FontAwesomeIcon.vue'
export default {
  name: 'TheHeader',
  props: {
    isDev: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    title() {
      if (this.isDev) return '画面仕様書'
      return window.SCREEN_SPEC_MD.title
    },
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style lang="scss" scoped>
.TheHeader {
  display: grid;
  grid-template-rows: 48px;
  grid-template-columns: 100px 1fr auto;
  position: relative;
  height: 48px;
  background-color: #2f6fad;
  &_MainNav {
    display: grid;
    grid-template-rows: 48px;
    grid-template-columns: 50px 50px;
    grid-column: 1 / 2;
    align-items: center;
  }
  &_IconLink {
    color: #ffffff;
    width: 50px;
    font-size: 12px;
    text-align: center;
  }
  &_PageTitle {
    display: block;
    color: #ffffff;
    font-size: 18px;
    line-height: 48px;
    padding: 0 0 0 20px;
    grid-column: 2 / 3;
  }
  &_NavForDeveloper {
    display: grid;
    grid-template-rows: 48px;
    grid-template-columns: 50px 50px;
    grid-column: 3 / 4;
    align-items: center;
  }
  &_Link {
    color: #ffffff;
    font-size: 14px;
    text-align: center;
  }
}
</style>
