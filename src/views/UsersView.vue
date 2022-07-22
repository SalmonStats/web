<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopMenu from '@/components/CoopMenu.vue';
</script>

<template>
  <ion-page>
    <CoopMenu title="Charts" />
    <ion-content :fullscreen="true">
    </ion-content>
  </ion-page>
</template>
