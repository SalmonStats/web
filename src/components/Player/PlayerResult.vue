<script setup lang="ts">
import { IonItem, IonAvatar, IonImg, IonLabel, IonRow, IonCol, IonIcon, IonItemGroup, IonGrid } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { Player } from '../@types/player'
import { sparklesOutline } from 'ionicons/icons';

const { t } = useI18n()
const props = defineProps<{
  player: Player
}>()
</script>

<template>
  <ion-item-group>
    <ion-item>
      <ion-avatar slot="start">
        <ion-img :src="props.player.thumbnail_url"></ion-img>
      </ion-avatar>
      <ion-icon slot="start" :icon="sparklesOutline" class="is-imperial-scholars" v-show="player.is_imperial_scholars">
      </ion-icon>
      <ion-label slot="end">{{ props.player.nickname }}</ion-label>
    </ion-item>
  </ion-item-group>
  <ion-item>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-row>
            {{ t("rank_type.ikura_num") }}
          </ion-row>
          <ion-row>
            {{ t("rank_type.job_num") }}
          </ion-row>
        </ion-col>
        <ion-col size="auto" style="min-width: 50px !important;">
          <ion-row class="ion-justify-content-end num ikura">
            {{ player.ikura_num }}
          </ion-row>
          <ion-row class="ion-justify-content-end num golden-ikura">
            {{ player.is_clear }}
          </ion-row>
        </ion-col>
        <ion-col size="auto" style="min-width: 50px !important;">
          <ion-row class="ion-justify-content-end num">
            {{ player.golden_ikura_num }}
          </ion-row>
          <ion-row class="ion-justify-content-end num">
            {{ player.is_failure }}
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<style lang="scss" scoped>
.is-imperial-scholars {
  color: yellow;
  width: 16px;
  height: 16px;
  margin-top: -20px;
}

ion-avatar {
  margin-right: 4px;
}
</style>
