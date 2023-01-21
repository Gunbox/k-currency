export default defineNuxtPlugin(() => ({
  provide: {
    hello: (msg) => `Hello ${msg}!`
  }
}))