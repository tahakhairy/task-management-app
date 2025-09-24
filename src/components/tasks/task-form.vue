<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'
import { useCategoryStore } from '@/stores/category'
import type { Task, TaskFormData } from '@/types'
import { CalendarDate } from '@internationalized/date'
import type { SelectItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import DatePicker from '../ui/form/date-picker.vue'

const props = defineProps<{
  task?: Task
}>()

const priorities = ref([
  {
    label: 'Low',
    value: 'low',
    chip: {
      color: 'info',
    },
  },
  {
    label: 'Medium',
    value: 'medium',
    chip: {
      color: 'warning',
    },
  },
  {
    label: 'High',
    value: 'high',
    chip: {
      color: 'error',
    },
  },
] satisfies SelectItem[])

const { categories } = storeToRefs(useCategoryStore())

const categoriesList = computed(() =>
  categories.value?.map((category) => ({
    label: category.name,
    value: category.id,
  })),
)

const getTaskDate = computed(() => {
  const date = props.task?.due_date?.split('-').map((value) => Number(value))
  if (!date?.length) return
  return new CalendarDate(date[0], date[1], date[2])
})

const state = reactive<TaskFormData>({
  title: props.task?.title || undefined,
  description: props.task?.description || undefined,
  priority: props.task?.priority || undefined,
  category_id: props.task?.category_id || undefined,
  image_url: props.task?.image_url || undefined,
  //@ts-ignore
  due_date: getTaskDate.value || undefined,
})

function getChip(value: string) {
  return priorities.value.find((item) => item.value === value)?.chip
}

const { onSubmit, schema, isPending } = useTasks(props.task!)
</script>

<template>
  <UForm :state :schema @submit="onSubmit" class="space-y-3">
    <UFormField name="title" id="title" label="Title" required>
      <UInput
        placeholder="Write title"
        :ui="{ root: 'relative inline-flex items-center !w-full' }"
        v-model="state.title"
      />
    </UFormField>

    <UFormField name="description" id="description" label="Description" hint="Optional">
      <UTextarea
        placeholder="Write description"
        :ui="{ root: 'relative inline-flex items-center !w-full' }"
        v-model="state.description"
      />
    </UFormField>

    <UFormField name="priority" id="priority" label="Priority">
      <USelect
        placeholder="Select priority"
        :items="priorities"
        class="w-full"
        v-model="state.priority"
      >
        <template #leading="{ modelValue }">
          <UChip v-if="modelValue" v-bind="getChip(modelValue)" inset standalone />
        </template>
      </USelect>
    </UFormField>

    <UFormField name="category_id" id="category_id" label="Category" required>
      <USelect
        placeholder="Select category"
        :items="categoriesList"
        class="w-full"
        v-model="state.category_id"
      >
      </USelect>
    </UFormField>

    <UFormField name="image_url" id="image_url" label="Image URL" hint="Optional">
      <UInput
        placeholder="Enter Image URL"
        :ui="{ root: 'relative inline-flex items-center !w-full' }"
        v-model="state.image_url"
      />
    </UFormField>

    <UFormField name="due_date" id="due_date" label="Due Date" hint="Optional">
      <!-- @vue-ignore -->
      <DatePicker v-model:value="state.due_date" />
    </UFormField>

    <UButton type="submit" :label="task ? 'Update' : 'Add'" class="mt-2" :loading="isPending" />
  </UForm>
</template>

<style scoped></style>
