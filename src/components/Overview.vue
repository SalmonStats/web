<script setup lang="ts">
import { ref } from '@vue/reactivity'
const { t, availableLocales, locale } = useI18n()

interface JobResult {
  is_clear: boolean
}

interface Result {
  salmon_id: number
  golden_ikura_num: number
  ikura_num: number
  job_result: JobResult
  members: string[]
}

interface Results {
  limit: number
  offset: number
  results: Result[]
}

const iksm_session = '85d88ed05c05bf2b290d01b1c03429d7dab9adc0'
const results: Results = ref<Results>(await (await fetch('https://api-dev.splatnet2.com/v1/results?order=false')).json())
</script>

<template>
  <div class="stats-detail">
    <div class="personal-stats-wrapper" />
    <div class="coop-stats">
      <ul class="coop-stats-list">
        <li v-for="result in results.results" :key="result.salmon_id">
          <router-link class=" internal-link" :to="`/results/${result.salmon_id}`">
            <ul class="coop-stats-list-content" :class="{ clear: result.job_result.is_clear, failure: !result.job_result.is_clear }">
              <li class="job-result">
                {{ result.job_result.is_clear ? t("job_result.is_clear") : t("job_result.is_failure") }}
              </li>
              <li class="grade">
                Profreshional
                <span class="grade-point">620</span>
                <!-- <span class="up" /> -->
              </li>
              <li class="ikura-result">
                <p class="golden-ikura">
                  <span class="screen-reader-text">Golden Eggs collected</span>
                  <span class="num">{{ result.golden_ikura_num }}</span>
                </p>
                <p class="ikura">
                  <span class="screen-reader-text" />
                  <span class="num">{{ result.ikura_num }}</span>
                </p>
              </li>
            </ul>
          </router-link>
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

.golden-ikura {
  position: relative;
  line-height: 20px;
  padding: 0 12px 0 26px;
  text-align: left;
}

.ikura {
  position: relative;
  line-height: 20px;
  padding: 0 12px 0 26px;
  text-align: left;
}

p {
  margin: 0;
  padding: 0;
}

a {
  cursor: pointer;
}

.ikura-result {
  flex-grow: 0;
  width: 80px;
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

.coop-stats-list {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 10px;
    line-height: 1;
    box-sizing: border-box;
}

.coop-stats-list-content.clear .job-result {
  color: #39e464;
  font-family: Splatoon1;
  width: 70px;
  font-size: 14px;
}

.coop-stats-list-content.failure .job-result {
  color: #ff7500;
  font-family: Splatoon1;
  width: 70px;
  font-size: 14px;
}

.coop-stats-list-content.clear .grade {
  color: #fff;
  font-family: Splatoon1;
  font-size: 14px;
  flex-grow: 1;
}

.coop-stats-list-content.failure .grade {
  color: #777;
  font-family: Splatoon1;
  font-size: 14px;
  flex-grow: 1;
}

.coop-stats-list-content .up {
    display: inline-block;
    background-image: url(/images/bundled/ae680e6….png);
    margin-left: 8px;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    vertical-align: middle;
}
</style>
