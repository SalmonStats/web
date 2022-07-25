<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopMenu from '@/components/CoopMenu.vue';
import BarChart from '@/components/Charts/BarChart';
</script>

<template>
  <ion-page>
    <CoopMenu title="Charts" />
    <ion-content :fullscreen="true">
      <BarChart />
    </ion-content>
  </ion-page>
</template>
