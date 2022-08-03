<script setup lang="ts">
import {
  IonItem, IonAvatar, IonImg, IonLabel, IonIcon, IonItemGroup
} from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { Player } from '../@types/player'
import { sparklesOutline, informationCircle } from 'ionicons/icons';

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
  <ion-item :router-link="`/users/${player.nsaid}/results`">
    <ion-label>
      {{ t("results.list") }}
    </ion-label>
    <ion-label slot="end">
      {{ t("results.latest", {
          win: player.is_clear, lose: player.is_failure
        })
      }}
    </ion-label>
    <ion-icon :icon="informationCircle" slot="end">
    </ion-icon>
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
