<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1>{{ t("title.salmon_stats") }}</h1>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped>
h1 {
  font-family: Splatoon1;
  font-size: 24px;
  padding-bottom: 20px;
}
</style>
