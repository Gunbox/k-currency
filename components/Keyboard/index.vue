<script setup>
import { useCalcStore } from '~~/store/calc'
const calcStore = useCalcStore()
const input = ref(0)
const mathAvailable = ref(true)

function keyUpNumber(value) {
  if (input.value === "0" && value === 0) input.value = "0"
  else if (input.value === "0" && value !== 0) input.value = value
  else input.value = `${input.value || ''}${value}`
  calcStore.setLine(input.value)
}

function keyUpDelete() {
  input.value = `${input.value}`.slice(0, -1) || "0"
  calcStore.setLine(input.value)
}

function keyUpComma() {
  const v = `${input.value}`
  const arr = v.split(/[+,-,*,\/]/)
  const operators = v.split('').filter(e => e === "+" || e === "-" || e === "*" || e === "/")

  const result = arr.map((val, i) => {
    let str
    if (i === arr.length - 1 && `${val}`.indexOf('.') === -1) {
      if (val === 0) return "0."
      str = `${val || ''}.`
    } else {
      str = val
    }

    return `${str}${operators[i] || ""}`
  })

  input.value = result.join('')
  calcStore.setLine(input.value)
}

function keyUpOperand(value) {
  if (!useLastIsOperand(input.value)) {
    input.value = `${input.value || ''}${value}`
    calcStore.setLine(input.value)
  }
}
</script>

<template>
  <div :class="['grid text-2xl h-72 bg-base-200 bg-opacity-30 select-none', mathAvailable ? 'grid-cols-4' : 'grid-cols-3']">
    <KeyboardKey @click="keyUpNumber(7)">7</KeyboardKey>
    <KeyboardKey @click="keyUpNumber(8)">8</KeyboardKey>
    <KeyboardKey @click="keyUpNumber(9)">9</KeyboardKey>
    <KeyboardKey @click="keyUpOperand('+')" class="bg-base-200" v-if="mathAvailable">
      <Icon name="majesticons:plus-line" />
    </KeyboardKey>
    <KeyboardKey @click="keyUpNumber(4)">4</KeyboardKey>
    <KeyboardKey @click="keyUpNumber(5)">5</KeyboardKey>
    <KeyboardKey @click="keyUpNumber(6)">6</KeyboardKey>
    <KeyboardKey @click="keyUpOperand('-')" class="bg-base-200" v-if="mathAvailable">
      <Icon name="majesticons:minus-line" />
    </KeyboardKey>
    <KeyboardKey @click="keyUpNumber(1)">1</KeyboardKey>
    <KeyboardKey @click="keyUpNumber(2)">2</KeyboardKey>
    <KeyboardKey @click="keyUpNumber(3)">3</KeyboardKey>
    <KeyboardKey @click="keyUpOperand('*')" class="bg-base-200" v-if="mathAvailable">
      <Icon name="majesticons:multiply-line" />
    </KeyboardKey>
    <KeyboardKey @click="keyUpComma">.</KeyboardKey>
    <KeyboardKey @click="keyUpNumber(0)">0</KeyboardKey>
    <KeyboardKey @click="keyUpDelete">
      <Icon name="lucide:delete" />
    </KeyboardKey>
    <KeyboardKey @click="keyUpOperand('/')" class="bg-base-200" v-if="mathAvailable">
      <Icon name="majesticons:divide-line" />
    </KeyboardKey>
  </div>
</template>