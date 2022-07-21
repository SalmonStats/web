<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopHeader from '@/components/CoopHeader.vue';
</script>

<template>
  <ion-page>
    <CoopHeader title="Charts" />
    <ion-content :fullscreen="true">
    </ion-content>
  </ion-page>
</template>
