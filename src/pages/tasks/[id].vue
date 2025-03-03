<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div>
    <p>task id is {{ route.params.id }}</p>
  </div>
</template>
