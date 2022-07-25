<script setup lang="ts">
import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import { IonList, IonItem, IonLabel, IonContent, IonListHeader, IonText, IonItemGroup } from '@ionic/vue';
import { Result } from '@types/result';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { sum } from './math/array'

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
      <ion-list-header>Waves</ion-list-header>
      <template v-for="wave in result?.waves" :key="wave.id">
        <ion-item>
          <ion-label>{{ t(`water_level.${wave.water_level}`) }}</ion-label>
          <ion-label>{{ t(`event_type.${wave.event_type}`) }}</ion-label>
          <ion-label>{{ wave.golden_ikura_num }}/{{ wave.quota_num }}({{ wave.golden_ikura_pop_num }})</ion-label>
        </ion-item>
      </template>
      <ion-list-header>Players</ion-list-header>
      <template v-for="player in result?.players" :key="player.nsaid">
        <ion-item>
          <ion-label>{{ player.name }}</ion-label>
          <ion-label>
            <p>{{ player.grade_point }}</p>
            <p>{{ player.boss_kill_counts.sum() }}</p>
          </ion-label>
          <ion-label>
            <p>{{ player.golden_ikura_num }}</p>
            <p>{{ player.ikura_num }}</p>
          </ion-label>
          <ion-label>
            <p>{{ player.help_count }}</p>
            <p>{{ player.dead_count }}</p>
          </ion-label>
        </ion-item>
      </template>
      <ion-list-header>Boss</ion-list-header>
    </ion-list>
  </ion-content>
</template>
