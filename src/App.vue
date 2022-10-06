<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

import { throttle } from 'lodash'
import { onMounted } from 'vue'

import { useAppStore } from './stores/app'

const appStore = useAppStore()

onMounted(()=> {
  window.addEventListener('resize', throttle( onResize, 10))
  onResize();
})

function onResize() {
  const root = document.documentElement
  const innerHeight: number = window.innerHeight
  root.style.setProperty('--vhpx', innerHeight.toString() + "px")
}
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    tailwind
  </h1>
  <HelloWorld :msg="appStore.message" />
</template>

<style lang="postcss">
@import './assets/style/base.pcss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
