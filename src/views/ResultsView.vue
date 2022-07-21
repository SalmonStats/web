<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopResults from '../components/CoopResults.vue';
import CoopHeader from '../components/CoopHeader.vue';
</script>

<template>
  <ion-page>
    <CoopHeader title="Results" />
    <ion-content :fullscreen="true">
      <CoopResults />
    </ion-content>
  </ion-page>
</template>
