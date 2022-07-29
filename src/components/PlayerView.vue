<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonListHeader, IonContent, IonLabel, IonList, IonItem, IonAvatar, IonImg, IonRow, IonCol } from '@ionic/vue';
import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import { Player } from './@types/player'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { sunnyOutline, moonOutline } from 'ionicons/icons';
import PlayerRecord from './PlayerRecord.vue';

const app = getCurrentInstance()
const player: Ref<Player | undefined> = ref<Player>()
const { t } = useI18n()
onMounted(() => {
  const baseURL = app?.appContext.config.globalProperties.$baseURL
  const { player_id } = useRoute().params

  if (baseURL === null) {
    return
  }

  const url = `${baseURL}/players/${player_id ?? '91d160aa84e88da6'}`

  fetch(url)
    .then((res) => res.json())
    .then((res: Player) => {
      player.value = res
    })
  console.log(player_id)
})
</script>

<template>
  <ion-content>
    <ion-list>
      <ion-item>
        <ion-avatar slot="start">
          <ion-img :src="player?.thumbnail_url"></ion-img>
        </ion-avatar>
        <ion-label slot="end">{{ player?.nickname }}</ion-label>
      </ion-item>
      <ion-list-header>
        <ion-label>Stage Records</ion-label>
      </ion-list-header>
      <template v-for="record in player?.stage_results" :key="record.stage_id">
        <PlayerRecord :record="record" />
      </template>
    </ion-list>
  </ion-content>
</template>
