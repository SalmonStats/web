<script setup lang="ts">
import { NumberOptions } from 'vue-i18n';

const { t, availableLocales, locale } = useI18n();

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

interface User {
  thumbnail_url: string;
  nsa_id: string;
  nickname: string;
}

interface NicknameAndIcon {
  nickname_and_icons: User[];
}

interface JobResult {
  failure_wave?: number;
  failure_reason?: string;
  is_clear: boolean;
}

interface Result {
  job_result: JobResult;
}

interface UserData {
  job_id: number;
  golden_ikura_num: number;
  ikura_num: number;
  dead_count: number;
  kuma_point: number;
  help_count: number;
  grade_id: number;
  grade_point: number;
  results: Result[];
}

enum GradeType {
  Intern = 'intern',
  Apparentice = 'apparentice',
  Parttimer = 'parttimer',
  Gogetter = 'gogetter',
  Overachiver = 'overachiver',
  Profreshional = 'profreshional',
}

function get_grade_id(grade_id: number): string {
  const grade = Object.values(GradeType)[grade_id];
  return grade === undefined ? null : t(`grade.${grade}`);
}

const user_id = useRouter().currentRoute.value.params.user_id;

const request_nickname = async () => {
  const url = `https://s2s-hash-server.herokuapp.com/nickname_and_icon?id=${user_id}`;
  const response = await (await fetch(url, { cache: 'force-cache' })).json();
  return ref<NicknameAndIcon>(response).value.nickname_and_icons[0];
};

const request_userdata = async () => {
  const url = `${import.meta.env.VITE_SERVER_URL}/v1/users/${user_id}`;
  const response = await (await fetch(url)).json();
  return ref<UserData>(response).value;
};

const userdata = await request_userdata();
const user = await request_nickname();

const job_count = userdata.results.length;
const avg_clear_waves =
  userdata.results
    .map((result) =>
      result.job_result.failure_wave === null
        ? 3
        : result.job_result.failure_wave - 1
    )
    .reduce((x, y) => x + y, 0) / job_count;
</script>

<template>
  <section class="coop-results-summary">
    <div class="summary-1">
      <div class="grade">
        <h3>{{ get_grade_id(userdata.grade_id) ?? t('title.undefined') }}</h3>
        <div class="grade-point">
          <div class="grade-point-bar" style="width: 100%" />
          <p class="grade-point-num">
            {{ userdata.grade_point ?? '-' }}
          </p>
        </div>
      </div>
      <div class="total-wave-average">
        <h3>{{ t('card.last_jobs_average') }}</h3>
        <p class="total-wave-average-point">
          {{ t('card.average_waves_cleared')
          }}<span>{{ Number(avg_clear_waves.toFixed(3)) }}</span>
        </p>
      </div>
      <div class="reward-gear">
        <h3>{{ t('user.nickname') }}</h3>
        <p class="reward-gear-image">
          <img
            class="gear gear-image"
            :src="`${user === undefined ? null : user.thumbnail_url}`"
            alt="Office Attire"
          />
        </p>
        <p class="reward-gear-name">
          {{ user.nickname }}
        </p>
      </div>
    </div>
    <div class="summary-2">
      <div class="point-card">
        <h3>{{ t('card.point_card') }}</h3>
        <div class="kuma-point">
          <h4>{{ t('title.undefined') }}</h4>
          <p>{{ '-p' }}</p>
        </div>
        <dl>
          <dt>{{ t('card.shifts_worked') }}</dt>
          <dd>{{ userdata.job_id }}</dd>
          <dt>{{ t('card.golden_ikura_num') }}</dt>
          <dd>{{ userdata.golden_ikura_num }}</dd>
          <dt>{{ t('card.ikura_num') }}</dt>
          <dd>{{ userdata.ikura_num }}</dd>
          <dt>{{ t('card.crew_members_rescued') }}</dt>
          <dd>{{ userdata.help_count }}</dd>
          <dt>{{ t('card.total_points') }}</dt>
          <dd>{{ userdata.kuma_point ?? '-' }}p</dd>
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
      content: '';
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
      background: url(/images/bundled/97bed10b1efcf3fccacd59cc88740b2e.svg) 50%
        no-repeat;
      background-size: contain;
      top: 60px;
      left: calc(50% - 105px);
      opacity: 0.3;
    }
  }

  .grade {
    margin-bottom: 8px;
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
      content: '';
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
      background: #191919url(
          /images/bundled/2e249a141f11a851ea6f8f65c5319bad.png
        )
        50%;
      background-size: 40px 40px;
      padding: 8px 0 4px;
      text-align: center;
      text-shadow: 1px 1px 0 #000;
      border-radius: 20px 20px 0 0;
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
        padding-left: 4px;
      }

      dd {
        padding-right: 8px;
        padding-bottom: 2px;
        text-align: right;
        &:not(:last-child) {
          border-bottom: 2px dashed rgba($color: #000000, $alpha: 0.3);
        }
      }
    }
  }
}
</style>
