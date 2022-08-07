<script setup lang="ts">
import { IonItem, IonGrid, IonRow, IonCol, IonImg } from '@ionic/vue';
import { CoopResult } from "types/coop";
import "@/math/array"
import { weaponURL, specialURL } from "@/functions"

type Result = CoopResult.PlayerResult

const props = defineProps<{
  player: Result
}>()
</script>

<template>
  <ion-item button :router-link="`/users/${props.player.nsaid}`">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-row>
            {{ player.name }}
          </ion-row>
          <ion-row>
            <template v-for="weaponId in props.player.weapon_list" :key="weaponId">
              <ion-img :src="weaponURL(weaponId)" class="supplied-weapon-list-item" />
            </template>
            <ion-img :src="specialURL(props.player.special_id)" class="supplied-special-item" />
          </ion-row>
        </ion-col>
        <ion-col size="auto">
          <ion-row class="ion-justify-content-end">{{ player.grade_point ?? "-" }}</ion-row>
          <ion-row class="ion-justify-content-end num golden-ikura">{{ props.player.golden_ikura_num }}</ion-row>
          <ion-row class="ion-justify-content-end num ikura">{{ props.player.help_count }}</ion-row>
        </ion-col>
        <ion-col size="auto" style="min-width:40px;">
          <ion-row class="ion-justify-content-end num ikura">{{ player.boss_kill_counts.sum() }}</ion-row>
          <ion-row class="ion-justify-content-end num ikura">{{ props.player.ikura_num }}</ion-row>
          <ion-row class="ion-justify-content-end num ikura">{{ props.player.dead_count }}</ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>
