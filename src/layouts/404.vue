<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main text="center teal-700 dark:gray-200">
    <div text-4xl class="not-found-page">
      <div i-carbon-warning inline-block />
    </div>
    <RouterView />
    <Navigation />
  </main>
</template>

<style lang="scss" scoped>
.not-found-page {
  padding-top: 10%;
}
</style>
