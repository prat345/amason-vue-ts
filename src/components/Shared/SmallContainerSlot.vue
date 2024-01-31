<script lang="ts" setup></script>

<template>
  <div class="flex items-center justify-center">
    <div class="wrapper w-full bg-white px-10 py-6">
      <slot name="title"></slot>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 500px;
  min-height: 300px;
}
</style>
