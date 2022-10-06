<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="hello">{{ msg }}</h1>
</template>

<style scoped lang="postcss">
.hello {
  margin-top: 10mpx;
  color: var(--color-red);

  @media (--desktop) {
    margin-top: 10dpx;
  }
}
</style>
