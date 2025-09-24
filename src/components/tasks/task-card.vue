<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import type { Task } from '@/types'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'edit', task: Task): () => void
  (e: 'delete', task: Task): () => void
}>()

const { getCategoryNameById, getCategoryColorById } = storeToRefs(useCategoryStore())

const categoryBadgeColor = computed(() => getCategoryColorById.value(props.task.category_id))

const priorityColor = computed(() => {
  switch (props.task.priority) {
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
  <UCard variant="subtle">
    <template #header>
      <div class="space-y-1.5 min-h-16">
        <div v-if="task.priority" class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <UChip :color="priorityColor" size="lg" standalone inset />
            <p class="capitalize text-xs font-medium">{{ task.priority }}</p>
          </div>

          <UBadge
            size="sm"
            v-if="getCategoryNameById(task.category_id)"
            :style="{ backgroundColor: `${categoryBadgeColor}` }"
            >{{ getCategoryNameById(task.category_id) }}</UBadge
          >
        </div>

        <p class="font-bold capitalize text-sm">{{ task.title }}</p>
      </div>
    </template>

    <div class="space-y-1.5 overflow-auto min-h-[280px]">
      <img class="rounded-lg object-cover" :src="task.image_url" :alt="`${task.title}-image`" />
      <p class="text-sm text-default/80">{{ task.description }}</p>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div>
          <p class="font-medium text-xs">Due: {{ task.due_date ?? 'N/A' }}</p>
        </div>
        <div class="flex items-center gap-1.5">
          <UButton
            icon="heroicons:pencil-square-16-solid"
            size="sm"
            class="rounded-full"
            variant="outline"
            @click="emit('edit', task)"
          ></UButton>

          <UButton
            icon="heroicons:trash-16-solid"
            size="sm"
            class="rounded-full"
            variant="outline"
            color="error"
            @click="emit('delete', task)"
          ></UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<style scoped></style>
