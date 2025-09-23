<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/global/navbar.vue'
import { useCategoryStore } from './stores/category'

const { fetchCategories } = useCategoryStore()

onMounted(async () => {
  await fetchCategories()
})
</script>

<template>
  <UApp>
    <Navbar />
    <RouterView />
  </UApp>
</template>

<style scoped></style>
