<template>
  <div id="n-water-fall">
    <template v-for="(item, index) in imgs">
      <div class="water-fall-item" :key="index" :style="{'width': (100 / item.height * item.width) + 'px'}">
        <img :lazy-src="item.url" @load="handleLoadOk">
      </div>
    </template>
  </div>
</template>

<script>
import { imgReady } from '@/utils/util'
let timer
export default {
  data () {
    return {
      limit: 20,
      imgs: []
    }
  },
  methods: {
    getImgs (limit = 20) {
      for(let i = 0; i < limit; i++) {
        const width = Math.round(Math.random() * 300 + 200)
        const height = Math.round(width * (Math.random() * 1 + 0.5))
        this.imgs.push({
          width: width,
          height: height,
          url: `https://picsum.photos/${width}/${height}`
        })
      }
    },
    handleLoadOk (e) {
      console.log(e)
    },
    handleScroll () {
      const pageHeight = window.document.documentElement.offsetHeight
      const scrollTop = window.document.documentElement.scrollTop
      // console.log(pageHeight, scrollTop, window.innerHeight)
      const imgs = document.querySelectorAll('.water-fall-item img')
      
      imgs.forEach(item => {
        if(item.offsetTop - scrollTop < window.innerHeight) {
          if(item.getAttribute('src')) return
          item.setAttribute('src', item.getAttribute('lazy-src'))
        }
      })
      if(pageHeight - (scrollTop + window.innerHeight) < 100) {
        clearTimeout(timer)
        // timer = setTimeout(() => {
        //   console.log('loading...')
        //   this.getImgs()
        // }, 30)
      }
    }
  },
  created () {
    this.getImgs()
    imgReady('https://picsum.photos/300/400', function() {
      console.log([this])
    })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }
}
</script>

<style scoped>
#n-water-fall {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px 10px 0;
  box-sizing: border-box;
}
#n-water-fall::after {
  content: '';
  flex-grow: 999;
}
.water-fall-item {
  height: 100px;
  margin: 10px 0 0 10px;
  background: #e1e5e7;
  flex-grow: 1;
}
.water-fall-item img {
  height: 100%;
  min-width: 100%;
  object-fit: cover;
}
</style>