<script setup lang="ts">
import { IonItem, IonAvatar, IonImg, IonLabel, IonListHeader } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { Player } from '../@types/player'

const { t } = useI18n()
const props = defineProps<{
  player: Player
}>()
</script>

<template>
  <ion-item>
    <ion-avatar slot="start">
      <ion-img :src="props.player.thumbnail_url"></ion-img>
    </ion-avatar>
    <ion-label slot="end">{{ props.player.nickname }}</ion-label>
  </ion-item>
</template>
