<template>
  <div id="n-water-fall" ref="waterfall">
    <template v-for="(item, index) in list">
      <div
        class="water-fall-item lazy-load"
        :key="index"
        :style="{width: itemWidth + 'px'}"
        :lazy-src="item.url"
        :height="item.height"
        :width="item.width"
      >
        <img :src="item.url">
      </div>
    </template>
  </div>
</template>

<script>
import { imgReady } from '@/utils/util'
export default {
  props: {
    col: {
      type: Number,
      default: 3
    },
    gap: {
      type: Number,
      default: 10
    },
    space: { // around || between
      type: String,
      default: 'around'
    },
    padding: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      list: [],
      limit: 20,
      itemWidth: 0,
      current: 0,
      heightArr: []
    }
  },
  methods: {
    getImgs () {
      for(let i = 0; i < this.limit; i++) {
        this.newOne()
      }
    },
    initLayOut () {
      // 获取所有瀑布流节点
      const items = [].slice.call(document.getElementsByClassName('water-fall-item'))
      // 计算盒子宽度
      const boxWidth = this.$refs.waterfall.offsetWidth
      if(this.space === 'between') {
        // 计算节点宽度 （无外边距）
        this.itemWidth = (boxWidth - (this.col - 1) * this.gap) / this.col
      } else {
        // 计算节点宽度 （有外边距）
        this.itemWidth = (boxWidth - (this.col + 1) * this.gap) / this.col
      }

      // 从上次截止位置开始获取新增节点
      const op_items = items.slice(this.current)
      console.log(op_items)
      // 遍历所有新增节点
      op_items.forEach(item => {
        // 获取新增节点在瀑布流队列中的索引，删除时备用
        // const index = items.indexOf(item)
        const url = item.getAttribute('lazy-src')
        const that = this
        // 预计算图片尺寸
        const oriWidth = item.getAttribute('width')
        const oriHeight = item.getAttribute('height')
        if (oriWidth && oriHeight) {
          // 按比例计算高度
          const height = (that.itemWidth - this.padding * 2) / oriWidth * oriHeight + this.padding * 2
          item.style.height = height + 'px'
          // 处理定位
          that.handlePosition(item, height)
          return
        }
        imgReady(url, function() {
          const height = (that.itemWidth - this.padding * 2) / this.width * this.height + this.padding * 2
          item.style.height = height + 'px'
          that.handlePosition(item, height)
        })
      })
      this.current += op_items.length
    },
    handlePosition (target, height) {
      const whichCol = this.heightArr.indexOf(Math.min(...this.heightArr))
      let top, left
      if (this.space === 'between') {
        // 无外边距
        top = this.heightArr[whichCol]
        left = whichCol * (this.itemWidth + this.gap)
      } else {
        // 有外边距
        top = this.heightArr[whichCol] + this.gap
        left = whichCol * (this.itemWidth + this.gap) + this.gap
      }
      target.style.opacity = '1'
      target.style.top = top + 'px'
      target.style.left = left + 'px'
      this.heightArr[whichCol] = this.heightArr[whichCol] + height + this.gap
      if (this.space === 'between') {
        document.getElementById('n-water-fall').style.height = Math.max(...this.heightArr) + 'px'
      } else {
        document.getElementById('n-water-fall').style.height = Math.max(...this.heightArr) + this.gap + 'px'
      }
      setTimeout(() => {
        target.className = 'water-fall-item'
      }, 1000)
    },
    newOne (count) {
      for(let i = 0; i < count; i++) {
        const width = Math.round(Math.random() * 300 + 200)
        const height = Math.round(width * (Math.random() * 1 + 0.5))
        this.list.push({
          width: width,
          height: height,
          url: `https://picsum.photos/${width}/${height}`
        })
      }
      this.$nextTick(this.initLayOut)
    }
  },
  created () {
    this.heightArr = new Array(this.col).fill(0)
    console.log('heightArr', this.heightArr)
  }
}
</script>

<style scoped>
#n-water-fall {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.water-fall-item {
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  height: 200px;
  /* top: calc(100% + 100vh); */
  top: 100%;
  left: 0;
  transition: top 1s, left 1s;
  /* padding: 10px; */
  border-radius: 4px;
  box-shadow: 0 0px 6px 1px rgba(51, 51, 51, .18);
  opacity: 0;
}
.water-fall-item:nth-child(odd) {
  left: 0;
}
.water-fall-item:nth-child(even) {
  left: 50%;
}
.water-fall-item img {
  width: 100%;
}
</style>