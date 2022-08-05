<script setup lang="ts">
import { IonContent, IonList, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { onMounted, Ref, ref } from 'vue';
import { Player } from '../@types/stats'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PlayerResult from './PlayerResult.vue';
import PlayerOverview from './PlayerOverview.vue';
import CoopResult from '../CoopResult.vue';
import CoopResults from '../CoopResults.vue';

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

function segmentChanged(event: CustomEvent) {
  const index = Object.values(ViewType).indexOf(event.detail.value)
  viewType.value = index === 0 ? ViewType.Overview : ViewType.Results
}
</script>

<template>
  <ion-content v-if="player !== undefined">
    <ion-list>
      <PlayerResult :player="player" />
      <PlayerOverview :player=player />
    </ion-list>
  </ion-content>
</template>
