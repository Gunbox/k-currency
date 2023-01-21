<script setup>
import { useCurrencyStore } from '~~/store/currency'
const store = useCurrencyStore()
const loading = ref(false)

async function update() {
  loading.value = true
  await store.fetchRanges()
  loading.value = false
}
</script>

<template>
  <div class="flex flex-col gap-6 p-3">
    <div class="text-4xl">Settings</div>
    <div v-if="store.getUpdatedAt" class="flex items-center gap-1">
      <Icon name="material-symbols:update-rounded" />
      <div>Last update</div>
      <div>{{ store.getUpdatedAt }}</div>
    </div>
    <div class="flex flex-col gap-3">
      <div :class="['btn', { loading }]" @click="update">update all ranges</div>
      <div class="btn btn-error" @click="store.$reset">reset data</div>
    </div>
  </div>
</template>