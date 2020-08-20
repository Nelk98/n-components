<template>
  <div>
    <div style="padding-bottom: 100px;">
      <vertical-water-fall
        ref="vwf"
        space="between"
      >
      </vertical-water-fall>
    </div>
    <horizontal-water-fall v-if="false"></horizontal-water-fall>
    <div id="btns">
      <button style="margin: 6px;" @click="handleNewOne(1)">插入 1 张</button>
      <button style="margin: 6px;" @click="handleNewOne(5)">插入 5 张</button>
      <button style="margin: 6px;" @click="handleNewOne(10)">插入 10 张</button>
      <button style="margin: 6px;" @click="handleNewOne(20)">插入 20 张</button>
    </div>
  </div>
</template>

<script>
import { HorizontalWaterFall, VerticalWaterFall } from '@/components/waterfall'
export default {
  name: 'waterfall',
  components: {
    HorizontalWaterFall,
    VerticalWaterFall
  },
  methods: {
    handleNewOne (count=1) {
      this.$refs.vwf.newOne(count)
    },
    handleScroll () {
      // console.log([document.getElementById('btns')])
    }
  },
  mounted () {
    console.log(window.innerHeight)
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
#btns {
  position: fixed;
  bottom: 0;
}
</style>
