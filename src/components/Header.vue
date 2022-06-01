<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

interface User {
  thumbnail_url: string
  nsa_id: string
  nickname: string
}

interface NicknameAndIcon {
  nickname_and_icons: User[]
}

const user_id = useRouter().currentRoute.value.params.user_id
const user = (ref<NicknameAndIcon>(await (await fetch(`https://s2s-hash-server.herokuapp.com/nickname_and_icon?id=${user_id}`)).json())).value.nickname_and_icons[0]
</script>

<template>
  <section class="coop-results-summary">
    <div class="summary-1">
      <div class="grade">
        <h3>Profreshional</h3><div class="grade-point">
          <div class="grade-point-bar" style="width: 100%;" /><p class="grade-point-num">
            860
          </p>
        </div>
      </div><div class="total-wave-average">
        <h3>{{ t("card.last_jobs_average") }}</h3><p class="total-wave-average-point">
          {{ t("card.average_waves_cleared") }}<span>2.8</span>
        </p>
      </div><div class="reward-gear">
        <h3>{{ t("user.nickname") }}</h3><p class="reward-gear-image">
          <img class="gear gear-image" :src="`${user.thumbnail_url}`" alt="Office Attire">
        </p><p class="reward-gear-name">
          {{ user.nickname }}
        </p>
      </div>
    </div><div class="summary-2">
      <div class="point-card">
        <h3>{{ t("card.point_card") }}</h3><div class="kuma-point">
          <h4>Current points</h4><p>12111p</p>
        </div>
        <dl>
          <dt>{{ t("card.shifts_worked") }}</dt>
          <dd>3650</dd>
          <dt>{{ t("card.golden_ikura_num") }}</dt>
          <dd>95750</dd>
          <dt>{{ t("card.ikura_num") }}</dt>
          <dd>3243861</dd>
          <dt>{{ t("card.crew_members_rescued") }}</dt>
          <dd>4731</dd>
          <dt>{{ t("card.total_points") }}</dt>
          <dd>1568319p</dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
h3 {
    line-height: 1.5;
}

.coop-results-summary {
    position: relative;
    display: flex;
    max-width: 420px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
    z-index: 2;
    text-align: left;
    margin-bottom: 3em;

    .summary-1 {
        padding-right: 5px;
        width: 50%;

        &::before {
            position: absolute;
            display: block;
            content: "";
            width: 145px;
            height: 145px;
            background: #ff7500;
            -webkit-mask-image: url(/images/bundled/95b3761f907b0aedc559828df9e5d317.svg);
            bottom: -43px;
            left: -30px;
            opacity: 0.6;
            z-index: -1;
        }
    }

    .summary-2 {
        padding-left: 5px;
        width: 50%;

    &::before {
        width: 188px;
        height: 163px;
        background: url(/images/bundled/97bed10b1efcf3fccacd59cc88740b2e.svg) 50% no-repeat;
        background-size: contain;
        top: 60px;
        left: calc(50% - 105px);
        opacity: .3;
    }
    }

    .grade {
        margin-bottom: 8px;
        background: rgba($color: #000000, $alpha: 0.8);
        padding: 10px;
        line-height: 1.0;
        border-radius: 20px;

        h3 {
            color: #39e464;
            font-size: 13px;
            border-bottom: 1px dashed hsla(0, 0%, 100%, 0.3);
            padding: 0 2px 4px;
        }

        .grade-point {
            position: relative;
            margin: 6px 2px;
            background: #000;
            height: 15px;
            z-index: 0;
        }

        .grade-point-bar {
            position: absolute;
            max-width: 100%;
            height: 15px;
            z-index: 1;
            background: linear-gradient(180deg, #f5873f, 0, #ff4b1f);
        }

        .grade-point-num {
            position: relative;
            color: #fff;
            font-size: 11px;
            line-height: 15px;
            padding-right: 3px;
            text-align: right;
            text-shadow: 1px 1px 0 #000;
            z-index: 2;
        }
    }

    .total-wave-average {
        margin-bottom: 16px;
        background: rgba($color: #000000, $alpha: 0.8);
        padding: 10px;
        line-height: 1;
        border-radius: 20px;

        h3 {
            color: #39e464;
            font-size: 13px;
            border-bottom: 1px dashed hsla(0, 0%, 100%, 0.3);
            padding: 0 2px 4px;
        }

        .total-wave-average-point {
            color: #e5f100;
            font-size: 13px;
            padding: 8px 2px 4px;

            span {
                font-size: 26px;
                padding-left: 6px;
            }
        }
    }

    .reward-gear {
        background: #888;
        background-size: 151.2px 151.2px;
        color: #fff;
        margin: 0 auto;
        text-align: center;
        transform: rotate(-2deg);
        will-change: transform;
        text-shadow: 1px 1px 0 #000;
        box-shadow: 1px 1px 0 #000;
        overflow: hidden;
        border-radius: 20px;
        width: 75%;

        h3 {
            background: #191919;
            // background-size: 189px 189px;
            font-size: 13px;
            padding: 2px 8px;
        }

        .reward-gear-image {
            line-height: 0;

            img {
                width: 100%;
                min-width: 110px;
                height: auto;
            }
        }

        .reward-gear-name {
            font-size: 14px;
            padding: 4px 0 10px;
        }
    }

    .point-card {
        position: relative;
        transform: rotate(0.4deg);
        will-change: transform;
        z-index: 2;

        &::before {
            position: absolute;
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            border-radius: 20px;
            background: #d6e200;
            background-size: 40px 40px;
            top: 0;
            left: 0;
            z-index: -1;
        }

        h3 {
            font-family: Splatoon1;
            color: #ff7500;
            font-size: 12px;
            background: #191919url(/images/bundled/2e249a141f11a851ea6f8f65c5319bad.png) 50%;
            background-size: 40px 40px;
            padding: 8px 0 4px;
            text-align: center;
            text-shadow: 1px 1px 0 #000;
            border-radius: 20px 20px 0 0 ;
        }

        .kuma-point {
            background: rgba($color: #000000, $alpha: 0.75);
            color: #e5f100;
            border-radius: 17px;
            margin: 6px;
            padding: 4px 10px;
            text-shadow: 1px 1xp 0 #000;

            h4 {
                font-size: 13px;
            }

            p {
                line-height: 1.5;
                font-size: 22px;
                text-align: right;
            }
        }

        dl {
            color: #000;
            font-size: 14px;
            line-height: 1.4;
            margin: 6px;

            dt {
                text-shadow: 1px 1px 1px #ff7500;
                padding-top: 4px;
                padding-left: 4px;;
            }

            dd {
                padding-right: 8px;
                padding-bottom: 2px;
                text-align: right;
                &:not(:last-child) {
                    border-bottom: 2px dashed rgba($color: #000000, $alpha: 0.3)
                }
            }
        }
    }
}
</style>
