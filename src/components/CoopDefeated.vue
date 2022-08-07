<script setup lang="ts">
import { IonItem, IonGrid, IonRow, IonCol, IonImg, IonLabel } from '@ionic/vue';
import { CoopResult } from "types/coop";
import "@/math/array"
import { weaponURL, specialURL, bossURL } from "@/functions"
import { onMounted } from 'vue';

type Result = CoopResult.Result

const props = defineProps<{
  result: Result
}>()

onMounted((() => {
  console.log(props.result)
}))
</script>

<template v-if="props.result !== undefined">
  <ion-item>
    <template v-for="(value, index) in result.boss_counts" :key="index">
      <section>
        <ion-img :src="bossURL(index)"></ion-img>
        <ion-label>
          {{ value }}
        </ion-label>
      </section>
    </template>
  </ion-item>
</template>

<style lang="scss" scoped>
section {
  width: calc(100% / 9);
}

ion-label {
  text-align: center;
}
</style>
