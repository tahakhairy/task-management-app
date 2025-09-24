<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import type { Task } from '@/types'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { task, showIcon } = defineProps<{
  task: Task
  showIcon?: boolean
}>()

const { getCategoryPropertyById } = storeToRefs(useCategoryStore())

const categoryBadgeColor = computed(() =>
  getCategoryPropertyById.value(task?.category_id!, 'color'),
)
</script>

<template>
  <UBadge
    v-if="getCategoryPropertyById(task?.category_id, 'name')"
    :avatar="
      showIcon
        ? {
            src: getCategoryPropertyById(task?.category_id, 'icon_url') as string,
            style: 'backgroundColor: #000',
          }
        : undefined
    "
    size="md"
    :style="{ backgroundColor: `${categoryBadgeColor}` }"
  >
    {{ getCategoryPropertyById(task?.category_id, 'name') }}
  </UBadge>
</template>

<style scoped></style>
