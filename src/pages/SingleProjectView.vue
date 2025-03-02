<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div>
    <h1>project name is {{ route.params?.id }}</h1>
  </div>
</template>
