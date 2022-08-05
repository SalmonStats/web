<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { IonList, IonContent, IonItemGroup, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n'
import { CoopResult } from './@types/result';
import CoopOverview from './CoopOverview.vue';
import { Paginated } from './@types/common';

type Result = CoopResult.Result

const { t } = useI18n()
const results: Ref<Result[]> = ref([]);
const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;
const route = useRoute()
const url = (() => {
  const { player_id } = route.params
  console.log(player_id)
  if (player_id === undefined) {
    return `${baseURL}/results?limit=15`
  }
  return `${baseURL}/results?limit=10&nsaid=${player_id}`
})()

onMounted(() => {
  fetch(url)
    .then(res => res.json())
    .then((res: Paginated<Result>) => {
      results.value = res.results;
    });
});

function onRefresh(event: CustomEvent) {
  setTimeout(() => {
    fetch(url)
      .then(res => res.json())
      .then((res: Paginated<Result>) => {
        results.value = res.results;
      });
    event.detail.complete();
  }, 1000);
}

function getResults(event: InfiniteScrollCustomEvent) {
  const url = (() => {
    const { player_id } = route.params
    console.log(player_id)
    if (player_id === undefined) {
      return `${baseURL}/results?limit=50&offset=${results.value.length}`
    }
    return `${baseURL}/results?limit=50&offset=${results.value.length}&nsaid=${player_id}`
  })()
  setTimeout(() => {
    fetch(url)
      .then(res => res.json())
      .then((res: Paginated<Result>) => {
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
      <template v-for="result in results" :key="result.salmon_id">
        <CoopOverview :result="result" />
      </template>
    </ion-list>
    <ion-infinite-scroll @ion-infinite="getResults($event)">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>
