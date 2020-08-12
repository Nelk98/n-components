<template>
  <div class="box" ref="dragBox">
    <slot></slot>
    <!-- <template v-for="item in list">
      <div class="drag-item" :key="item.index" @mousedown.stop="down(item.index, $event)">{{item.title}}</div>
    </template> -->
  </div>
</template>

<script>
let row, itemWidth, innerX, innerY, outerX, outerY, outerTop, outerLeft, right, bottom
let timer, initTimer
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    column: {
      type: [Number, String],
      default: 3
    },
    height: {
      type: Number,
      default: 30
    },
    gap: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      target: null,
      target_index: null,
      isDrag: false,
      isRelease: true,
    }
  },
  methods: {
    down(index, event) {
      console.log(event)
      ;[innerX, innerY] = [event.offsetX, event.offsetY]
      this.target_index = index
      console.log('从', this.target_index, '出发')
      // let el = event.srcElement ? event.srcElement : event.target
      let i = this.list.findIndex(item => item.index == index)
      let el = [].slice.call(this.$refs.dragBox.children)[i]
      this.target = el
      el.style.zIndex = 999
      el.style.transition = 'none'
      el.style.cursor = 'move'
      this.isDrag = true
      this.isRelease = false
      document.addEventListener('mousemove', this.move)
      document.addEventListener('mouseup', this.up)
    },
    move(event) {
      [outerX, outerY] = [event.clientX - outerLeft, Math.abs(event.clientY) - outerTop]
      let top = outerY - innerY
      top = top > 0 ? top : 0
      top = top > bottom ? bottom : top
      let left = outerX - innerX
      left = left > 0 ? left : 0
      left = left > right ? right : left
      this.target.style.top = top + 'px'
      this.target.style.left = left + 'px'
      let [centerX, centerY] = [Math.round(left + 0.5 * itemWidth), Math.round(top + 0.5 * this.height)]
    
      let y = Math.floor(centerY / (this.height + this.gap))
      let x = Math.floor(centerX / (itemWidth + this.gap))
      let index = y * this.column + x
      clearTimeout(timer)
      timer = setTimeout (() => {
        // console.log(row, x, y)
        // console.log('到', index, '去')
        let from = this.target_index
        let to = index
        to = to > this.list.length - 1 ? this.list.length -1 : to //防止拖拽到空白位置
        let min = Math.min(from , to)
        let max = Math.max(from, to)
        this.list.forEach(item => {
          if(item.index == from) {
            item.index = to
            this.target_index = to //改变出发点
            if(from > to) console.log('from 前进')
            else if (from < to) console.log('from 后退')
            else return console.log('位置没发生变化')
          } 
          else if (item.index == to) {
            if(to > from) {
              // console.log('to 前进')
              item.index--
            }
            else {
              // console.log('to 后退')
              item.index++
            }
          } 
          else if ( item.index < min || item.index > max) {
            // console.log(item.index, '不变')
          }
          else if ( item.index > min && item.index < from) {
            // console.log(item.index, '后退')
            item.index++
          }
          else if ( item.index < max) {
            // console.log(item.index, '前进')
            item.index--
          }
        })
        this.Animate()
      }, 30)
    },
    up() {
      document.removeEventListener('mousemove', this.move)
      document.removeEventListener('mouseup', this.up)
      this.isDrag = false
      console.log('释放了')
      this.release()
      this.target.style.zIndex = 0
      this.target.style.transition = ''
      // this.target.style.background = ''
      this.target.style.cursor = 'default'
    },
    Animate() {
      let children = [].slice.call(this.$refs.dragBox.children)
      this.list.forEach((item, i) => {
        if(item.index == this.target_index && !this.isRelease) return //没有释放当前拖拽 不发生位置变换
        let el = children[i]
        let index = item.index
        let y = Math.ceil((index + 1) / this.column) - 1
        let x = index % this.column
        let top = this.gap * (y + 1) + this.height * y
        let left = this.gap * (x + 1) + itemWidth * x
        el.style.top = top + 'px'
        el.style.left = left + 'px'
      })
      // this.list.forEach((item, index) => {
      //   console.log(index, item.title, item.index)
      // })
    },
    release() {
      this.isRelease = true
      let children = [].slice.call(this.$refs.dragBox.children)
      for(let i in this.list) {
        if(this.list[i].index == this.target_index) {
          let el = children[i]
          let index = this.target_index
          let y = Math.ceil((index + 1) / this.column) - 1
          let x = index % this.column
          let top = this.gap * (y + 1) + this.height * y
          let left = this.gap * (x + 1) + itemWidth * x
          el.style.top = top + 'px'
          el.style.left = left + 'px'
          break
        }
      }
    },
    initLayout() {
      outerTop = this.$refs.dragBox.offsetTop
      outerLeft = this.$refs.dragBox.offsetLeft
      let boxWidth = this.$refs.dragBox.clientWidth //盒子宽度
      row = Math.ceil(this.list.length / this.column) //至少多少行
      let boxHeight = row * this.height + (row + 1) * this.gap //盒子高度

      itemWidth = ( boxWidth - this.gap * (this.column + 1) ) / this.column //item的宽度
      this.$refs.dragBox.style.height = boxHeight + 'px'

      right = boxWidth - itemWidth //与盒子右边界为 0 时 的 left 值
      bottom = boxHeight - this.height //与盒子下边界为 0 时 的 top 值

      let children = [].slice.call(this.$refs.dragBox.children) 
      children.forEach((el, index) => {
        el.addEventListener('mousedown', (e) => {
          e.stopPropagation()
          this.down(this.list[index].index, e)
        })
        el.style.width = itemWidth + 'px'
        let y = Math.ceil((index + 1) / this.column) - 1
        let x = index % this.column
        let top = this.gap * (y + 1) + this.height * y
        let left = this.gap * (x + 1) + itemWidth * x
        el.style.height = this.height + 'px'
        el.style.lineHeight = this.height + 'px'
        el.style.top = top + 'px'
        el.style.left = left + 'px'
      })
    },
    resize() {
      if(initTimer) clearTimeout(initTimer)
      initTimer = setTimeout(this.initLayout, 30)
    }
  },
  created() {
    this.list.forEach((item, index) => {
      item.index = index
    })
  },
  mounted() {
    this.initLayout()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 6px rgba(51, 51, 51, .18);
  display: flex;
  flex-wrap: wrap;
  border-radius: 12px;
  position: relative;
}
.drag-item {
  /* width: calc((100% - 10px * 4) / 3); */
  height: 30px;
  background: #fff;
  box-shadow: 0 0 6px rgba(51, 51, 51, .18);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 0 6px;
  line-height: 30px;
  color: #445566;
  font-size: 12px;
  position: absolute;
  text-align: center;
  transition: top .6s, left .6s, background-color .6s;
}
/* .drag-item::after {
  line-height: initial;
  content: attr(index);
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-6px, -6px, 0);
  background: red;
  color: #fff;
  opacity: .5;
} */
</style>