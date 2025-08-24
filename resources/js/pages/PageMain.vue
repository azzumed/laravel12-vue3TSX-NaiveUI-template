<template>
  <div class="flex max-w-md flex-col gap-4">
    <p>Main page!</p>
    <div>
      <NButton>Test</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageExpose } from '@/types'

defineExpose<PageExpose>({
  title: 'Home',
  breadcrumbs: [],
})
</script>
