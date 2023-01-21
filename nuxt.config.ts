// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "name": "theme-color",
          "content": "#2b303b"
        },
        {
          "charset": "utf-8"
        }
      ],
      "link": [],
      "style": [],
      "script": [],
      "noscript": []
    }
  },
  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  pwa: {
    meta: {
      author: 'Kart Noire',
      name: 'kCurrency',
      description: 'Currency conversion application',
    },
    manifest: {
      name: 'kCurrency',
      short_name: 'kC',
      description: 'Currency conversion application',
      background_color: '#2b303b',
    },
  },
})
