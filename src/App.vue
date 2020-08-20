<template>
  <div id="app">
    <div class="component-wrapper">
      <n-loading></n-loading>
    </div>
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
  </div>
</template>

<script>

import Loading from '@/components/loading'
import { Drag, DragItem } from '@/components/drag'

export default {
  name: 'App',
  components: {
    'n-loading': Loading,
    'n-drag': Drag,
    'n-drag-item': DragItem
  },
  data() {
    return {
      list: [
        {title: '姓名'},
        {title: '手机号'},
        {title: '总得分'},
        {title: '名次'},
        {title: '相比上月名次变动'},
        {title: '累计得分'},
        {title: '累计名次'},
        {title: '厅店'},
        // {title: '总部场测满意度得分'},
      ],
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

<style>
.component-wrapper {
  padding: 200px;
  margin: 20px auto;
  box-shadow: 0 0 12px rgba(51, 51, 51, .18);
}
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
