<script setup lang="ts">
import { IonList, IonContent, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/vue';
import { onMounted, ref, Ref, getCurrentInstance } from 'vue';
import CoopSchedule, { Schedule, Schedules } from './CoopSchedule.vue';

const app = getCurrentInstance()
const schedules: Ref<Schedule[]> = ref<Schedule[]>([])
const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;

onMounted(() => {
  const url = `${baseURL}/schedules?limit=10`
  fetch(url)
    .then(res => res.json())
    .then((res: Schedules) => {
      schedules.value = res.results;
      console.log(schedules.value)
    })
    .catch(error => {
      console.error(error);
    });
})

function onRefresh(event: CustomEvent) {
  const url = `${baseURL}/schedules`
  setTimeout(() => {
    fetch(url)
      .then(res => res.json())
      .then((res: Schedules) => {
        schedules.value = res.results;
      })
      .catch(error => {
        console.error(error);
      });
  }, 1000);
}

function getSchedules(event: InfiniteScrollCustomEvent) {
  const url = `${baseURL}/schedules?limit=10&offset=${schedules.value.length}`
  setTimeout(() => {
    fetch(url)
      .then(res => res.json())
      .then((res: Schedules) => {
        res.results.forEach(schedule => {
          schedules.value.push(schedule)
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
      <template v-for="schedule in schedules" :key="schedule.start_time">
        <CoopSchedule :schedule="schedule" />
      </template>
    </ion-list>
    <ion-infinite-scroll @ion-infinite="getSchedules($event)">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>
