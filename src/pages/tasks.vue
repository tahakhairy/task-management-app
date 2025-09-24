<script setup lang="ts">
import { getAllTasks } from '@/api'
import { useFetch } from '@/composables/useFetch'
import { useTaskActions } from '@/composables/useTaskActions'
import { useCategoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const categoryFilter = ref()
const offset = ref(0)

const { data: tasks, isLoading } = useFetch({
  queryKey: ['tasks', categoryFilter, offset],
  queryFn: () =>
    getAllTasks(
      categoryFilter.value && categoryFilter.value !== 'all'
        ? `eq.${categoryFilter.value}`
        : undefined,
      offset.value,
    ),
})

const { openDeleteModal, openTaskModal } = useTaskActions()

const { categories } = storeToRefs(useCategoryStore())

const categoriesList = computed(() => {
  if (!categories.value?.length) return []

  const allCategories = categories.value?.map((category) => ({
    label: category.name,
    value: `${category.id}`,
  }))

  return [{ label: 'All', value: 'all' }, ...allCategories]
})

function nextPage() {
  offset.value += 10
}

function pervPage() {
  offset.value -= 10
}
</script>

<template>
  <UContainer class="flex flex-col">
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
      <div class="flex mt-7 items-center">
        <div class="flex items-center gap-2">
          <UIcon name="heroicons:funnel-16-solid" class="size-5 text-primary" />
          <UFormField class="w-[200px]" name="category_id" id="category_id">
            <USelect
              placeholder="Filter by category"
              :items="categoriesList"
              class="w-full"
              v-model="categoryFilter"
            >
            </USelect>
          </UFormField>
        </div>
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

    <div class="flex items-center ms-auto gap-2.5 py-4">
      <UButton
        :disabled="offset === 0"
        label="Prev"
        variant="outline"
        color="neutral"
        @click="pervPage"
      />
      <UButton label="Next" variant="outline" color="neutral" @click="nextPage" />
    </div>
  </UContainer>
</template>

<style scoped></style>
