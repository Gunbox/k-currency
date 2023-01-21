<script setup>
import { useCurrencyStore } from '~~/store/currency'

const router = useRouter()
const route = useRoute()
const { code } = route.params
const currencyStore = useCurrencyStore()
const data = computed(() => currencyStore.getItemByCode(code))
const list = computed(() => currencyStore.getCurrencyList.filter((item) => item.code !== code))

function remove() {
  currencyStore.remove(code)
  router.push("/")
}

const loading = ref(false)

async function update() {
  loading.value = true
  await currencyStore.fetchRange(code)
  loading.value = false
}

const updatedAt = computed(() => currencyStore.getRangeUpdatedAt(code))
</script>

<template>
  <div class="flex flex-col gap-3 p-3">
    <div class="text-4xl flex items-center gap-3">
      <Icon :name="`circle-flags:${data.countryCode}`" size="3rem" />
      <div>{{ data.name }}</div>
    </div>
    <div v-if="updatedAt" class="flex items-center gap-3">
      <Icon name="material-symbols:update-rounded" />
      <div>{{ updatedAt }}</div>
    </div>
    <div class="flex flex-col gap-3 w-full">
      <Range v-for="(item) of list" :key="i" v-bind="item" :selectedCode="code" :target="data" />
    </div>
    <div class="sticky bottom-3 flex flex-col gap-3">
      <div :class="['btn', { loading }]" @click="update">update</div>
      <div class="btn btn-error" @click="remove">delete</div>
    </div>
  </div>
</template>