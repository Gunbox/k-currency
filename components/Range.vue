<script setup>
import { useCurrencyStore } from '~~/store/currency'
const currencyStore = useCurrencyStore()

const props = defineProps({
  selectedCode: String,
  countryCode: String,
  name: String,
  code: String,
  symbol_native: String,
  target: Object,
})

const range = computed({
  get: () => currencyStore.getRange(props.selectedCode, props.code, false) || null,
  set: (value) => {
    const { selectedCode, code: targetCode } = props
    currencyStore.setRange(selectedCode, targetCode, value)
  },
})
const rangeManual = computed({
  get: () => currencyStore.getRange(props.selectedCode, props.code, true) || null,
  set: (value) => {
    const { selectedCode, code: targetCode } = props
    currencyStore.setRange(selectedCode, targetCode, value, true)
  },
})

const isManual = computed({
  get: () => currencyStore.getRangeIsManual(props.selectedCode, props.code) || null,
  set: (value) => {
    const { selectedCode, code: targetCode } = props
    currencyStore.setManual(selectedCode, targetCode, value)
  },
})
</script>

<template>
  <div class="flex items-start gap-3 w-full">
    <div class="basis-12">
      <Icon :name="`circle-flags:${countryCode}`" size="2rem" />
    </div>
    <div class="flex-1 flex flex-col">
      <div class="flex items-end gap-2">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ name }}</span>
          </label>
          <input type="number" placeholder="Type here"
            :class="['input input-bordered w-full', !isManual && 'input-accent']" :value="range" readonly />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Manual range</span>
          </label>
          <input type="number" placeholder="Type here"
            :class="['input input-bordered w-full', isManual && 'input-accent']" :value="rangeManual"
            @input="e => rangeManual = e.target.value" />
        </div>
      </div>
      <div class="form-control">
        <label class="label justify-start gap-3 cursor-pointer">
          <input type="checkbox" class="toggle toggle-sm" v-model="isManual" />
          <Icon v-if="isManual" name="carbon:cloud-offline" size="1.5rem" />
          <Icon v-else name="carbon:cloud" size="1.5rem" />
          <span class="label-text">Use {{ isManual? 'cloud data': 'manual data' }}</span>
        </label>
      </div>
    </div>
  </div>
</template>