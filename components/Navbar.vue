<script setup>
import { useCurrencyStore } from '~~/store/currency'

const store = useCurrencyStore()
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <nuxt-link to="/" class="btn btn-ghost normal-case text-xl">kCurrency</nuxt-link>
    </div>
    <div v-if="store.getUpdatedAt" class="navbar-center text-xs space-x-1">
      <Icon name="material-symbols:update-rounded" />
      <div>{{ store.getUpdatedAt }}</div>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <Icon name="carbon:overflow-menu-horizontal" size="2rem" />
        </label>
        <ul @click="useDropdownClick" tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
          <li><nuxt-link to="/currency">Currency list</nuxt-link></li>
          <li><nuxt-link to="/settings">Settings</nuxt-link></li>
          <li><nuxt-link to="/about">About</nuxt-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>