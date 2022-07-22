<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonLabel } from '@ionic/vue';
</script>

<script lang="ts">
import { modalController } from '@ionic/vue';
export default {
  methods: {
    dismiss() {
      return modalController.dismiss(null, 'cancel')
    }
  }
}
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        Modal
      </ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismiss()">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-label>Hello, World!</ion-label>
  </ion-content>
</template>
