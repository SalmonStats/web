<script setup lang="ts">
import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import { IonList, IonItem, IonLabel, IonContent } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';

const results: Ref<Result[]> = ref([]);
const app = getCurrentInstance()

onMounted(() => {
  const baseURL = app?.appContext.config.globalProperties.$baseURL
  if (baseURL === null) {
    return
  }

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
      <template v-for="result in results" :key="result.salmon_id">
        <ion-item button :router-link="`/results/${result.salmon_id}`">
          <ion-label>
            <p>{{ result.salmon_id }}</p>
            <p>{{ result.job_result.is_clear }}</p>
            <p>{{ result.danger_rate }}</p>
          </ion-label>
          <ion-label>
            <ion-label v-for=" wave in result.waves" :key="wave.quota_num">
              <p>{{ wave.water_level }} {{ wave.event_type }}</p>
            </ion-label>
          </ion-label>
          <ion-label>
            <p>{{ result.golden_ikura_num }}</p>
            <p>{{ result.ikura_num }}</p>
          </ion-label>
        </ion-item>
      </template>
    </ion-list>
  </ion-content>
</template>
