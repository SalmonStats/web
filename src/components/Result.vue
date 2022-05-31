<script setup lang="ts">
import { ref } from '@vue/reactivity'

const salmon_id = useRouter().currentRoute.value.params.salmon_id

const { t, availableLocales, locale } = useI18n()

enum WaterLevel {
  low = 'low',
  normal = 'normal',
  high = 'high',
}

enum EventType {
  waterlevels = 'water-levels',
  rush = 'rush',
  goldieseeking = 'goldie-seeking',
  griller = 'griller',
  themothership = 'the-mothership',
  fog = 'fog',
  cohockcharge = 'cohock-charge',
}

interface WaveResult {
  event_type: number
  water_level: number
  golden_ikura_num: number
  golden_ikura_pop_num: number
  quota_num: number
  ikura_num: number
}

interface JobResult {
  failure_reason: string
  failure_wave: number
  is_clear: boolean
}

interface PlayerResult {
  nsaid: string
  name: string
  boss_kill_counts: number[]
  dead_count: number
  golden_ikura_num: number
  ikura_num: number
  special_id: number
  spacial_counts: number[]
  weapon_list: number[]
}

interface Result {
  salmon_id: number
  golden_ikura_num: number
  ikura_num: number
  members: string[]
  waves: WaveResult[]
  job_result: JobResult
  players: PlayerResult[]
}

const result: Result = ref<Result>(await (await fetch(`https://api-dev.splatnet2.com/v1/results/${salmon_id}`)).json())

function get_event_type(event_id: number): string {
  const event_type = Object.values(EventType)[event_id]
  return t(`event_type.${event_type}`)
}

function get_water_level(water_id: number): string {
  const water_level = Object.values(WaterLevel)[water_id]
  return t(`water_level.${water_level}`)
}
</script>

