<script lang="ts" setup>
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Homepage'
</script>
<template>
  <div>
    <h1>homepage</h1>
  </div>
</template>

<style lang=""></style>
