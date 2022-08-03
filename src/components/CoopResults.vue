<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { IonList, IonContent, IonItemGroup } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';
import CoopOverview from './CoopOverview.vue';

const results: Ref<Result[]> = ref([]);
const { t } = useI18n()

onMounted(() => {
  const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;

  const url = `${baseURL}/results`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      results.value = res.results;
    });
});
</script>

<template>
  <ion-content>
    <ion-list>
      <ion-item-group>
        <template v-for="result in results" :key="result.salmon_id">
          <CoopOverview :result="result" />
        </template>
      </ion-item-group>
    </ion-list>
  </ion-content>
</template>
