<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { earthOutline, pieChartOutline, trailSignOutline, personOutline, searchOutline } from 'ionicons/icons';
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="results" href="/results">
          <ion-icon :icon="earthOutline" />
          <ion-label>Results</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="schedules" href="/schedules">
          <ion-icon :icon="trailSignOutline" />
          <ion-label>Schedules</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="charts" href="/charts">
          <ion-icon :icon="pieChartOutline" />
          <ion-label>Charts</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="searchOutline" />
          <ion-label>Search</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="users" href="/users">
          <ion-icon :icon="personOutline" />
          <ion-label>User</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
