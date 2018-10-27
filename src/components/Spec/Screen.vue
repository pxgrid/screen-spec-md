<template>
  <div
    :style="{ width: width }"
    class="Screen"
  >
    <nav class="Screen_Tools">
      <ScreenToolbar
        :is-screen-fit="isScreenFit"
        :zoom-value="zoomValue"
        @zoomFit="onZoomFit()"
        @zoomIn="onZoomIn()"
        @zoomOut="onZoomOut()"
        @toggleHighlight="onToggleHighlight()"
      />
      <div>
        <span
          v-if="isDev"
        >
          <a

            @click.prevent="openDevEditor()"
          >
            edit
          </a>
        </span>
        <span
          v-else
        >
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          <a
            v-pre
            target="_blank"
            href="/__image-canvas.html?src={{{screen}}}"
          >
            edit
          </a>
        </span>
      </div>
    </nav>
    <div
      class="Screen_Main"
    >
      <div
        v-if="isDev"
        class="Screen_MainInner"
      >
        <div
          ref="svgWrapper"
          :class="{'UISP-Screen--fit': isScreenFit, 'UISP-Screen--highlight': isHighlight}"
          class="UISP-Screen"
          v-html="dummySvgCanvasHtml"
        />
      </div>
      <div
        v-else
        class="Screen_MainInner"
      >
        <div
          ref="svgWrapper"
          :class="{'UISP-Screen--fit': isScreenFit, 'UISP-Screen--highlight': isHighlight}"
          class="UISP-Screen"
        >
          <div
            v-pre
          >
            <!-- eslint-disable-next-line vue/no-parsing-error -->
            {{{ svgCanvas }}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dummySvgCanvasHtml from './dummies/dummySvgCanvas.html'
import ScreenToolbar from './Screen/ScreenToolbar.vue'

const ZOOM_MAX = 200
const ZOOM_MIN = 25

export default {
  name: 'Screen',
  components: {
    ScreenToolbar: ScreenToolbar,
  },
  props: {
    isDev: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isScreenFit: true,
      isHighlight: true,
      zoomValue: 100,
    }
  },
  computed: {
    ...mapGetters({
      filenameWithCoordinates: 'filenameWithCoordinates',
    }),
    editorUrlQuery() {
      return `?src=${this.filenameWithCoordinates}`
    },
    dummySvgCanvasHtml() {
      return dummySvgCanvasHtml
    },
  },
  methods: {
    openDevEditor() {
      const url = '/screen-editor'
      const query =
        '/img/dummies/dummy-svg-image.png&highlight=[[107,84,1549,90],[121,185,203,62],[124,260,264,77],[127,364,157,56],[107,545,1551,91],[121,663,193,60],[112,748,634,105],[122,910,152,55]]'
      window.open(url + `?src=${query}`, 'EDT-Editor')
    },
    onZoomFit() {
      const svgRoot = this._getSVGRootRef()
      svgRoot.removeAttribute('style')
      this.isScreenFit = !this.isScreenFit
    },
    onZoomIn() {
      if (this.isScreenFit) return
      this.zoomValue = Math.min(this.zoomValue + 25, ZOOM_MAX) || 0
      this._setSVGSize()
    },
    onZoomOut() {
      if (this.isScreenFit) return
      this.zoomValue = Math.max(this.zoomValue - 25, ZOOM_MIN) || 0
      this._setSVGSize()
    },
    onToggleHighlight() {
      this.isHighlight = !this.isHighlight
    },
    _removeZoomClass() {},
    _getSVGRootRef() {
      return this.$refs['svgWrapper'].firstChild
    },
    _setSVGSize() {
      const svgRoot = this._getSVGRootRef()
      const svgRootSize = {
        width: svgRoot.getAttribute('width'),
        height: svgRoot.getAttribute('height'),
      }
      svgRoot.style.width = svgRootSize.width * this.zoomValue * 0.01
      svgRoot.style.height = svgRootSize.height * this.zoomValue * 0.01
    },
  },
}
</script>

<style lang="scss" scoped>
.Screen {
  flex-direction: column;
  width: 50%;
  &_Tools {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 30px;
    background-color: #eeeeee;
    font-size: 0.9rem;
  }
  &_Magnification {
    background-color: #dddddd;
  }
  &_Main {
    height: calc(100vh - 48px - 30px); // 30pxはScreen_Toolsクラスの高さ
    position: relative;
    flex-grow: 1;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAF0lEQVR4AWP4DwVvoWCgBGAMmMQACQAAuK72AWHjK4wAAAAASUVORK5CYII=);
  }
  &_MainInner {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
  }
  &_SVGWrapper {
    display: inline-block;
    &._fit {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
    }
  }
}
</style>
<style lang="scss">
/* ==========================================================================
   Section comment block
   ========================================================================== */
/* Sub-section comment block
   ========================================================================== */
/* Basic comment */
.UISP-Screen {
  display: inline-block;
  padding: 20px;
}

.UISP-Screen svg.UISP-Screen__svgRoot {
  display: block;
  -webkit-transition: width 0.2s, height 0.2s;
  transition: width 0.2s, height 0.2s;
}

.UISP-Screen--fit {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0;
}

.UISP-Screen--fit svg.UISP-Screen__svgRoot {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  max-height: calc(100vh - 48px - 30px); // 30pxはScreen_Toolsクラスの高さ
  margin: 0;
  padding: 0;
}
.UISP-Screen--highlight {
  .Screen_Highlight {
    display: inline;
  }
}
</style>
<style>
.Screen_Image {
}
.Screen_Highlight {
  display: none;
}
.Screen_Highlight_Fill {
  stroke: red;
  stroke-width: 2;
  fill: red;
  fill-opacity: 0.25;
}
.Screen_Highlight_Outline {
  stroke: #fff;
  stroke-width: 2;
  fill: none;
}
.Screen_Highlight_Label {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 36px;
  stroke: #fff;
  stroke-width: 1;
  fill: red;
}
</style>
