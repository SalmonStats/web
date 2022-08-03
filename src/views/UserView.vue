<script setup lang="ts">
import { IonPage, IonContent, IonFab, IonFabButton, IonIcon, toastController, onIonViewDidEnter, IonItem, IonButton } from '@ionic/vue';
import { syncOutline } from 'ionicons/icons';
import CoopHeader from '@/components/CoopHeader.vue';
import PlayerView from '@/components/Player/PlayerView.vue';
import { APIError, SplatNet2 } from './SignInView.vue';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { onMounted, Ref, ref } from 'vue';

enum Status {
  Updated = "updated",
  Created = "created"
}

interface Result {
  salmon_id: number
  status: Status
}

interface Results {
  results: Result[]
}

const account: Ref<SplatNet2 | null> = ref<SplatNet2>((() => {
  const account = localStorage.getItem('account')
  if (account) {
    return JSON.parse(account)
  }
  return null
})())

async function authorize(session_token: string): Promise<string> {
  const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/authorize/`
  const parameters = {
    'session_token': session_token
  }

  const { iksm_session } = (await axios.post(url, parameters)).data as SplatNet2
  console.log(iksm_session)
  return iksm_session
}

async function getResults() {
  const toast = await toastController.create({
    message: "リザルト取得中です",
    duration: 5000,
    animated: true
  })
  toast.present()

  try {
    // アカウント情報がなければ何もしない
    if (account.value === null) {
      return
    }

    // 有効期限が切れていたら自動的に更新する
    if (account.value.expires_in <= dayjs().unix()) {
      account.value.iksm_session = await authorize(account.value.session_token)
    }

    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/authorize/results`;
    const parameters = {
      "iksm_session": account.value.iksm_session,
      'result_id': account.value.summary.job_num - 50,
    }

    // リザルト取得とアップロードを完了
    const response = await axios.post(url, parameters)

    if (response.status === 204) {
      toast.message = "新しいリザルトはありませんでした"
    }

    if (response.status === 200) {
      const results = response.data as Results
      toast.message = "リザルトを取得しました"
    }

    if (account.value !== null) {
      account.value.expires_in = dayjs().unix() + 86400
      // account.value.summary.job_num 
      localStorage.setItem('account', JSON.stringify(account.value))
    }
  } catch (error) {
    const { error_description, errorMessage } = (error as AxiosError).response?.data as APIError
    toast.message = error_description ?? errorMessage
  }
}

onIonViewDidEnter(() => {
  account.value = (() => {
    const account = localStorage.getItem('account')
    if (account) {
      return JSON.parse(account)
    }
    return null
  })()
})
</script>

<template>
  <ion-page>
    <CoopHeader title="User" />
    <ion-content :fullscreen="true">
      <PlayerView />
      <ion-fab vertical="bottom" horizontal="end" slot="fixed" v-if="account !== null">
        <ion-fab-button @click="getResults">
          <ion-icon :icon="syncOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
