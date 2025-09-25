<script setup lang="ts">
import { useToggleTaskStatus } from '@/composables/useToggleTaskStatus'
import { useCategoryStore } from '@/stores/category'
import type { Task } from '@/types'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import TaskPriority from './task-priority.vue'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'edit', task: Task): () => void
  (e: 'delete', task: Task): () => void
  (e: 'view'): () => void
}>()

const { isPending, toggleCompletion } = useToggleTaskStatus()

const { getCategoryPropertyById } = storeToRefs(useCategoryStore())

const categoryBadgeColor = computed(() =>
  getCategoryPropertyById.value(props.task.category_id, 'color'),
)
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="space-y-1.5 min-h-16">
        <div v-if="task.priority" class="flex items-center justify-between">
          <TaskPriority :task />

          <UBadge
            size="sm"
            v-if="getCategoryPropertyById(task.category_id, 'name')"
            :style="{ backgroundColor: `${categoryBadgeColor}` }"
            >{{ getCategoryPropertyById(task.category_id, 'name') }}</UBadge
          >
        </div>

        <p class="font-bold capitalize text-sm">{{ task.title }}</p>
      </div>
    </template>

    <div class="space-y-1.5 overflow-auto min-h-[280px] flex flex-col gap-2">
      <img class="rounded-lg object-cover" :src="task.image_url" :alt="`${task.title}-image`" />
      <p class="text-sm text-default/80">{{ task.description }}</p>

      <div class="mt-auto">
        <USwitch
          label="Completed"
          :modelValue="task?.completed"
          :loading="isPending"
          @change="toggleCompletion(task)"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div>
          <p class="font-medium text-xs">Due: {{ task.due_date ?? 'N/A' }}</p>
        </div>
        <div class="flex items-center gap-1.5">
          <UButton
            icon="heroicons:eye-16-solid"
            size="sm"
            class="rounded-full"
            variant="outline"
            @click="emit('view')"
          />

          <UButton
            icon="heroicons:pencil-square-16-solid"
            size="sm"
            class="rounded-full"
            variant="outline"
            color="neutral"
            @click="emit('edit', task)"
          />

          <UButton
            icon="heroicons:trash-16-solid"
            size="sm"
            class="rounded-full"
            variant="outline"
            color="error"
            @click="emit('delete', task)"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<style scoped></style>
