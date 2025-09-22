<script setup lang="ts">
import type { Task } from '@/types'

defineProps<{
  task: Task
}>()
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div>
        {{ task.category_id }}
        <p class="font-medium">{{ task.title }}</p>
      </div>
    </template>

    <div class="min-h-32">{{ task.description }}</div>

    <template #footer> </template>
  </UCard>
</template>

<style scoped></style>
