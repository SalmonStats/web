<script setup lang="ts">
import { IonPage, IonContent, IonInput, IonItem, IonButton } from '@ionic/vue';
import { syncOutline } from 'ionicons/icons';
import CoopHeader from '@/components/CoopHeader.vue';
import PlayerView from '@/components/Player/PlayerView.vue';
import { APIError, SplatNet2 } from './SignInView.vue';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
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

function getPlayers() {
  const baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;
  if (inputText.value.length === 0) {
    return
  }
  const parameters = {
    "offset": 0,
    "limit": 25,
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
      <ion-item>
        <ion-input :placeholder="t('messages.input_username')" :autofocus="true" v-model="inputText"
          v-on:keyup.enter="getPlayers">
        </ion-input>
        <ion-button @click="getPlayers">{{ t("messages.search") }}</ion-button>
      </ion-item>
      <PlayerList :players="players" />
    </ion-content>
  </ion-page>
</template>
