<script setup lang="ts">
import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import { IonList, IonItem, IonLabel, IonContent, IonListHeader, IonItemGroup, IonGrid, IonRow, IonCol, IonImg } from '@ionic/vue';
import { Result } from '@types/result';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { sum } from './math/array'
import CoopSchedule from './CoopSchedule.vue';
import CoopPlayer from './CoopPlayer.vue';

const result: Ref<Result | undefined> = ref<Result>();
const app = getCurrentInstance()
const route = useRoute()
const { t } = useI18n()

onMounted(() => {
  const baseURL = app?.appContext.config.globalProperties.$baseURL
  const { salmon_id } = route.params
  if (baseURL === null) {
    return
  }
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
      <ion-list-header>
        <ion-label>
          <h2>Waves</h2>
        </ion-label>
      </ion-list-header>
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
      <ion-list-header>
        <ion-label>
          <h2>Players</h2>
        </ion-label>
      </ion-list-header>
      <ion-item-group>
        <template v-for="player in result?.players" :key="player.nsaid">
          <CoopPlayer :player="player" />
        </template>
      </ion-item-group>
      <ion-list-header>
        <ion-label>
          <h2>Boss</h2>
        </ion-label>
      </ion-list-header>
    </ion-list>
  </ion-content>
</template>
