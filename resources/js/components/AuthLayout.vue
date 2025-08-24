<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
      <AppLogo class="mb-6" />
      <div class="w-full bg-white rounded-lg shadow sm:max-w-md">
        <RouterView />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
</script>