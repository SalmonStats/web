<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Results</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Results</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
    <CoopResults />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import CoopResults from '../components/CoopResults.vue';

export default defineComponent({
  name: 'ResultsView',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, CoopResults },
});
</script>
