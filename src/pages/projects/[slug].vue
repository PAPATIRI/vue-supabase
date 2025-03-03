<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div>
    <h1>project name is {{ route.params?.slug }}</h1>
  </div>
</template>
