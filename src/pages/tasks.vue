<script setup lang="ts">
import { getAllTasks } from '@/api'
import TaskDeleteModal from '@/components/tasks/task-delete-modal.vue'
import TaskModal from '@/components/tasks/task-modal.vue'
import Modal from '@/components/ui/modal.vue'
import { useFetch } from '@/composables/useFetch'
import type { Task } from '@/types'
import { markRaw } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

const overlay = useOverlay()

const modal = overlay.create(Modal)

const { data: tasks, isLoading } = useFetch({
  queryKey: ['tasks'],
  queryFn: () => getAllTasks(),
})

function openTaskModal(task?: Task) {
  modal.open({
    title: `${task ? 'Update' : 'Add'} Task`,
    description: `${task ? 'Update current opened' : 'Add new'} task`,
    component: markRaw(TaskModal),
    componentProps: {
      task,
    } as ComponentProps<typeof TaskModal>,
  })
}

function openDeleteModal(task: Task) {
  modal.open({
    title: `Delete ${task.title}`,
    component: markRaw(TaskDeleteModal),
    componentProps: {
      taskId: task.id,
    } as ComponentProps<typeof TaskDeleteModal>,
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
        @click="() => openTaskModal()"
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
          @click="() => openTaskModal()"
          color="primary"
          variant="solid"
          icon="heroicons:plus-circle"
          size="lg"
        >
          Add Task
        </UButton>
      </div>

      <div v-if="isLoading" class="max-w-3xs">
        <TaskSkeleton />
      </div>
      <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 my-5">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task
          @edit="(task) => openTaskModal(task)"
          @delete="(task) => openDeleteModal(task)"
        />
      </div>
    </div>
  </UContainer>
</template>

<style scoped></style>
