<script setup lang="ts">
import { Ref, ref } from 'vue';
import { IonList, IonItem, IonLabel, IonContent } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';

const results: Ref<Result[]> = ref([]);
</script>

<template>
  <ion-content>
    <ion-list>
      <ion-item v-for="result in results" :key="result.salmon_id">
        <ion-label slot="start">
          <p>{{ result.salmon_id }}</p>
          <p>{{ result.job_result.is_clear }}</p>
          <p>{{ result.danger_rate }}</p>
        </ion-label>
        <ion-label slot="start">
          <ion-label v-for="wave in result.waves" :key="wave.quota_num">
            <p>{{ wave.water_level }} {{ wave.event_type }}</p>
          </ion-label>
        </ion-label>
        <ion-label slot="end">
          <p>{{ result.golden_ikura_num }}</p>
          <p>{{ result.ikura_num }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
