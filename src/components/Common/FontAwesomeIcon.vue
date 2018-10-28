<template>
  <FAIcon
    :icon="faIcon"
    :size="size"
    :spin="spin"
    :pulse="pulse"
  />
</template>

<script>
import { FontAwesomeIcon as FAIcon } from '@fortawesome/vue-fontawesome'
import { faSearchPlus, faSearchMinus, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'FontAwesomeIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: '1x',
    },
    spin: {
      type: Boolean,
      required: false,
      default: false,
    },
    pulse: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    faIcon() {
      switch (this.icon) {
        case 'search-plus':
          return faSearchPlus
        case 'search-minus':
          return faSearchMinus
        case 'expand-arrows-alt':
          return faExpandArrowsAlt
      }
    },
  },
  components: {
    FAIcon,
  },
}
</script>
