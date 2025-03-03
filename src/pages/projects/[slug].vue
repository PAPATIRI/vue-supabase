<script lang="ts" setup>
const route = useRoute()
</script>
<template>
  <div>
    <h1>project name is {{ route.params?.slug }}</h1>
  </div>
</template>
