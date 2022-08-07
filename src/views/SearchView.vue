<script setup lang="ts">
import { IonPage, IonContent, IonSearchbar, IonItem, IonButton, isPlatform, IonLabel } from '@ionic/vue';
import CoopHeader from '@/components/CoopHeader.vue';
import axios, { AxiosError } from 'axios';
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import PlayerList from '@/components/PlayerList.vue';

export interface Player {
  nsaid: string
  nickname: string
  thumbnail_url: string
}

const { t } = useI18n()
const inputText: Ref<string> = ref<string>("");
const players: Ref<Player[]> = ref<Player[]>([]);

function addValue(event: KeyboardEvent) {
  console.log(event)

}

function getPlayers(event: KeyboardEvent) {
  if (event.code !== 'Enter') {
    return
  }

  if (inputText.value.length === 0) {
    players.value = []
    return
  }

  const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;
  // inputText.value = event.data
  const parameters = {
    "offset": 0,
    "limit": 100,
    "nickname": inputText.value
  }
  const url = `${baseURL}/players`
  axios.get(url, { params: parameters })
    .then((res) => res.data)
    .then((res: Player[]) => {
      players.value = res
    })
}
</script>

<template>
  <ion-page>
    <CoopHeader title="Search" />
    <ion-content :fullscreen="true">
      <ion-searchbar enterkeyhint="search" v-model="inputText" input="text" placeholder="まちカドえむいー"
        @keyup.enter="getPlayers"></ion-searchbar>
      <PlayerList :players="players" />
    </ion-content>
  </ion-page>
</template>
