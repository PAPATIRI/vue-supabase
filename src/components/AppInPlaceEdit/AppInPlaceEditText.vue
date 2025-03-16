<script setup lang="ts">
const value = defineModel()

defineEmits(['commit'])
</script>
<template>
  <input
    type="text"
    v-model="value"
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    @blur="$emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
