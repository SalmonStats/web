<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { IonList, IonContent, IonItemGroup, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result, Results } from './@types/response';
import CoopOverview from './CoopOverview.vue';

const results: Ref<Result[]> = ref([]);
const { t } = useI18n()
const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;
const url = `${baseURL}/results?limit=10`

onMounted(() => {
  fetch(url)
    .then(res => res.json())
    .then((res: Results) => {
      results.value = res.results;
    });
});

function onRefresh(event: CustomEvent) {
  setTimeout(() => {
    fetch(url)
      .then(res => res.json())
      .then((res: Results) => {
        results.value = res.results;
      });
    event.detail.complete();
  }, 1000);
}

function getResults(event: InfiniteScrollCustomEvent) {
  const resultsCount = results.value.length
  const url = `${baseURL}/results?limit=10&offset=${resultsCount}`
  setTimeout(() => {
    fetch(url)
      .then(res => res.json())
      .then((res: Results) => {
        res.results.forEach(result => {
          results.value.push(result)
        })
      });
    event.target.complete()
  }, 1000);
}
</script>

<template>
  <ion-content>
    <ion-refresher @ion-refresh="onRefresh($event)" slot="fixed">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list>
      <ion-item-group>
        <template v-for="result in results" :key="result.salmon_id">
          <CoopOverview :result="result" />
        </template>
      </ion-item-group>
    </ion-list>
    <ion-infinite-scroll @ion-infinite="getResults($event)">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>
