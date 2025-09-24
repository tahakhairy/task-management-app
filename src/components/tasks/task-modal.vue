<script setup lang="ts">
import type { Task } from '@/types'
import TaskForm from './task-form.vue'

defineProps<{
  task?: Task
}>()
</script>

<template>
  <TaskForm :task />
</template>

<style scoped></style>
