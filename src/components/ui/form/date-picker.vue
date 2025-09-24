<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  type DateValue,
} from '@internationalized/date'
import { computed } from 'vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const now = Date.now()

const date = new Date(now)

const currentDate = computed(
  () => new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
)

const value = defineModel<DateValue>('value')
</script>

<template>
  <UPopover>
    <UButton color="neutral" variant="outline" icon="heroicons:calendar-days-16-solid">
      {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Select a date' }}
    </UButton>

    <template #content>
      <UCalendar class="p-2" v-model="value" :minValue="currentDate" />
    </template>
  </UPopover>
</template>
