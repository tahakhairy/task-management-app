<script setup lang="ts">
import { getAllTasks } from '@/api'
import { useFetch } from '@/composables/useFetch'
import { useTaskActions } from '@/composables/useTaskActions'

const { data: tasks, isLoading } = useFetch({
  queryKey: ['tasks'],
  queryFn: () => getAllTasks(),
})

const { openDeleteModal, openTaskModal } = useTaskActions()
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
          @view="$router.push({ name: 'taskDetails', params: { id: task.id } })"
          @edit="(task) => openTaskModal(task)"
          @delete="(task) => openDeleteModal(task)"
        />
      </div>
    </div>
  </UContainer>
</template>

<style scoped></style>
