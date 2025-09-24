<script setup lang="ts"></script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="flex justify-between">
        <USkeleton class="h-4 w-[80px]" />
        <USkeleton class="h-4 w-[80px]" />
      </div>

      <USkeleton class="h-6 mt-4" />
    </template>

    <div class="space-y-4">
      <USkeleton class="h-[120px]" />
      <USkeleton class="h-6" />
      <USkeleton class="h-6" />
    </div>

    <template #footer>
      <USkeleton class="h-4" />
    </template>
  </UCard>
</template>

<style scoped></style>
