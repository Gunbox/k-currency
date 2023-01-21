<script setup>
import { useCurrencyStore } from '~~/store/currency'

const router = useRouter()
const loadingCode = ref("")
const search = ref("")
const store = useCurrencyStore()
const checkedList = computed(() => store.getCurrencyList)
const list = computed(() => {
  return store.getFullCurrencyList.map((obj) => {
    const checked = !!checkedList.value.find(({ code }) => code === obj.code)
    return Object.assign({}, obj, { checked })
  })
})
const filteredList = computed(() => {
  const normalizedSearch = search.value.toLowerCase().trim()
  return normalizedSearch ? list.value.filter(({ name, code }) => {
    const normName = name.toLowerCase().trim()
    const normCode = code.toLowerCase().trim()
    return normName.search(normalizedSearch) >= 0 || normCode.search(normalizedSearch) >= 0
  }) : list.value.sort((a, b) => b.checked - a.checked)
})

const isLoading = (code) => {
  return loadingCode.value === code
}

async function selectItem(code) {
  loadingCode.value = code
  await store.toggle(code)
  loadingCode.value = ""
}

function goToCurrencyPage(code) {
  if (code) {
    router.push(`/currency/${code}/edit`)
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 py-3">
    <div class="form-control px-3">
      <div class="input-group input-group-sm">
        <input :value="search" @input="e => search = e.target.value" type="search" placeholder="Search…"
          autocomplete="off" spellcheck="false" class="input input-sm input-bordered w-full" />
        <button class="btn btn-sm btn-square">
          <Icon name="carbon:search" />
        </button>
      </div>
    </div>
    <div>
      <div v-for="(item, i) of filteredList" :key="i"
        :class="['flex items-center gap-3 px-3', item.checked && 'bg-base-200']" @click="selectItem(item.code)">
        <Icon :name="`circle-flags:${item.countryCode}`" />
        <div class="basis-12 uppercase">{{ item.code }}</div>
        <div class="flex-1 text-lg">{{ item.name }}</div>
        <div :class="['btn btn-sm btn-ghost btn-square loading', !isLoading(item.code) && 'opacity-0']"></div>
        <div v-if="item.checked" @click.stop="goToCurrencyPage(item.code)">
          <Icon name="carbon:edit" />
        </div>
        <div v-if="item.checked">
          <Icon name="carbon:checkmark" />
        </div>
      </div>
    </div>
  </div>
</template>