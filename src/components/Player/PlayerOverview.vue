<script setup lang="ts">
import { IonContent, IonList, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { onMounted, Ref, ref } from 'vue';
import { Player } from '../@types/player'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PlayerRecord from './PlayerRecord.vue';
import PlayerResult from './PlayerResult.vue';

const { t } = useI18n()

const props = defineProps<{
  player: Player
}>()
</script>

<template>
  <ion-list v-if="player !== undefined">
    <template v-for="record in player.stage_results" :key="record.stage_id">
      <PlayerRecord :record="record" />
    </template>
  </ion-list>
</template>
