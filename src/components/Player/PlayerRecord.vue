<script setup lang="ts">
import { IonIcon, IonItem, IonRow, IonCol, IonGrid } from '@ionic/vue';
import { StageResult } from '../@types/stats'
import { useI18n } from 'vue-i18n';
import { sunnyOutline, moonOutline } from 'ionicons/icons';

const { t } = useI18n()
const props = defineProps<{
  record: StageResult
}>()
</script>

<template v-for="record in player?.stage_results" :key="record.stage_id">
  <ion-item>
    <ion-grid>
      <ion-row>
        <ion-col>{{ t(`stage_name.${record.stage_id}`) }}</ion-col>
        <ion-col size="auto">
          <ion-row>
            <ion-icon size="small" :icon="moonOutline" class="night-icon"></ion-icon>
          </ion-row>
          <ion-row>
            <ion-icon size="small" :icon="sunnyOutline" class="night-icon"></ion-icon>
          </ion-row>
        </ion-col>
        <ion-col size="auto" style="min-width: 50px !important;">
          <ion-row class="ion-justify-content-end num golden-ikura">{{ record.night.team_results.golden_ikura_num }}
          </ion-row>
          <ion-row class="ion-justify-content-end num ikura">{{ record.nightless.team_results.golden_ikura_num }}
          </ion-row>
        </ion-col>
        <ion-col size="auto" style="min-width: 50px !important;">
          <ion-row class="ion-justify-content-end num golden-ikura">{{ record.night.player_results.golden_ikura_num }}
          </ion-row>
          <ion-row class="ion-justify-content-end num ikura">{{ record.nightless.player_results.golden_ikura_num }}
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<style lang="scss" scoped>
.night-icon {
  margin-bottom: 2px;
}
</style>
