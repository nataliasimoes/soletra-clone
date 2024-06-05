<template>
  <div>
    <header
      class="flex place-content-between backdrop-blur-sm fixed top-0 text-center w-screen z-10 py-4 px-8 border-b dark:border-gray-600"
    >
      <NuxtLink to="/">
        <TheLogo class="text-xl" />
      </NuxtLink>
    </header>

    <main class="px-4 w-screen text-center grid place-content-center">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts"></script>
