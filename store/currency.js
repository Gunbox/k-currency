import moment from "moment"
import { defineStore } from "pinia"
import { useCurrency } from "~~/composables/useCurrency"
import { createCurrency } from "~~/models/currency.model"
import { createRange } from "~~/models/range.model"

export const useCurrencyStore = defineStore('currency', {
  persist: true,
  state: () => ({
    list: ["usd", "eur"],
    ranges: {
      "usd": {
        list: {
          "eur": createRange()
        },
        updatedAt: null,
      },
      "eur": {
        list: {
          "usd": createRange()
        },
        updatedAt: null,
      },
    },
    selectedCurrencyCode: "usd",
    updatedAt: null,
  }),
  getters: {
    getCurrencyList({ list }) {
      return (list || []).map((code) => code && this.getItemByCode(code)).filter(e => e)
    },
    getFullCurrencyList: () => Object.values(useCurrency()),
    getItemByCode() {
      return (code) => this.getFullCurrencyList.find((obj) => obj.code === code)
    },
    getSelectedCurrencyCode({ selectedCurrencyCode }) {
      return selectedCurrencyCode || this.getCurrencyList[0]?.code
    },
    getSelectedCurrency() {
      return this.getItemByCode(this.getSelectedCurrencyCode)
    },
    getRange({ ranges }) {
      return (selectedCode, targetCode, manual) => {
        const { list } = ranges[selectedCode] || {}
        if (!list || !list[targetCode]) return null

        return list[targetCode]["values"][manual ? 1 : 0]
      }
    },
    getRangeIsManual({ ranges }) {
      return (selectedCode, targetCode) => {
        const { list } = ranges[selectedCode] || {}
        if (!list || !list[targetCode]) return null
        const { manual } = list[targetCode]

        return manual
      }
    },
    getCurrencyIsManual() {
      const { list } = this.getSelectedRange || {}

      return (targetCode) => {
        if (!list[targetCode]) return null
        const { manual } = list[targetCode]

        return manual
      }
    },
    getRangeUpdatedAt({ ranges }) {
      return (selectedCode) => {
        const { updatedAt } = ranges[selectedCode] || {}
        return updatedAt && moment(updatedAt).calendar()
      }
    },
    getSelectedRange({ ranges }) {
      return ranges[this.getSelectedCurrencyCode]
    },
    getSelectedRangeValue() {
      const { list } = this.getSelectedRange || {}

      return (targetCode) => {
        if (!list[targetCode]) return null
        const { manual } = list[targetCode]
        return list[targetCode]["values"][manual ? 1 : 0]
      }
    },
    getSelectedUpdatedAt() {
      const { updatedAt } = this.getSelectedRange || {}

      return updatedAt && moment(updatedAt).calendar()
    },
    getUpdatedAt({ updatedAt }) {
      return updatedAt && moment(updatedAt).calendar()
    },
  },
  actions: {
    add(currencyCode) {
      this.list.push(currencyCode)
    },
    remove(currencyCode) {
      const index = this.list.findIndex(_code => _code === currencyCode)
      if (index !== -1) this.list.splice(index, 1)
      this.selectedCurrencyCode = ""
    },
    select(currencyCode) {
      this.selectedCurrencyCode = currencyCode
    },
    async toggle(currencyCode) {
      const index = this.list.findIndex(_code => _code === currencyCode)
      if (index !== -1) {
        this.remove(currencyCode)
        return null
      }

      this.add(currencyCode)
      await this.fetchRanges()
      return currencyCode
    },
    setRange(currencyCode, exchangeCode, value, isManual = false, date) {
      if (!this.ranges[currencyCode]) this.ranges[currencyCode] = createCurrency()
      if (!this.ranges[currencyCode]["list"][exchangeCode]) this.ranges[currencyCode]["list"][exchangeCode] = createRange()
      if (date) this.ranges[currencyCode]["updatedAt"] = date
      this.ranges[currencyCode]["list"][exchangeCode]["values"][isManual ? 1 : 0] = value
    },
    setManual(currencyCode, exchangeCode, value) {
      this.ranges[currencyCode]["list"][exchangeCode]["manual"] = value
    },
    async fetchRange(currencyCode) {
      if (!currencyCode) return null
      try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCode}.json`)
        const result = await response.json()
        const list = this.list.filter((_code) => _code !== currencyCode)

        list.forEach((exchangeCode) => {
          const value = result[currencyCode][exchangeCode]
          this.setRange(currencyCode, exchangeCode, value, false, result?.date)
        })
      } catch (error) { }
    },
    async fetchRanges() {
      for (let i = 0; i < this.list.length; i++) {
        const currencyCode = this.list[i]
        try {
          await this.fetchRange(currencyCode)
        } catch (error) { }
      }
      this.updatedAt = Date.now()
    },
    async update() {
      if (this.updatedAt && Date.now() - this.updatedAt < 3600000) return null

      try {
        await this.fetchRanges()
      } catch (error) { }
    },
  },
})