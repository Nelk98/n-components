<template>
  <div class="n-drag-item">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.n-drag-item {
  /* background: #fff;
  box-shadow: 0 0 6px rgba(51, 51, 51, .18); */
  /* border-radius: 6px; */
  box-sizing: border-box;
  padding: 0 6px;
  line-height: 30px;
  color: #445566;
  font-size: 12px;
  position: absolute;
  transition: top .6s, left .6s, background-color .6s;
}
</style>