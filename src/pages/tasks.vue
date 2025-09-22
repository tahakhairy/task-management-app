<script setup lang="ts">
import { getAllTasks } from '@/api'
import TaskModal from '@/components/tasks/task-modal.vue'
import Modal from '@/components/ui/modal.vue'
import type { Task } from '@/types'
import { markRaw, onMounted, ref } from 'vue'
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

const tasks = ref<Task[]>([])

onMounted(async () => {
  const data = await getAllTasks()
  console.log(data)

  tasks.value = data
})
</script>

<template>
  <UContainer>
    <div v-if="!tasks.length" class="flex justify-center items-center flex-col gap-4">
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
    <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5">
      <TaskCard v-for="task in tasks" :key="task.id" :task />
    </div>
  </UContainer>
</template>

<style scoped></style>
