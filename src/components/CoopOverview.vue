<script setup lang="ts">
import { IonItem, IonRow, IonCol, IonGrid, IonImg, IonLabel } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { CoopResult } from 'types/coop';
import { weaponURL } from '@/functions';
import dayjs from 'dayjs';

type Result = CoopResult.Result
const { t } = useI18n()

const props = defineProps<{
  result: Result
}>()

</script>

<template>
  <ion-item button :router-link="`/results/${result.salmon_id}`">
    <div class="coop-result">
      <section class="job-result">
        <ion-label>
          {{ t(`job_result.${props.result.job_result.is_clear}`) }}
        </ion-label>
        <ion-label>
          {{ props.result.danger_rate }}%
        </ion-label>
      </section>
      <section class="wave-result">
        <template v-for="wave in props.result.waves" :key="wave.quota_num">
          <ion-label>
            {{ t(`water_level.${wave.water_level}`) }} {{ t(`event_type.${wave.event_type}`) }}
          </ion-label>
        </template>
      </section>
      <section class="supplied-weapons">
        <div class="coop-weapons-wrapper">
          <div class="coop-weapons">
            <ul class="coop-weapons-list">
              <template v-for="weaponId in props.result.schedule.weapon_list" :key="weaponId">
                <li>
                  <ion-img :src="weaponURL(weaponId)"></ion-img>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div>
          <ion-label class="golden-ikura num">{{ props.result.golden_ikura_num }}</ion-label>
          <ion-label class="ikura num">{{ props.result.ikura_num }}</ion-label>
        </div>
      </section>
    </div>
  </ion-item>
</template>

<style lang="scss" scoped>
.coop-result {
  padding-top: 4px;
  width: 100%;
}

section {
  &.job-result {
    min-width: 60px;
    max-width: 60px;
    width: 20%;
  }

  &.wave-result {
    width: calc(100% - 197px);
  }

  &.supplied-weapons {
    min-width: 132px;
    max-width: 132px;
    width: 132px;
    text-align: right;
  }
}

ion-label {
  font-size: 0.9rem !important;
}

.coop-weapons-wrapper {}

.coop-weapons {
  display: flex;
  background: var(--ion-color-background-secondary);
  border-radius: 15px;
  align-items: center;
  padding: 0 6px;
  line-height: 0;
}

li {
  display: inline-block;
}

ul {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
}

ion-img {
  width: 30px;
  height: auto;
}

div.coop-result {
  display: flex;
}
</style>
