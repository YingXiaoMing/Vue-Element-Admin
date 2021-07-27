<template>
  <div class="app-container documentation-container">
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
      @layout-updated="layoutUpdatedEvent"
    >

      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :class="item.className"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
      >
        <big-menus v-if="item.comp === 'BigMenus'" ref="BigMenusRef" />
        <b-ig-times v-if="item.comp === 'BIgTimes'" ref="BIgTimesRef" />
        <b-ig-messages v-if="item.comp === 'BIgMessages'" ref="BIgMessagesRef" />
        <b-ig-charts v-if="item.comp === 'BIgCharts'" ref="BIgChartsRef" />
        <b-ig-analyses v-if="item.comp === 'BIgAnalyses'" ref="BIgAnalysesRef" />
        <b-ig-charts3 v-if="item.comp === 'BIgCharts3'" ref="BIgCharts3Ref" />
        <b-ig-charts4 v-if="item.comp === 'BIgCharts4'" ref="BIgCharts4Ref" />
        <b-ig-charts5 v-if="item.comp === 'BIgCharts5'" ref="BIgCharts5Ref" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import BigMenus from './BIgMenus'
import BIgTimes from './BIgTimes'
import BIgMessages from './BIgMessages'
import BIgCharts from './BIgCharts'
import BIgAnalyses from './BIgAnalyses'
import BIgCharts3 from './BIgCharts3'
import BIgCharts4 from './BIgCharts4'
import BIgCharts5 from './BIgCharts5'
export default {
  name: 'Home',
  components: {
    BigMenus,
    BIgTimes,
    BIgMessages,
    BIgCharts,
    BIgAnalyses,
    BIgCharts3,
    BIgCharts4,
    BIgCharts5
  },
  data() {
    return {
      layout: [
        { 'x': 0, 'y': 0, 'w': 12, 'h': 20, 'i': '0', comp: 'BigMenus', className: '' },
        { 'x': 0, 'y': 8, 'w': 4, 'h': 8, 'i': '1', comp: 'BIgTimes', className: '' },
        { 'x': 0, 'y': 8, 'w': 6, 'h': 12, 'i': '2', comp: 'BIgMessages', className: 'myMessages' },
        { 'x': 6, 'y': 8, 'w': 6, 'h': 12, 'i': '3', comp: 'BIgAnalyses', className: 'myAnalyses' },
        { 'x': 0, 'y': 20, 'w': 6, 'h': 12, 'i': '4', comp: 'BIgCharts', className: 'myBIgCharts' },
        { 'x': 6, 'y': 20, 'w': 6, 'h': 12, 'i': '5', comp: 'BIgCharts3', className: 'myBIgCharts3' },
        { 'x': 0, 'y': 32, 'w': 6, 'h': 12, 'i': '6', comp: 'BIgCharts4', className: 'myBIgCharts4' },
        { 'x': 6, 'y': 32, 'w': 6, 'h': 12, 'i': '7', comp: 'BIgCharts5', className: 'myBIgCharts5' }
      ]
    }
  },
  methods: {
    layoutCreatedEvent() {

    },
    layoutBeforeMountEvent() {

    },
    layoutMountedEvent() {

    },
    layoutReadyEvent() {

    },
    layoutUpdatedEvent() {

    },
    resizeEvent() {

    },
    moveEvent() {

    },
    resizedEvent(data) {
      switch (data) {
        case '0':
          break
        case '1':
          break
        case '2':
          break
        case '3':
          break
        case '4':
          this.$refs.BIgChartsRef.resize()
          break
      }
    },
    containerResizedEvent() {

    },
    movedEvent() {

    }
  }
}
</script>

<style scoped>
  .documentation-container {
    margin: 5px;
  }
  .vue-grid-item {
    background: #efefef;
  }
  .wh_container ::v-deep .wh_content_all {
    background-color: #009688 !important;
  }
  .myMessages {
    background: #1b1b1b
  }
  .myAnalyses {
    background: #0e2147
  }
  .myBIgCharts {
    background: #224e71
  }
  .myBIgCharts3 {
    background: #323a5e
  }
  .myBIgCharts4 {
    background: #031f2d
  }
  .myBIgCharts5 {
    background: #0e2147
  }
</style>
