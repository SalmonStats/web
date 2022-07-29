<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopHeader from '@/components/CoopHeader.vue';
import PlayerView from '@/components/PlayerView.vue';
</script>

<template>
  <ion-page>
    <CoopHeader title="Players" />
    <ion-content :fullscreen="true">
      <PlayerView />
    </ion-content>
  </ion-page>
</template>
