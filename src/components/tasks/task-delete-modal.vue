<script setup lang="ts">
import { deleteTask } from '@/api'
import useMutate from '@/composables/useMutate'

const props = defineProps<{
  taskId: number
}>()

const toast = useToast()

const modal = useOverlay()

const { mutate, isPending } = useMutate({
  queryKey: ['tasks'],
  mutationKey: ['delete-task'],
  mutationFn: () => deleteTask(props.taskId),
})

function confirmDelete() {
  mutate(
    {},
    {
      onSuccess() {
        modal.closeAll()
        toast.add({
          title: 'Task Deleted',
          description: 'Task deleted successfully',
          color: 'info',
        })
      },
    },
  )
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-3">
    <p>Are you sure you want to delete this task?</p>

    <div class="space-x-3 mt-3 flex items-center">
      <UButton label="Cancel" variant="outline" color="neutral" @click="modal.closeAll" />

      <UButton
        label="Delete"
        variant="solid"
        color="error"
        :loading="isPending"
        @click="confirmDelete"
      />
    </div>
  </div>
</template>

<style scoped></style>
