<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonRefresherContent, IonLabel, toastController } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonLabel,
  },
  setup() {
    const { t } = useI18n()
    const results: Ref<Result[]> = ref<Result[]>([]);
    return { results, t };
  },
  mounted: function () {
    this.onReload();
  },
  props: {
    nsaid: {
      type: String,
      required: false
    },
  },
  methods: {
    async onReload() {
      console.log("Results: =>", this.nsaid)
      const url: string = (() => {
        return this.nsaid === undefined
          ? `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results`
          : `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results?nsaid=${this.nsaid}`
      })()
      fetch(url).then(response => response.json()).then(response => {
        if (this.results.length !== 0) {
          // 取得したリザルト件数を表示
          const currentSalmonId: number = this.results[0].salmon_id
          this.openToast(this.results[0].salmon_id - currentSalmonId);
        }
        this.results = response.results;
      });
    },
    async openToast(diff: number) {
      const toast = await toastController.create({
        message: this.t('message.new_results', { salmon_id: diff }),
        duration: 2500
      });
      return toast.present();
    },
    onRefresh(event: CustomEvent) {
      this.onReload().then(() => event.detail.complete());
    },
  },
});
</script>

<template>
  <ion-content>
    <ion-list>
      <ion-item v-for="result in results" :key="result.salmon_id">
        <ion-label slot="start">
          <p>{{ result.salmon_id }}</p>
          <p>{{ result.job_result.is_clear }}</p>
          <p>{{ result.danger_rate }}</p>
        </ion-label>
        <ion-label slot="start">
          <ion-label v-for="wave in result.waves" :key="wave.quota_num">
            <p>{{ wave.water_level }} {{ wave.event_type }}</p>
          </ion-label>
        </ion-label>
        <ion-label slot="end">
          <p>{{ result.golden_ikura_num }}</p>
          <p>{{ result.ikura_num }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
