import { defineStore } from "pinia"
import { useCurrencyStore } from "./currency"

const DEFAULT_VALUE = 100

export const useCalcStore = defineStore('calc', {
  persist: true,
  state: () => ({
    line: "0",
  }),
  getters: {
    isEmptyLine({ line }) {
      return line === "0"
    },
    getCalculated({ line }) {
      let value = `${this.isEmptyLine ? DEFAULT_VALUE : line}`

      if (useLastIsOperand(line)) {
        value = `${value}`.slice(0, -1)
      }

      if (useOperated(value)) {
        value = eval(value)
      }

      const [num,str] = `${value}`.trim().split('.')
      const end = typeof str !== "undefined" ? `.${str}` : ""
      return `${useLocale(Number(num))}${end}`
    },
    getCalculatedByCode() {
      const currencyStore = useCurrencyStore()

      return (code) => {
        const range = currencyStore.getSelectedRangeValue(code)
        const num = this.getCalculated.replace(/,/g, '')
        const result = parseFloat(num) * range
        const rounded = Math.round((result + Number.EPSILON) * 100) / 100

        return useLocale(rounded)
      }
    },
    getLine({ line }) {
      return `${line}`.trim()
    },
  },
  actions: {
    setLine(value) {
      this.line = value
    },
  },
})