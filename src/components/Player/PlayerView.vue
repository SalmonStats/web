<script setup lang="ts">
import { IonContent, IonList } from '@ionic/vue';
import { onMounted, Ref, ref } from 'vue';
import { Player } from '../@types/player'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PlayerRecord from './PlayerRecord.vue';
import PlayerResult from './PlayerResult.vue';

const player: Ref<Player | undefined> = ref<Player>()
const { t } = useI18n()

onMounted(() => {
  const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;
  const { player_id } = useRoute().params
  const { nsaid } = JSON.parse(localStorage.getItem('account') ?? "{}")

  const url = `${baseURL}/players/${player_id ?? nsaid}`

  fetch(url)
    .then((res) => res.json())
    .then((res: Player) => {
      player.value = res
    })
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
