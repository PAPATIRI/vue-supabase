<script lang="ts" setup></script>
<template>
  <div>
    <h1>homepage</h1>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">go to projects 1</RouterLink>
  </div>
</template>

<style lang=""></style>
