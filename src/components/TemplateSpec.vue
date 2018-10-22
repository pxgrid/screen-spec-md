<template>
  <div id="app">
    <TheHeader
      :is-dev="true"
    />
    <Spec />
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue'
import Spec from './Spec.vue'

export default {
  name: 'app',
  components: {
    TheHeader,
    Spec,
  },
}
</script>

<style>
html {
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
html,
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
