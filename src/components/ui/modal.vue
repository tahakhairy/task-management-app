<script setup lang="ts">
import type { Component } from 'vue'
import type { ComponentEmit, ComponentProps } from 'vue-component-type-helpers'

defineProps<{
  title?: string
  description?: string
  component: Component
  componentProps?: ComponentProps<Component>
  componentEmits?: ComponentEmit<Component>
}>()
</script>

<template>
  <UModal :dismissible="false" :title :description>
    <template #body>
      <div class="w-full">
        <Component :is="component" v-bind="componentProps ?? {}" v-on="componentEmits ?? {}" />
      </div>
    </template>
  </UModal>
</template>

<style scoped></style>
