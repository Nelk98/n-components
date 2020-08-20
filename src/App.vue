<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {}
  }
}
</script>

<style>
.component-wrapper {
  margin: 20px auto;
  box-shadow: 0 0 12px rgba(51, 51, 51, .18);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
}
</style>
