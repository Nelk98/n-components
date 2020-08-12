<template>
  <div id="app">
    <div class="component-wrapper">
      <n-loading></n-loading>
    </div>
    <div class="component-wrapper">
      <n-drag :list="list" :height="150" ref="dragBox">
        <template v-for="(item, index) in list">
          <n-drag-item :key="index" class="bg">
            <div class="item">{{index}}</div>
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
  }
}
</script>

<style>
.component-wrapper {
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0 0 12px rgba(51, 51, 51, .18);
}
.item {
  height: 100%;
  width: 100%;
  /* background: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg') center/cover; */
}
</style>
