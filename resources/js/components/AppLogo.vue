<template>
  <router-link
    :to="{ name: 'home' }"
    class="flex items-center gap-2 text-2xl font-semibold text-gray-900"
  >
<!--    <img-->
<!--      class="w-8 h-8"-->
<!--      src="../../images/Logo.png"-->
<!--      alt="Logo"-->
<!--    >-->
    <span v-show="!collapsed">{{ name }}</span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const name = import.meta.env.VITE_APP_NAME
</script>
