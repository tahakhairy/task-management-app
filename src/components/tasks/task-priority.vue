<script setup lang="ts">
import type { Task } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  task: Task
}>()

const priorityColor = computed(() => {
  switch (props.task?.priority) {
    case 'high':
      return 'error'
    case 'medium':
      return 'warning'
    case 'low':
      return 'info'
    default:
      return 'info'
  }
})
</script>

<template>
  <div v-bind="$attrs" class="flex items-center gap-1.5">
    <UChip :color="priorityColor" size="lg" standalone inset />
    <p class="capitalize text-xs font-medium">{{ task.priority }}</p>
  </div>
</template>

<style scoped></style>
