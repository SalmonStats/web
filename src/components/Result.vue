<script setup lang="ts">
import { ref } from '@vue/reactivity'
const { t, availableLocales, locale } = useI18n()

interface WaveResult {
  event_type: number
  water_level: number
  golden_ikura_num: number
  golden_ikura_pop_num: number
  quota_num: number
  ikura_num: number
}

interface Result {
  salmon_id: number
  golden_ikura_num: number
  ikura_num: number
  members: string[]
  waves: WaveResult[]
}

enum WaterLevel {
  low = 'result.low_tide',
  normal = 'result.normal_tide',
  hight = 'result.high_tide',
}

const result: Result = ref<Result>(await (await fetch('https://api-dev.splatnet2.com/v1/results/1')).json())
</script>

<template>
  <div class="coop-result">
    <section class="wave-card-wrapper">
      <ul class="wave">
        <li v-for="(wave, index) in result.waves" :key="wave.quota_num">
          <ul class="wave-card">
            <li class="wave-result gj">
              ✓
            </li><li class="wave-num">
              Wave {{ index + 1 }}
            </li><li class="quota-num">
              {{ wave.golden_ikura_num }}/{{ wave.quota_num }}
            </li><li class="water-level low">
              {{ wave.water_level }}
            </li><li class="event-type">
              {{ wave.event_type }}
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss">
.coop-result .wave .wave-card {
  .wave-result {
    position: absolute;
    right: 1px;
    top: -8px;
    text-align: center;
    text-shadow: 1px 1px 0 #000;

    &.gj {
      color: #39e464
    }
  }

  .wave-num {
    font-size: 17px;
    padding: 16px 0 3px;
  }

  .quota-num {
    font-size: 25px;
    color: #fff;
    background: #2a270b;
    padding: 2px 0;
    margin-bottom: 6px;
  }
}
.coop-result {
  position: relative;
  z-index: 1001;

  .wave-card-wrapper {
    position: relative;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 0 16px 50px;
    text-align: center;
    box-sizing: border-box;
    z-index: 1;

    &::before {
      position: absolute;
      display: block;
      content: "";
      width: 188px;
      height: 162px;
      background: #39e464;
      -webkit-mask-image: url(/images/bundled/97bed10b1efcf3fccacd59cc88740b2e.svg);
      -webkit-mask-position: center;
      -webkit-mask-repeat: no-repeat;
      top: -50px;
      left: calc(50% - 280px);
      opacity: .6;
      z-index: -1;
    }
  }

  .wave {
    justify-content: center;
    line-height: 1.3;
    font-family: Splatoon2;
    display: flex;

    li {
      &:not(:last-child) {
        margin-right: 8px;
      }

      &::before {
        background: #e5f100 url(/images/bundled/3be424b57f616fc54f4b33e32ee4d964.png);
        background-size: 80px 80px;
        z-index: -1;
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        // -webkit-mask-image: url(/images/bundled/61ef407221896a5099d60c82250efb51.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position-x: conter;
        -webkit-mask-position-y: top;
        -webkit-mask-size: 200px 230px;
      }

      &::after {
        background: #000;
        left: 2px;
        top: 2px;
        opacity: .4;
        z-index: -2;
      }

      position: relative;
      color: #000;
      padding-bottom: 16px;
      border-radius: 3px;
      width: calc(100%/3 - 16px/3);
      transform: rotate(-2deg);
      will-change: transform;
    }
  }

  .wave-detail {
    display: flex;
    font-family: Splatoon2;
  }

  .stage-wrapper {
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 230px;
    background-size: cover;
    z-index: 0;
  }
  .wave {
    &::before {
      background: #e5f100;
    }
  }
}
</style>
