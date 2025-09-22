<script setup lang="ts">
import TaskModal from '@/components/tasks/task-modal.vue'
import Modal from '@/components/ui/modal.vue'
import { markRaw } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

const overlay = useOverlay()

const modal = overlay.create(Modal)

async function openModal() {
  modal.open({
    title: 'Add Task',
    description: 'Add new task',
    component: markRaw(TaskModal),
    componentProps: {} as ComponentProps<typeof TaskModal>,
  })
}
</script>

<template>
  <UContainer class="h-[calc(100vh-69px)] flex flex-col justify-center items-center">
    <div class="flex justify-center items-center flex-col gap-4">
      <p class="text-default">No tasks added yet, get something done!</p>

      <UButton
        @click="openModal"
        color="primary"
        variant="solid"
        icon="heroicons:plus-circle"
        size="lg"
      >
        Add Task
      </UButton>
    </div>
    <!-- <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 my-5">
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div> -->
  </UContainer>
</template>

<style scoped></style>
