<template>
  <div class="component-wrapper">
    <button @click="handleNew">点我+1</button>
    <button @click="handleCheck">查看序列</button>
    <n-drag :list="list" :height="30" :column="5" ref="dragBox">
      <template v-for="(item, index) in list">
        <n-drag-item :key="index" class="bg">
          <div class="item">{{item.title}}</div>
        </n-drag-item>
      </template>
    </n-drag>
  </div>
</template>

<script>
import { Drag, DragItem } from '@/components/drag'
export default {
  name: 'drag',
  components: {
    'n-drag': Drag,
    'n-drag-item': DragItem
  },
  data () {
    return {
      list: [
        {title: '姓名'},
        {title: '手机号'},
        {title: '总得分'},
        {title: '名次'},
        {title: '相比上月名次变动'},
        {title: '累计得分'},
        {title: '累计名次'},
        {title: '厅店'}
      ]
    }
  },
  methods: {
    handleNew() {
      this.list.push({title: '？？'})
      this.$refs.dragBox.newItem()
    },
    handleCheck() {
      console.log(this.list)
    }
  }
}
</script>

<style scoped>
.item {
  height: 100%;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  color: #0b86fa;
  padding: 0 6px;
  box-sizing: border-box;
}
</style>