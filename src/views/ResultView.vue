<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopResult from '../components/CoopResult.vue';
import CoopHeader from '../components/CoopHeader.vue';
</script>

<template>
  <ion-page>
    <CoopHeader title="Detail" />
    <ion-content :fullscreen="true">
      <CoopResult />
    </ion-content>
  </ion-page>
</template>
