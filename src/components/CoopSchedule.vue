<script setup lang="ts">
import { IonItem, IonImg, IonCol, IonRow, IonGrid } from '@ionic/vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n'
import { CoopResult } from './@types/result';
import { weaponURL } from './@types/function';

const { t, availableLocales, locale } = useI18n()

const props = defineProps<{
  schedule: CoopResult.Schedule
}>()
</script>

<template>
  <ion-item button :router-link="`/schedules/${dayjs(props.schedule.start_time).unix()}`">
    <ion-grid>
      <ion-row>
        <ion-col>
          {{ dayjs(props.schedule.start_time).format("MM/DD HH:mm:ss") }} - {{
              dayjs(props.schedule.end_time).format("MM/DD HH:mm:ss")
          }}
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          {{ t(`stage_name.${props.schedule.stage_id}`) }}
        </ion-col>
        <template v-for="weaponId in props.schedule.weapon_list" :key="weaponId">
          <ion-img class="coop-weapon-list-item" :src="weaponURL(weaponId)"></ion-img>
        </template>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>
