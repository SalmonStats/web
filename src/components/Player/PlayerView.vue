<script setup lang="ts">
import { IonContent, IonList } from '@ionic/vue';
import { onMounted, Ref, ref } from 'vue';
import { SalmonStats } from 'types/stats'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PlayerResult from './PlayerResult.vue';
import PlayerOverview from './PlayerOverview.vue';

type Player = SalmonStats.Player

enum ViewType {
  Overview = "overview",
  Results = "results"
}

const player: Ref<Player | undefined> = ref<Player>()
const viewType: Ref<ViewType> = ref<ViewType>(ViewType.Overview)
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
  <ion-content v-if="player !== undefined">
    <ion-list>
      <PlayerResult :player="player" />
      <PlayerOverview :player=player />
    </ion-list>
  </ion-content>
</template>
