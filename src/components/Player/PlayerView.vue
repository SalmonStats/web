<script setup lang="ts">
import { IonContent, IonList } from '@ionic/vue';
import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import { Player } from '../@types/player'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PlayerRecord from './PlayerRecord.vue';
import PlayerResult from './PlayerResult.vue';

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
    <ion-list v-if="player !== undefined">
      <PlayerResult :player="player" />
      <template v-for="record in player?.stage_results" :key="record.stage_id">
        <PlayerRecord :record="record" />
      </template>
    </ion-list>
  </ion-content>
</template>
