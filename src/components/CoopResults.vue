<script setup lang="ts">
import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import { IonList, IonItem, IonLabel, IonContent, IonRow, IonCol } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';
import dayjs from 'dayjs';

const results: Ref<Result[]> = ref([]);
const app = getCurrentInstance()
const { t } = useI18n()

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
      <ion-item-group>
        <template v-for="result in results" :key="result.salmon_id">
          <ion-item button :router-link="`/results/${result.salmon_id}`">
            <ion-grid>
              <ion-row>
                <ion-col size="2">
                  <ion-row>
                    {{ result.salmon_id }}
                  </ion-row>
                  <ion-row>
                    {{ result.job_result.is_clear }}
                  </ion-row>
                  <ion-row>
                    {{ result.danger_rate }}
                  </ion-row>
                </ion-col>
                <ion-col>
                  <template v-for="wave in result.waves" :key="wave.quota_num">
                    <ion-row>
                      {{ wave.golden_ikura_num }}/{{ wave.quota_num }}({{ wave.golden_ikura_pop_num }}) {{
                          t(`event_type.${wave.event_type}`)
                      }}
                    </ion-row>
                  </template>
                </ion-col>
                <ion-col size="auto">
                  <ion-row>
                    {{ result.golden_ikura_num }}
                  </ion-row>
                  <ion-row>
                    {{ result.ikura_num }}
                  </ion-row>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </template>
      </ion-item-group>
    </ion-list>
  </ion-content>
</template>
