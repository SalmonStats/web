<script setup lang="ts">
import { IonHeader, IonToolbar, IonButton, IonMenuButton, IonButtons, IonTitle, IonIcon, IonChan } from '@ionic/vue';
import { contrastOutline, languageOutline } from 'ionicons/icons';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

interface Props {
  title: string
}

const props = defineProps<Props>();
const { t, availableLocales, locale } = useI18n()

function changeLanguages() {
  const index = (availableLocales.indexOf(locale.value) + 1) % availableLocales.length;
  locale.value = availableLocales[index]
}

onMounted(() => {
  // デバイスの設定を取得して反映させる
  const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.body.setAttribute('color-scheme', prefersTheme ? 'dark' : 'light')
})

function changeTheme() {
  const theme = document.body.getAttribute('color-scheme') === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('color-scheme', theme)
}
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button :auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button @click="changeLanguages">
          <ion-icon slot="icon-only" :icon="languageOutline"></ion-icon>
        </ion-button>
        <ion-button @click="changeTheme()">
          <ion-icon slot="icon-only" :icon="contrastOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

