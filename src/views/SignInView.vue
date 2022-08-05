<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonInput, toastController, IonItemGroup, onIonViewDidEnter } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import CoopHeader from '@/components/CoopHeader.vue';
import { ref, Ref } from 'vue';
import axios, { AxiosError } from "axios";
import { OAuth } from '@/components/@types/oauth';

type SplatNet2 = OAuth.SplatNet2

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
  ).json()) as OAuth.OAuth;
  verifier.value = session_token_verifier;
  window.open(oauthURL, '_blank');
}

function signOut() {
  localStorage.removeItem('account')
  account.value = null
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
    account.value = JSON.parse(response) as OAuth.SplatNet2

    const toast = await toastController
      .create({
        message: `${account.value.nickname}さんでログインしました`,
        duration: 3000
      })
    inProgress.value = false
    return toast.present()
  } catch (error) {
    const { error_description, errorMessage } = ((error as AxiosError).response?.data as OAuth.APIError)
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
          <ion-button slot="end">{{ t("messages.link") }}</ion-button>
        </ion-item>
        <ion-item-group v-if="account === null">
          <ion-item>
            <ion-label slot="start">{{ t("authentication.splatnet2") }}</ion-label>
            <ion-button slot="end" @click="getOAuthURL">{{ t("messages.link") }}</ion-button>
          </ion-item>
          <ion-item>
            <ion-input :clear-input="true" :clear-on-edit="true" pattern="password"
              :placeholder="t('messages.paste_oauth_url')" v-model="session_token_code">
            </ion-input>
            <ion-button @click="getCookie" :disabled="inProgress">{{ t("messages.link") }}</ion-button>
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
            <ion-button slot="end" @click="signOut">{{ t("authentication.sign_out") }}</ion-button>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
