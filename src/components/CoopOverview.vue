<script setup lang="ts">
import { IonItem, IonRow, IonCol, IonGrid } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';

const { t } = useI18n()

const props = defineProps<{
  result: Result
}>()
</script>

<template>
  <ion-item button :router-link="`/results/${result.salmon_id}`">
    <ion-grid>
      <ion-row>
        <ion-col size="2">
          <ion-row>
            {{ props.result.salmon_id }}
          </ion-row>
          <ion-row>
            {{ props.result.job_result.is_clear }}
          </ion-row>
          <ion-row class="danger-rate">
            {{ props.result.danger_rate }}
          </ion-row>
        </ion-col>
        <ion-col>
          <template v-for="wave in props.result.waves" :key="wave.quota_num">
            <ion-row>
              {{ wave.golden_ikura_num }}/{{ wave.quota_num }}({{ wave.golden_ikura_pop_num }}) {{
                  t(`event_type.${wave.event_type}`)
              }}
            </ion-row>
          </template>
        </ion-col>
        <ion-col size="auto">
          <ion-row class="ion-justify-content-end num">
            {{ props.result.golden_ikura_num }}
          </ion-row>
          <ion-row class="ion-justify-content-end num">
            {{ props.result.ikura_num }}
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>
