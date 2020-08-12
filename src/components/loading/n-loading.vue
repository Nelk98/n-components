<template>
  <div class="n-loading">
    <div class="loading-tip">
      <div class="loading-dot-1"></div>
      <div class="loading-dot-2"></div>
      <div class="loading-dot-3"></div>
      <div class="loading-dot-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NLoading'
}
</script>

<style scoped>
.n-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-tip {
  height: 100px;
  width: 100px;
  position: relative;
  animation: loading-rotate linear 6s infinite;
}
.loading-dot-1,
.loading-dot-2,
.loading-dot-3,
.loading-dot-4 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.loading-dot-1 {
  background: #E3F2FD;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 1;
  animation-name: gather-1;
}
.loading-dot-2 {
  background: #BAD9FF;
  top: 50%;
  right: 0;
  transform: translate3d(0, -50%, 0);
  animation-name: gather-2;
  z-index: 2;
}
.loading-dot-3 {
  background: #4494F9;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  animation-name: gather-3;
  z-index: 3;
}
.loading-dot-4 {
  background: #2E7DE0;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 0);
  animation-name: gather-4;
  z-index: 4;
}
@keyframes loading-rotate {
  0% {
    transform: rotate(0);
  }
  12.5% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  37.5% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62.5% {
    transform: rotate(270deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87.5% {
    transform: rotate(360deg);
  }
  99.99% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes gather-1 {
  0% {

  }
  50% {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);      
  }
  100% {}
}
@keyframes gather-2 {
  0% {

  }
  50% {
    top: 50%;
    right: 50%;
    transform: translate3d(50%, -50%, 0);      
  }
  100% {}
}
@keyframes gather-3 {
  0% {

  }
  50% {
    bottom: 50%;
    left: 50%;
    transform: translate3d(-50%, 50%, 0);      
  }
  100% {}
}
@keyframes gather-4 {
  0% {

  }
  50% {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);      
  }
  100% {}
}
</style>