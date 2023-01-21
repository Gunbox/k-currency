<script setup>
import { useCurrencyStore } from '~~/store/currency'
import { useCalcStore } from '~~/store/calc'
const currencyStore = useCurrencyStore()
const calcStore = useCalcStore()
const calcValue = computed(() => calcStore.getCalculated)
const calcLine = computed(() => calcStore.getLine)
const isOperated = computed(() => calcStore.isOperated)
const isEmptyLine = computed(() => calcStore.isEmptyLine)
const selectedCurrencyCode = computed(() => currencyStore.getSelectedCurrencyCode)
const displayList = computed(() => currencyStore.getCurrencyList.length)
const list = computed(() => currencyStore.getCurrencyList)
</script>

<template>
  <div class="flex-1 flex flex-col overflow-y-auto">
    <template v-if="displayList">
      <ConvertorCurrency v-for="(item, i) of list" :currencyData="item" :selected="selectedCurrencyCode === item.code"
        :calcLine="calcLine" :isOperated="isOperated" :calcValue="calcValue" :isEmptyLine="isEmptyLine"
        :key="`$${i}-${item.code}`" />
    </template>
    <div v-else class="flex flex-col items-center justify-center h-full">
      <nuxt-link to="/currency" class="btn">add currency</nuxt-link>
    </div>
  </div>
</template>