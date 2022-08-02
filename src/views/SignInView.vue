<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonInput, toastController, IonItemGroup, onIonViewDidEnter } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import CoopHeader from '@/components/CoopHeader.vue';
import { onMounted, ref, Ref } from 'vue';
import axios, { AxiosError } from "axios";

export interface CoopSummary {
  golden_ikura_total: number
  ikura_total: number
  help_total: number
  job_num: number
  kuma_point: number
  kuma_point_total: number
}

export interface APIError {
  error: string;
  error_description: string;
  errorMessage: string;
}

export interface SplatNet2 {
  nickname: string;
  nsaid: string;
  session_token: string;
  iksm_session: string;
  thumbnail_url: string;
  expires_in: number;
  friend_code: string
  summary: CoopSummary
}

interface OAuth {
  oauthURL: string;
  session_token_verifier: string;
}

const { t, availableLocales, locale } = useI18n()
const account: Ref<SplatNet2 | null> = ref<SplatNet2>((() => {
  const account = localStorage.getItem('account')
  if (account) {
    return JSON.parse(account)
  }
  return null
})())

const inProgress: Ref<boolean> = ref(false)
const verifier: Ref<string> = ref<string>('')
const session_token_code: Ref<string> = ref<string>('')

async function getOAuthURL() {
  const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/authorize`;
  const { session_token_verifier, oauthURL } = (await (
    await fetch(url)
  ).json()) as OAuth;
  verifier.value = session_token_verifier;
  window.open(oauthURL, '_blank');
}

async function openToast() {
  const toast = await toastController
    .create({
      message: "ログインしました",
      duration: 2000
    })
  return toast.present()
}

function signOut() {
  localStorage.removeItem('account')
  account.value = null
}

function resetResultId() {
  if (account.value === null) {
    return
  }
  account.value.summary.job_num -= 5
  localStorage.setItem('account', JSON.stringify(account.value))
  console.log(account.value)
}

function resetExpiresIn() {
  if (account.value === null) {
    return
  }
  account.value.expires_in = 0
  localStorage.setItem('account', JSON.stringify(account.value))
  console.log(account.value)
}

async function getCookie() {
  inProgress.value = true
  const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/authorize/login`;
  const parameters = {
    session_token_code_verifier: verifier.value,
    session_token_code: session_token_code.value,
  };
  try {
    const response = JSON.stringify((await axios.post(url, parameters)).data);
    localStorage.setItem('account', response)
    account.value = JSON.parse(response) as SplatNet2

    const toast = await toastController
      .create({
        message: `${account.value.nickname}さんでログインしました`,
        duration: 3000
      })
    inProgress.value = false
    return toast.present()
  } catch (error) {
    const { error_description, errorMessage } = ((error as AxiosError).response?.data as APIError)
    const toast = await toastController
      .create({
        message: error_description ?? errorMessage,
        duration: 2000
      })
    inProgress.value = false
    return toast.present()
  }
}

onIonViewDidEnter(() => {
  console.log(account.value)
})
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <CoopHeader title="SignIn" />
      <ion-list>
        <ion-item>
          <ion-label slot="start">Twitter</ion-label>
          <ion-button slot="end">連携する</ion-button>
        </ion-item>
        <ion-item-group v-if="account === null">
          <ion-item>
            <ion-label slot="start">イカリング2</ion-label>
            <ion-button slot="end" @click="getOAuthURL">認証する</ion-button>
          </ion-item>
          <ion-item>
            <ion-input :clear-input="true" :clear-on-edit="true" pattern="password" placeholder="URLをペーストしてください"
              v-model="session_token_code">
            </ion-input>
            <ion-button @click="getCookie" :disabled="inProgress">連携</ion-button>
          </ion-item>
        </ion-item-group>
        <ion-item-group v-if="account !== null">
          <!-- <ion-item>
            <ion-label slot="start">バイト回数リセット</ion-label>
            <ion-button slot="end" @click="resetResultId">リセット</ion-button>
          </ion-item>
          <ion-item>
            <ion-label slot="start">有効期限リセット</ion-label>
            <ion-button slot="end" @click="resetExpiresIn">リセット</ion-button>
          </ion-item> -->
          <ion-item>
            <ion-label slot="start">{{ account.nickname }}</ion-label>
            <ion-button slot="end" @click="signOut">ログアウト</ion-button>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
