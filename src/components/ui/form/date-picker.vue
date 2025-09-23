<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { shallowRef } from 'vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const now = Date.now()

const date = new Date(now)

const currentDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())

const modelValue = shallowRef(currentDate)

defineProps<{
  name: string
  id: string
}>()
</script>

<template>
  <UPopover>
    <UButton color="neutral" variant="outline" icon="heroicons:calendar-days-16-solid">
      {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
    </UButton>

    <template #content>
      <UCalendar :id :name v-model="modelValue" class="p-2" :minValue="currentDate" />
    </template>
  </UPopover>
</template>
