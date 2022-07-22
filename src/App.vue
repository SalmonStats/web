<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import CoopMenu from './components/CoopMenu.vue';
</script>

<template>
  <ion-app>
    <CoopMenu />
    <ion-router-outlet id="menuContent" />
  </ion-app>
</template>
