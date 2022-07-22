<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import CoopHeader from '@/components/CoopHeader.vue';
import PieChart from '@/components/Charts/PieChart';
import RadarChart from '@/components/Charts/RadarChart';
import DoughnutChart from '@/components/Charts/DoughnutChart';
import PolarAreaChart from '@/components/Charts/PolarAreaChart';
import BarChart from '@/components/Charts/BarChart';
import LineChart from '@/components/Charts/LineChart';
import BubbleChart from '@/components/Charts/BubbleChart';
</script>

<template>
  <ion-page>
    <CoopHeader title="Stats" />
    <ion-content :fullscreen="true">
      <PieChart />
      <RadarChart />
      <DoughnutChart />
      <PolarAreaChart />
      <LineChart />
      <BarChart />
      <BubbleChart />
    </ion-content>
  </ion-page>
</template>
