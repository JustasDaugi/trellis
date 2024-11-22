<script lang="ts" setup>
import AddList from './AddList.vue'

defineProps<{}>()

defineEmits<{
  (e: 'list-created', newList: any): void
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100 p-4 text-gray-500 shadow-md transition-colors hover:bg-gray-200"
  >
    <AddList @list-created="$emit('list-created', $event)" />
  </div>
</template>
