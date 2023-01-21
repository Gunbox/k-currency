<script setup>
import { useCurrencyStore } from './store/currency'

const currencyStore = useCurrencyStore()
currencyStore.update()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
