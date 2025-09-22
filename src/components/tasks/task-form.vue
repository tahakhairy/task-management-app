<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { ref } from 'vue'

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

function getChip(value: string) {
  return priorities.value.find((item) => item.value === value)?.chip
}
</script>

<template>
  <form @submit.prenent="" class="space-y-3">
    <FormField fieldName="title" id="title" placeholder="Write title" label="Title" required>
      <template v-slot="{ id, placeholder, fieldName }">
        <UInput
          :placeholder
          :name="fieldName"
          :id
          :ui="{ root: 'relative inline-flex items-center !w-full' }"
        />
      </template>
    </FormField>

    <FormField
      fieldName="description"
      id="description"
      placeholder="Write description"
      label="Description"
      hint="Optional"
    >
      <template v-slot="{ id, placeholder, fieldName }">
        <UTextarea
          :name="fieldName"
          :id
          :placeholder
          :ui="{ root: 'relative inline-flex items-center !w-full' }"
        />
      </template>
    </FormField>

    <FormField fieldName="priority" id="priority" placeholder="Select priority" label="Priority">
      <template v-slot="{ id, placeholder, fieldName }">
        <USelect :name="fieldName" :id :placeholder :items="priorities" class="w-full">
          <template #leading="{ modelValue }">
            <UChip v-if="modelValue" v-bind="getChip(modelValue)" inset standalone />
          </template>
        </USelect>
      </template>
    </FormField>

    <FormField
      fieldName="category_id"
      id="category_id"
      placeholder="Select category"
      label="Category"
      required
    >
      <template v-slot="{ id, placeholder, fieldName }">
        <USelect :name="fieldName" :id :placeholder :items="priorities" class="w-full">
          <template #leading="{ modelValue }">
            <UChip v-if="modelValue" v-bind="getChip(modelValue)" inset standalone />
          </template>
        </USelect>
      </template>
    </FormField>

    <UButton loading type="submit" label="Add" class="mt-2" />
  </form>
</template>

<style scoped></style>
