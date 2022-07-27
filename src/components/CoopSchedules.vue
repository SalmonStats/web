<script setup lang="ts">
import { IonList, IonContent } from '@ionic/vue';
import { onMounted, ref, Ref, getCurrentInstance } from 'vue';
import CoopSchedule, { Schedule, Schedules } from './CoopSchedule.vue';

const app = getCurrentInstance()
const schedules: Ref<Schedule[]> = ref<Schedule[]>([])

onMounted(() => {
  const baseURL = app?.appContext.config.globalProperties.$baseURL
  if (baseURL === null) {
    return
  }

  const url = `${baseURL}/schedules`
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
</script>

<template>
  <ion-content>
    <ion-list>
      <template v-for="schedule in schedules" :key="schedule.start_time">
        <CoopSchedule :schedule="schedule" />
      </template>
    </ion-list>
  </ion-content>
</template>
