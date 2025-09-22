<script setup lang="ts">
const props = defineProps<{
  fieldName: string
  id: string
  label: string
  placeholder: string
  required?: boolean
  hint?: string
}>()
</script>

<template>
  <UFormField class="w-full" :label :hint :required>
    <slot :field-name :id :placeholder></slot>
  </UFormField>
</template>

<style scoped></style>
