<script setup lang="ts">
import { ref } from '@vue/reactivity'

const salmon_id = useRouter().currentRoute.value.params.salmon_id

const { t, availableLocales, locale } = useI18n()
interface WaveResult {
  event_type: number
  water_level: number
  golden_ikura_num: number
  golden_ikura_pop_num: number
  quota_num: number
  ikura_num: number
}

interface JobResult {
  failure_reason?: string
  failure_wave?: number
  is_clear: boolean
}

interface Result {
  salmon_id: number
  golden_ikura_num: number
  ikura_num: number
  members: string[]
  waves: WaveResult[]
  job_result: JobResult
}

enum WaterLevel {
  low = 'result.low_tide',
  normal = 'result.normal_tide',
  hight = 'result.high_tide',
}

const result: Result = ref<Result>(await (await fetch(`https://api-dev.splatnet2.com/v1/results/${salmon_id}`)).json())
</script>

<template>
  <div class="coop-result">
    <section class="wave-card-wrapper">
      <ul class="wave">
        <li v-for="(wave, index) in result.waves" :key="wave.quota_num">
          <ul class="wave-card">
            <li class="wave-result" :class="{ gj: result.job_result.failure_wave !== index + 1, ng: result.job_result.failure_wave === index + 1 }">
              {{ result.job_result.is_clear ? t("result.is_clear") : t("result.is_failure") }}
            </li>
            <li class="wave-num">
              {{ t("result.wave") }} {{ index + 1 }}
            </li>
            <li class="quota-num">
              {{ wave.golden_ikura_num }}/{{ wave.quota_num }}
            </li>
            <li class="water-level" :class="{ high: wave.water_level === 2, normal: wave.water_level === 1, low: wave.water_level === 0 }">
              {{ wave.water_level }}
            </li>
            <li class="event-type">
              {{ wave.event_type }}
            </li>
          </ul>
        </li>
      </ul>
      <ul class="wave-detail">
        <li>
          <p class="golden-ikura-pop-num">
            <span class="golden-ikura-icon screen-reader-text">Golden Eggs collected</span>Appearances <span class="num">57</span>
          </p><ul class="special-count">
            <li><img class="special-image" src="/images/special/18990f646c551ee77c5b283ec814e371f692a553.png" alt="Splat-Bomb Launcher"></li><li><img class="special-image" src="/images/special/7af300fdd872feb27b3d8e68a969457fac8b3bb7.png" alt="Sting Ray"></li>
          </ul>
        </li><li>
          <p class="golden-ikura-pop-num">
            <span class="golden-ikura-icon screen-reader-text">Golden Eggs collected</span>Appearances <span class="num">62</span>
          </p><ul class="special-count" />
        </li><li>
          <p class="golden-ikura-pop-num">
            <span class="golden-ikura-icon screen-reader-text">Golden Eggs collected</span>Appearances <span class="num">61</span>
          </p><ul class="special-count">
            <li><img class="special-image" src="/images/special/18990f646c551ee77c5b283ec814e371f692a553.png" alt="Splat-Bomb Launcher"></li><li><img class="special-image" src="/images/special/9871c82952ed0141be0310ace1942c9f5f66d655.png" alt="Inkjet"></li><li><img class="special-image" src="/images/special/9871c82952ed0141be0310ace1942c9f5f66d655.png" alt="Inkjet"></li><li><img class="special-image" src="/images/special/324d41e9582d84101152849bc8c96d6595c9b0ff.png" alt="Splashdown"></li><li><img class="special-image" src="/images/special/324d41e9582d84101152849bc8c96d6595c9b0ff.png" alt="Splashdown"></li><li><img class="special-image" src="/images/special/7af300fdd872feb27b3d8e68a969457fac8b3bb7.png" alt="Sting Ray"></li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.coop-result .wave .wave-card {
  .quota-num {
    font-size: 25px;
    color: #fff;
    background: #2a270b;
    padding: 2px 0;
    margin-bottom: 6px;
  }

  .event-type {
    font-size: 14px;
    padding: 8px 4px 0;
  }

  .water-level {
    font-size: 14px;
    padding: 8px 4px 0;

    &.high::before {
      height: 45%;
    }

    &.normal::before {
      height: 24%;
    }

    &.low::before {
      height: 10%;
    }
  }

  .water-level::before {
    position: absolute;
    content: "";
    width: 100%;
    background: #000;
    opacity: .2;
    bottom: 0;
    left: 0;
    border-radius: 0 0 3px 3px;
    z-index: -1;
    -webkit-mask-image: url(/images/bundled/4017bbe823c4bff0aadfe9ffa832fa0f.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position-x: center;
    -webkit-mask-position-y: top;
    -webkit-mask-size: cover;
  }

  .wave-num {
    font-size: 17px;
    padding: 16px 0 3px;
  }

  .wave-result {
    position: absolute;
    right: 1px;
    top: -8px;
    text-align: center;
    text-shadow: 1px 1px 0 #000;

    &.gj {
      color: #39e464;
      font-size: 15px;
    }

    &::before {
      position: absolute;
      display: block;
      content: "";
      width: 43px;
      height: 46px;
      top: 50%;
      left: 50%;
      margin: -3px 1px 0;
      transform: translate(-50%, -50%);
      background: #000;
      -webkit-mask-image: url(/images/bundled/85fa09f4dd66dd7f3637edc5994ae985.svg);
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      -webkit-mask-size: contain;
      z-index: -1;
    }
  }
}

.coop-result {
  .wave {
    display: flex;
    justify-content: center;
    line-height: 1.3;

    > li {
      position: relative;
      color: #000;
      padding-bottom: 16px;
      border-radius: 3px;
      width: calc(100%/3 - 16px/3);
      transform: rotate(-2deg);
      will-change: transform;

      &:not(:last-child) {
        margin-right: 8px;
      }

      &::after {
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        -webkit-mask-image: url(/images/bundled/61ef407221896a5099d60c82250efb51.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position-x: center;
        -webkit-mask-position-y: top;
        -webkit-mask-size: 200px 230px;
        background: #000;
        left: 2px;
        top: 2px;
        opacity: 0.4;
        z-index: -2;
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
      }
    }
  }

  .wave-detail {
    justify-content: center;
    position: relative;
    color: #fff;
    left: 3px;
    display: flex;

    .special-count {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      li {
        &:not(:last-child) {
          margin-right: 3px;
        }

        position: relative;
        width: 22px;
        height: 22px;
        line-height: 0;
        margin-bottom: 3px;
        background: #000;
        border-radius: 11px;
      }

      li * {
        width: 100%;
        height: 100%;
      }
    }

    .golden-ikura-pop-num {
      font-size: 12px;
      text-shadow: 1px 1px 0 #000;
      padding: 5px 0;

      &::before {
        display: inline-block;
        content: "";
        background: url(/images/bundled/3aa6fb4ec1534196ede450667c1183dc.png) 50% no-repeat;
        background-size: contain;
        width: 15px;
        height: 15px;
        margin: -2px 4px 0 0;
        vertical-align: middle;
      }
    }

    > li {
      justify-content: center;
      width: calc(100%/3 - 16px/3);
      transform: rotate(-2deg);
      will-change: transform;

      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }

  .screen-reader-text {
    display: none;
  }
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
      mask-image: url(/images/bundled/97bed10b1efcf3fccacd59cc88740b2e.svg);
      -webkit-mask-size: contain;
      mask-size: contain;
      -webkit-mask-position: center;
      mask-position: center;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      top: -50px;
      left: calc(50% - 280px);
      opacity: .6;
      z-index: -1;
    }
  }
}
</style>
