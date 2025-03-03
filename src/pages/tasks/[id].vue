<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <div>
    <p>task id is {{ route.params.id }}</p>
  </div>
</template>
