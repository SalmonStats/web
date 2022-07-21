<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopSchedules from '@/components/CoopSchedules.vue';
import CoopHeader from '@/components/CoopHeader.vue';
</script>

<template>
  <ion-page>
    <CoopHeader title="Schedules" />
    <ion-content :fullscreen="true">
      <CoopSchedules />
    </ion-content>
  </ion-page>
</template>
