<script setup lang="ts">
import { getTaskById, updateTask } from '@/api'
import TaskCategory from '@/components/tasks/task-category.vue'
import TaskPriority from '@/components/tasks/task-priority.vue'
import { useFetch } from '@/composables/useFetch'
import useMutate from '@/composables/useMutate'
import { useTaskActions } from '@/composables/useTaskActions'
import type { TaskFormData } from '@/types'
import type { BreadcrumbItem } from '@nuxt/ui'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const taskId = route.params.id.toString()

const { data, isLoading } = useFetch({
  queryKey: [`task/${taskId}`],
  queryFn: () => getTaskById(taskId),
})

const { openDeleteModal, openTaskModal } = useTaskActions()

const task = computed(() => data.value?.[0])

const breadcrumItems = ref<BreadcrumbItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    //@ts-ignore
    label: computed(() => task.value?.title),
    icon: 'heroicons:clipboard-document-check-solid',
  },
])

const { mutate, isPending } = useMutate({
  queryKey: [`task/${taskId}`],
  mutationKey: ['toggle-status'],
  mutationFn: (task: TaskFormData) => updateTask(taskId, task),
})

const toggleCompletion = () => {
  const { id, ...rest } = task.value!
  mutate(
    { ...rest, completed: !task.value?.completed },
    {
      onSuccess() {},
    },
  )
}
</script>

<template>
  <UContainer>
    <div class="my-6 h-[100vh-calc(100%-69px)] space-y-6">
      <UBreadcrumb :items="breadcrumItems" />

      <div v-if="isLoading">loading...</div>

      <UCard v-else variant="outline">
        <div class="flex flex-col md:flex-row gap-5">
          <div class="w-full md:w-1/3">
            <img class="rounded-lg object-contain w-full" :src="task?.image_url" alt="" />
          </div>
          <div class="w-full md:w-2/3">
            <h2 class="text-3xl font-bold">{{ task?.title }}</h2>

            <p class="text-dimmed">{{ task?.description }}</p>

            <div v-if="task?.category_id" class="flex items-center gap-2 mt-5">
              <p class="font-medium">Category:</p>
              <TaskCategory :task="task" show-icon />
            </div>

            <div v-if="task?.priority" class="flex items-center gap-2 mt-5">
              <p class="font-medium">Priority:</p>
              <TaskPriority :task="task!" class="*:text-lg *:font-medium" />
            </div>

            <p class="font-medium text-xs mt-3">Due: {{ task?.due_date ?? 'N/A' }}</p>

            <div class="mt-4 flex items-center gap-2">
              <UButton
                icon="heroicons:pencil-square-16-solid"
                size="sm"
                class="rounded-full"
                variant="outline"
                color="neutral"
                @click="openTaskModal(task)"
              />
              <UButton
                icon="heroicons:trash-16-solid"
                size="sm"
                class="rounded-full"
                variant="outline"
                color="error"
                @click="openDeleteModal(task!)"
              />
            </div>
          </div>

          <USwitch
            label="Completed"
            :modelValue="task?.completed"
            :loading="isPending"
            @change="toggleCompletion"
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped></style>
