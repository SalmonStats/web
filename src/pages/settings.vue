<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="app-setting">
    <h1>{{ t("page.setting") }}</h1>
  </div>
  <Footer />
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style lang="scss" scoped>
.app-setting {
  padding-top: 10%;
}

h1 {
  font-family: Splatoon1;
  font-size: 24px;
  padding-bottom: 20px;
}
</style>
