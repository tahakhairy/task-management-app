<script setup lang="ts">
import { getAllTasks } from '@/api'
import TaskModal from '@/components/tasks/task-modal.vue'
import Modal from '@/components/ui/modal.vue'
import { useFetch } from '@/composables/useFetch'
import { markRaw } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

const overlay = useOverlay()

const modal = overlay.create(Modal)

const { data: tasks, isLoading } = useFetch({
  queryKey: ['tasks'],
  queryFn: () => getAllTasks(),
})

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
  <UContainer>
    <div
      v-if="!tasks?.length && !isLoading"
      class="flex justify-center items-center flex-col gap-4"
    >
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

    <div v-else>
      <div class="flex mt-7">
        <UButton
          class="ms-auto"
          @click="openModal"
          color="primary"
          variant="solid"
          icon="heroicons:plus-circle"
          size="lg"
        >
          Add Task
        </UButton>
      </div>
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 place-items-center place-content-center my-5"
      >
        <TaskCard v-for="task in tasks" :key="task.id" :task />
      </div>
    </div>
  </UContainer>
</template>

<style scoped></style>
