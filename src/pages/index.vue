<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  msg: String,
})
const name = ref('')
function submit() {
  console.log('Nyamo')
}
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <h1>{{ t("title.salmon_stats") }}</h1>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
