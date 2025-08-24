<template>
  <div>Logging out...</div>
</template>

<script setup lang="ts">
import { PageExpose } from '@/types'
import { onMounted } from 'vue'
import { useAuthStore } from '@/composables/useAuthStore'

defineExpose<PageExpose>({
  title: 'Logging out',
  breadcrumbs: [{
    title: 'Logging out',
    route: { name: 'logout' },
  }],
})

const authStore = useAuthStore()

onMounted(() => {
  authStore.logout()

  window.location.reload()
})
</script>
