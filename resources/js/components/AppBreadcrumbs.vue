<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="breadcrumb in computedBreadcrumbs"
      :key="breadcrumb.title"
    >
      <router-link :to="breadcrumb.route">
        {{ breadcrumb.title }}
      </router-link>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { Breadcrumb } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  breadcrumbs: Breadcrumb[]
}>()

const computedBreadcrumbs = computed(() => {
  return [
    {
      title: 'Home',
      route: { name: 'home' },
    },
    ...props.breadcrumbs,
  ]
})
</script>
