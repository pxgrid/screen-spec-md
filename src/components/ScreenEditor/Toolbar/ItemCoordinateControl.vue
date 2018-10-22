<template>
  <div class="ItemCoordinateControl">
    <div>
      <a>
        {{ coordinateKey }}
      </a>
    </div>
    <div>
      <input
        :value="coordinateValue"
        class=""
        type="number"
        min="0"
        max="10000"
        @change="onChange($event)"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const LOOKUP = { x: 0, y: 1, w: 2, h: 3 }
export default {
  name: 'ItemCoordinateControl',
  props: {
    coordinate: {
      type: Object,
      required: true,
    },
    coordinateKey: {
      // 'x' or 'y' or 'w' or 'h'
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      editScreen: 'editScreen',
      coordinates: 'coordinates',
    }),
    coordinateValue() {
      const selectedItem = this.editScreen.selectedItem
      const isValid = this.coordinates.length && typeof selectedItem === 'number'
      if (!isValid) {
        return ''
      }
      const coordinateIndex = LOOKUP[this.coordinateKey]
      // console.log(
      //   'coordinates',
      //   this.coordinates,
      //   'selectedItem',
      //   selectedItem,
      //   'coordinateIndex',
      //   coordinateIndex,
      // )
      // return ''
      return this.coordinates[selectedItem][coordinateIndex]
    },
  },
  methods: {
    onChange(e) {
      console.log('this.coordinate', this.coordinate)
      const { key, selectedItem, coords, coordsAction } = this.coordinate
      if (selectedItem === null) {
        e.preventDefault()
        return
      }
      const val = e.target.value | 0
      let coordsClone = coords[selectedItem].concat()

      coordsClone[LOOKUP[target]] = val

      coordsAction(selectedItem, coordsClone)
      this.setState({ val: val })
    },
  },
}
</script>

<style lang="scss" scoped>
.ItemCoordinateControl {
  display: grid;
  grid-template-columns: 20px 1fr;
}
</style>
