<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonMenuButton, IonButtons, IonTitle, IonIcon, IonNav } from '@ionic/vue';
import { contrastOutline } from 'ionicons/icons';

interface Props {
  title: string
}

const props = defineProps<Props>();
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button :auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button>
          <ion-icon slot="icon-only" :icon="contrastOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

