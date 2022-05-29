<script setup lang="ts">
import { ref } from '@vue/reactivity'
const { t, availableLocales, locale } = useI18n()

interface Result {
  salmon_id: number
  golden_ikura_num: number
  ikura_num: number

}

interface Results {
  limit: number
  offset: number
  results: Result[]
}

const results: Results = ref<Results>(await (await fetch('https://api-dev.splatnet2.com/v1/results?order=false')).json())
</script>

<template>
  <div class="stats-detail">
    <div class="personal-stats-wrapper" />
    <div class="coop-stats">
      <ul class="coop-stats-list">
        <li>
          <a class=" internal-link" href="/coop/results/2296">
            <ul class="coop-stats-list-content clear">
              <li class="job-result">Clear!</li>
              <li class="grade">Profreshional <span class="grade-point">620</span><span class="up" /></li>
              <li class="ikura-result">
                <p class="golden-ikura">
                  <span class="screen-reader-text">Golden Eggs collected</span>
                  <span class="num">44</span>
                </p>
                <p class="ikura">
                  <span class="screen-reader-text" />
                  <span class="num">734</span>
                </p>
              </li>
            </ul>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.coop-stats-list-content {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    background: rgba(0,0,0,.75);
    margin-bottom: 8px;
    height: 48px;
    border-radius: 24px;
}

.num::before {
  content: "X";
  font-size: 11px;
  padding-right: 2px;
}

.golden-ikura, .ikura {
  position: relative;
  line-height: 20px;
  padding: 0 12px 0 26px;
}

p {
  margin: 0;
  padding: 0;
}

.golden-ikura:before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  content: "";
  background-repeat: no-repeat;
  background-position: 50%;
  height: 20px;
  width: 24px;
  background-image: url(/images/bundled/3aa6fb4ec1534196ede450667c1183dc.png);
  background-size: 18px 18px;
}
.ikura:before {
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  content: "";
  background-repeat: no-repeat;
  background-position: 50%;
  height: 20px;
  width: 24px;
  background-image: url(/images/bundled/efe826cfd1d44d19153f08e19f6caa2a.png);
  background-size: 20.5px 15px;
}

.screen-reader-text {
    position: absolute!important;
    clip: rect(1,1,1,1);
    display: none;
}
</style>
