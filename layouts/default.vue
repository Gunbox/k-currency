<template>
  <ClientOnly>
    <div class="flex flex-col bg-base-100 h-screen">
      <Navbar />
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </ClientOnly>
</template>