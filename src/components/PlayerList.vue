<script setup lang="ts">
import { Player } from '@/views/SearchView.vue';
import { IonList, IonContent, IonItem, IonImg, IonAvatar, IonLabel } from '@ionic/vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  players: Player[]
}>()

</script>

<template>
  <ion-list>
    <template v-for="player in props.players" :key="player.nsaid+player.nickname">
      <ion-item button :router-link="`/users/${player.nsaid}`">
        <ion-avatar slot="start">
          <ion-img :src="player.thumbnail_url"></ion-img>
        </ion-avatar>
        <ion-label slot="end">{{ player.nickname }}</ion-label>
      </ion-item>
    </template>
  </ion-list>
</template>
