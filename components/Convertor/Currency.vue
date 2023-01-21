<script setup>
import { useCurrencyStore } from '~~/store/currency'
import { useCalcStore } from '~~/store/calc'

const props = defineProps({
  currencyData: Object,
  selected: Boolean,
  calcValue: String,
  calcLine: String,
  isOperated: Boolean,
  isEmptyLine: Boolean,
})

const currencyStore = useCurrencyStore()
const calcStore = useCalcStore()
function selectCurrency() {
  currencyStore.select(props.currencyData.code)
}
const calculated = computed(() => {
  return props.selected ? props.calcValue : calcStore.getCalculatedByCode(props.currencyData.code)
})
const isSelected = computed(() => !!props.selected)
const isOperated = computed(() => useOperated(props.calcLine))
const isManual = computed(() => currencyStore.getCurrencyIsManual(props.currencyData.code))
</script>

<template>
  <div :class="['flex items-center gap-3 p-3', isSelected && 'bg-base-200 bg-opacity-50']" @click="selectCurrency">
    <Icon :name="`circle-flags:${currencyData.countryCode}`" size="2rem" />
    <div class="uppercase">{{ currencyData.code }}</div>
    <Icon v-if="isManual" name="carbon:cloud-offline" size="1.5rem" />
    <nuxt-link v-if="isSelected" :to="`/currency/${props.currencyData.code}/edit`">
      <Icon name="carbon:edit" size="1.5rem" />
    </nuxt-link>
    <div class="flex-1"></div>
    <div class="flex flex-col items-end">
      <div v-if="isSelected && isOperated" class="text-xs italic">{{ calcLine }}</div>
      <div :class="['text-2xl', isSelected && 'font-bold', isEmptyLine && 'text-base-content text-opacity-50']">{{
        calculated
      }}</div>
      <div class="text-xs text-base-content text-opacity-50">{{ currencyData.name }} {{ currencyData.symbol_native }}
      </div>
    </div>
  </div>
</template>