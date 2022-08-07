<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { IonList, IonItem, IonLabel, IonContent, IonListHeader, IonItemGroup, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import CoopSchedule from './CoopSchedule.vue';
import CoopPlayer from './CoopPlayer.vue';
import CoopDefeated from './CoopDefeated.vue';
import { CoopResult } from '@/types/coop';

type Result = CoopResult.Result
const result: Ref<Result | undefined> = ref<Result>();
const route = useRoute()
const { t } = useI18n()

onMounted(() => {
  const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;
  const { salmon_id } = route.params
  const url = `${baseURL}/results/${salmon_id}`

  fetch(url)
    .then(res => res.json())
    .then((res: Result) => {
      result.value = res
    });
});
</script>

<template>
  <ion-content>
    <ion-list>
      <CoopSchedule :schedule="result?.schedule" v-if="result !== undefined" />
      <ion-item-group>
        <template v-for="wave in result?.waves" :key="wave.id">
          <ion-item>
            <ion-grid>
              <ion-row>
                <ion-col size="2">{{ t(`water_level.${wave.water_level}`) }}</ion-col>
                <ion-col>{{ t(`event_type.${wave.event_type}`) }}</ion-col>
                <ion-col size="auto">{{ wave.golden_ikura_num }}/{{ wave.quota_num }}({{ wave.golden_ikura_pop_num }})
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </template>
      </ion-item-group>
      <ion-item-group>
        <template v-for="player in result?.players" :key="player.nsaid">
          <CoopPlayer :player="player" />
        </template>
      </ion-item-group>
      <ion-item-group v-if="result !== undefined">
        <CoopDefeated :result="result" />
      </ion-item-group>
    </ion-list>
  </ion-content>
</template>
