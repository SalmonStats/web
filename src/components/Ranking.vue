<script setup lang="ts">
import { ref } from '@vue/reactivity'
const { t, availableLocales, locale } = useI18n()

interface Result {
  salmon_id: number
  golden_ikura_num: number
  ikura_num: number
}

interface Results {
  limit: number
  offset: number
  results: Result[]
}

const results: Results = ref<Results>(await (await fetch('https://api-dev.splatnet2.com/v1/results?order=false')).json())
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>{{ t("title.salmon_id") }}</th>
        <th>{{ t("title.golden_ikura_num") }}</th>
        <th>{{ t("title.ikura_num") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results.results" :key="result.salmon_id">
        <td>{{ result.salmon_id }}</td>
        <td>{{ result.golden_ikura_num }}</td>
        <td>{{ result.ikura_num }}</td>
      </tr>
    </tbody>
    <!-- <li v-for="result in results.results" :key="result.salmon_id">
      {{ result.salmon_id }}
    </li> -->
  </table>
</template>
