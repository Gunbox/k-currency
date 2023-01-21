<template>
  <div class="hero h-full">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">
          This is a small currency conversion application, totally free, open source. The exchange rate is taken from an
          <a href="https://github.com/fawazahmed0/currency-api" target="_blank" class="link">open source</a>, many
          thanks to Fawaz
          Ahmed for this. The app will update the exchange rate itself, but you can update manually in the <nuxt-link
            to="/settings">settings page</nuxt-link>
        </p>
        <nuxt-link to="/currency" class="btn btn-primary">Get Started</nuxt-link>
        <div class="p-3">
          <a href="https://github.com/Gunbox/k-currency" target="_blank">
            <Icon name="carbon:logo-github" size="3rem" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>