<template>
  <div class="coop-result">
    <section class="wave-card-wrapper">
      <ul class="wave">
        <li v-for="(wave, index) in result.waves" :key="wave.quota_num">
          <ul class="wave-card">
            <li class="wave-result" :class="{ gj: result.job_result.failure_wave !== index + 1, ng: result.job_result.failure_wave === index + 1 }">
              {{ result.job_result.failure_wave !== index + 1 ? t("result.is_clear") : t("result.is_failure") }}
            </li>
            <li v-if="result.job_result.failure_wave === index + 1" class="failure-reason">
              {{ result.job_result.failure_reason === "time_limit" ? t("result.time_limit") : t("result.wipe_out") }}
            </li>
            <li class="wave-num">
              {{ t("result.wave") }} {{ index + 1 }}
            </li>
            <li class="quota-num">
              {{ wave.golden_ikura_num }}/{{ wave.quota_num }}
            </li>
            <li class="water-level" :class="{ high: wave.water_level === 2, normal: wave.water_level === 1, low: wave.water_level === 0 }">
              {{ get_water_level(wave.water_level) }}
            </li>
            <li class="event-type">
              {{ get_event_type(wave.event_type) }}
            </li>
          </ul>
        </li>
      </ul>
      <ul class="wave-detail">
        <li v-for="wave in result.waves" :key="wave.quota_num">
          <p class="golden-ikura-pop-num">
            <span class="golden-ikura-icon screen-reader-text">Golden Eggs collected</span>{{ t("result.golden_ikura_num_appearances") }}
            <span class="num">{{ wave.golden_ikura_pop_num }}</span>
          </p>
          <ul class="special-count">
            <li><img class="special-image" src="/images/special/18990f646c551ee77c5b283ec814e371f692a553.png" alt="Splat-Bomb Launcher"></li>
            <li><img class="special-image" src="/images/special/7af300fdd872feb27b3d8e68a969457fac8b3bb7.png" alt="Sting Ray"></li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="team-member">
      <div class="team-member-header section-header">
        <h3>Job Crew</h3>
      </div><ul class="team-member-list">
        <li v-for="player in result.players" :key="player.nsaid" class="">
          <router-link class=" internal-link" :to="`/users/${player.nsaid}`">
            <div class="member inklings">
              <div class="player-info">
                <h4 class="player-name">
                  <span>{{ player.name }}</span>
                </h4><ul class="coop-weapons-list">
                  <li><img class="weapon-image" src="/images/weapon/6d9246d994614a666aca4f24864c69d660b395dd.png" alt="Grizzco Charger"></li>
                  <li><img class="weapon-image" src="/images/weapon/695cedb1ff72589173c85ce61ad4dbc9e025249a.png" alt="Nautilus 47"></li>
                  <li><img class="weapon-image" src="/images/weapon/3a92a1fa8320222ca300d3c3ac25474c5077c304.png" alt="Hydra Splatling"></li>
                  <li><img class="special-image" src="/images/special/18990f646c551ee77c5b283ec814e371f692a553.png" alt="Splat-Bomb Launcher"></li>
                </ul><p class="boss-count">
                  {{ t("result.boss_salmonids_defeated") }} <span>{{ player.boss_kill_counts.reduce((prev, next) => prev + next, 0) }}</span>
                </p>
              </div><ul class="job-result">
                <li>
                  <p class="golden-ikura">
                    <span class="golden-ikura-icon screen-reader-text">Golden Eggs collected</span>
                    <span class="num">{{ player.golden_ikura_num }}</span>
                  </p>
                </li><li>
                  <p class="ikura">
                    <span class="ikura-count-icon screen-reader-text">Power Eggs collected</span>
                    <span class="num"> {{ player.ikura_num }}</span>
                  </p>
                </li><li>
                  <p class="salmon-help-count">
                    <span class="salmon-help-count-icon screen-reader-text">Crew members rescued</span>
                    <span class="num">{{ player.help_count }}</span>
                  </p>
                </li><li>
                  <p class="salmon-dead-count">
                    <span class="salmon-dead-count-icon screen-reader-text">Number of times rescued</span>
                    <span class="num">{{ player.dead_count }}</span>
                  </p>
                </li>
              </ul>
            </div>
          </router-link>
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

    &.ng {
      color: #ff7500;
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

  .failure-reason {
    position: absolute;
    color: #ff7500;
    font-size: 13px;
    width: 100%;
    top: -22px;
    text-align: center;
    text-shadow: 1px 1px #000;
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

      .num::before {
        content: "X";
        font-size: 8px;
        padding-right: 2px;
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

.coop-result .team-member .team-member-list {
  width: 100%;
  max-width: 380px;
  margin: 16px auto 0;
  padding: 0 12px;
  box-sizing: border-box;

  > li {
    position: relative;

    &::before {
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-position: center;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      position: absolute;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      top: 1px;
      left: 1px;
      background: #000;
      -webkit-mask-image: url(/images/bundled/5c78e75c54e0c25ef13e7d846bda6742.png);
      mask-image: url(/images/bundled/5c78e75c54e0c25ef13e7d846bda6742.png);
    }

    &:not(:last-child) {
      margin-bottom: 14px;
    }
  }
}

.coop-result .team-member .member {
  background: #ff7500 url(/images/bundled/38bc201999d7057ed3ad25edd618d875.png);
  background-size: 60px 60px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: end;
  align-items: flex-end;
  padding: 0 12px 4px 0;
  -webkit-mask-image: url(/images/bundled/5c78e75c54e0c25ef13e7d846bda6742.png);
  mask-image: url(/images/bundled/5c78e75c54e0c25ef13e7d846bda6742.png);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.coop-result .team-member {
  .player-info {
    flex-grow: 1;
    text-align: center;
    padding-left: 12px;
  }

  .boss-count {
    span:before {
      content: "X";
      font-size: 9px;
      padding-right: 2px;
    }

    font-size: 11px;
    color: #e5f100;
    line-height: 11px;
    padding-bottom: 1px;
    text-shadow: 1px 1px 0 #000;
  }

  .job-result {
    display: flex;
    flex-wrap: wrap;
    width: 160px;
    justify-content: space-between;
    font-size: 13px;

    li {
      color: #ccc;
      text-shadow: 1px 1px 0 #000;
      width: calc(50% - 1.5px);

      &:first-child {
        margin-bottom: 3px;
      }
    }
  }

  .golden-ikura, .ikura, .salmon-dead-count, .salmon-help-count {
    position: relative;
    background-color: rgb(0, 0, 0, .75);
    height: 24px;
    line-height: 24px;
    padding-right: 6px;
    box-sizing: border-box;
    border-radius: 12px;
    text-align: right;
  }

  .golden-ikura::before {
    background-image: url(/images/bundled/3aa6fb4ec1534196ede450667c1183dc.png);
    background-size: 18px 18px;
    left: 6px;
  }

  .ikura:before {
    background-image: url(/images/bundled/efe826cfd1d44d19153f08e19f6caa2a.png);
    background-size: 20.5px 15px;
    left: 4px;
  }

  .salmon-help-count::before {
    background-image: url(/images/bundled/c003ffe0a5580e4c8b1bc9df1e0a30d2.png);
    background-size: 33.4px 12.8px;
    left: 4px;
  }

  .salmon-dead-count:before {
    background-image: url(/images/bundled/5d447dcfcb3b0c31ffb2efca58a6e799.png);
    background-size: 30.8px 12.8px;
    left: 4px;
  }

  .golden-ikura::before, .ikura::before, .salmon-dead-count::before, .salmon-help-count::before {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    content: "";
    background-repeat: no-repeat;
    background-position: 0;
    height: 20px;
    width: 40px;
  }

  .coop-weapons-list {
    display: flex;
    justify-content: center;
    line-height: 0;
    padding: 6px 0;
    min-height: 28px;

    img {
      width: 100%;
      height: auto;
    }

    li {
      width: 28px;
      height: 28px;
      background: #000;
      border-radius: 14px;

      &:not(:last-child) {
        margin-right: 2px;
      }
    }
  }

  .player-name {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: #fff;
    font-size: 17px;
    line-height: 18px;
    text-shadow: 1px 1px 0 #000;
    height: 43px;
  }
}

.team-member-header.section-header {
  display: none;
}

h4 {
  font-weight: 300 !important;
}
</style>
