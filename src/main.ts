import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue, isPlatform } from "@ionic/vue";
import "./registerServiceWorker";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Theme fonts */
import "./assets/sass/style.scss";
import "./theme/style.scss";

/* Google Analytics */
import VueGtag from "vue-gtag-next";

/* I18n */
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "ja",
  allowComposition: true,
  messages: {
    ja: require("/locales/ja.yaml"),
    en: require("/locales/en.yaml"),
  },
  fallbackLocale: "en",
  fallbackRoot: true,
  availableLocales: ["en", "ja"],
});

const app = createApp(App)
  .use(IonicVue, {
    animated: true,
    rippleEffect: false,
    mode: "md",
    // swipeBackEnabled: false,
  })
  .use(router)
  .use(i18n)
  .use(VueGtag, { property: { id: "", router } });

app.config.globalProperties.$baseURL = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}`;

router.isReady().then(() => {
  app.mount("#app");
});
