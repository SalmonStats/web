<script setup lang="ts">
const { t, availableLocales, locale } = useI18n();
import { Ref, ref } from '@vue/reactivity';

interface ShiftRankParam {
  golden_ikura_num: number;
  ikura_num: number;
  dead_count?: number;
  help_count?: number;
}

interface ShiftRank {
  nsaid: string;
  nickname: string;
  thumbnail_url: string;
  sum: ShiftRankParam;
  avg: ShiftRankParam;
  max: ShiftRankParam;
  count: number;
}

class Ranker {
  protected nsaid: string;
  protected nickname: string;
  protected thumbnail_url: string;
  protected score: number;

  constructor(
    player: ShiftRank,
    type: Ref<AggregationType>,
    mode: Ref<RankType>
  ) {
    this.nsaid = player.nsaid;
    this.nickname = player.nickname;
    this.thumbnail_url = player.thumbnail_url;
    this.score = (() => {
      console.log(type.value, mode.value);
      switch (type.value) {
        case AggregationType.TOTAL:
          switch (mode.value) {
            case RankType.JOB_NUM:
              return player.count;
            case RankType.GRADE_POINT:
              return 0;
            case RankType.GOLDEN_IKURA_NUM:
              return player.sum.golden_ikura_num;
            case RankType.IKURA_NUM:
              return player.sum.ikura_num;
          }
        case AggregationType.AVERAGE:
          switch (mode.value) {
            case RankType.JOB_NUM:
              return player.count;
            case RankType.GRADE_POINT:
              return 0;
            case RankType.GOLDEN_IKURA_NUM:
              return player.avg.golden_ikura_num.toFixed(3);
            case RankType.IKURA_NUM:
              return player.avg.ikura_num.toFixed(3);
          }
        case AggregationType.Best:
          switch (mode.value) {
            case RankType.JOB_NUM:
              return player.count;
            case RankType.GRADE_POINT:
              return 0;
            case RankType.GOLDEN_IKURA_NUM:
              return player.max.golden_ikura_num;
            case RankType.IKURA_NUM:
              return player.max.ikura_num;
          }
      }
    })();
  }
}

enum AggregationType {
  TOTAL = 'Total',
  AVERAGE = 'Average',
  Best = 'Best',
}

enum RankType {
  JOB_NUM = 'Shifts Worked',
  GRADE_POINT = 'Grade Point',
  IKURA_NUM = 'Power Eggs',
  GOLDEN_IKURA_NUM = 'Golden Eggs',
}

const request = async () => {
  const url = `${import.meta.env.VITE_SERVER_URL}/v1/ranks`;
  const response = await (
    await fetch(url, { cache: 'no-cache', mode: 'cors' })
  ).json();
  return response.map((result) => ref<ShiftRank>(result).value);
};

const data: ShiftRank[] = await request();
const rankers: Ref<Ranker[]> = ref([]);

// 現在選択されている集計タイプ
const selectedType = ref(AggregationType.TOTAL);
// 現在選択されている集計モード
const selectedMode = ref(RankType.JOB_NUM);

function changeAggregationType(mode: AggregationType) {
  selectedType.value = mode;
  // データからランキング表を作成
  rankers.value = data.map((player) => {
    return new Ranker(player, selectedType, selectedMode);
  });
  rankers.value = rankers.value.sort((a, b) => b.score - a.score);
}

function changeRankType(mode: RankType) {
  selectedMode.value = mode;
  // データからランキング表を作成
  rankers.value = data.map((player) => {
    return new Ranker(player, selectedType, selectedMode);
  });
  rankers.value = rankers.value.sort((a, b) => b.score - a.score);
}

function className(index: number) {
  switch (index) {
    case 0:
      return 'shifts-worked';
    case 1:
      return 'grade-point';
    case 2:
      return 'golden-eggs';
    case 3:
      return 'power-eggs';
  }
}

function modeName(index: RankType) {
  switch (index) {
    case RankType.JOB_NUM:
      return t('rank.shifts_worked');
    case RankType.GRADE_POINT:
      return t('rank.grade_point');
    case RankType.GOLDEN_IKURA_NUM:
      return t('rank.golden_eggs');
    case RankType.IKURA_NUM:
      return t('rank.power_eggs');
  }
}

function typeName(index: AggregationType) {
  switch (index) {
    case AggregationType.TOTAL:
      return t('rank.type.total');
    case AggregationType.AVERAGE:
      return t('rank.type.average');
    case AggregationType.Best:
      return t('rank.type.best');
  }
}
</script>

<template>
  <section class="ranking">
    <h1>Mode: {{ selectedMode }}</h1>
    <ol class="aggregation-mode-list">
      <li
        class="aggregation-mode-list-item"
        v-for="mode in Object.values(AggregationType)"
        :key="mode"
      >
        <input
          type="radio"
          name="aggregation-mode"
          :value="mode"
          v-model="selectedType"
        />
        <label @click="changeAggregationType(mode)">
          {{ typeName(mode) }}
        </label>
      </li>
    </ol>
    <ol class="ranking-mode-list">
      <li
        class="ranking-mode-list-item"
        v-for="mode in Object.values(RankType)"
        :key="mode"
      >
        <input
          type="radio"
          name="ranking-type"
          :value="mode"
          v-model="selectedMode"
        />
        <label @click="changeRankType(mode)">
          {{ modeName(mode) }}
        </label>
      </li>
    </ol>
    <h2>TOP 100</h2>
    <ol class="ranking-list">
      <li
        class="ranking-list-item"
        v-for="(ranker, index) in rankers"
        :key="ranker.nsaid"
      >
        <div class="ranking-list-header">
          <span class="rank">{{ index + 1 }}</span
          ><span class="score">{{ ranker.score }}</span
          ><span class="team-id">ID: {{ ranker.nsaid }}</span>
        </div>
        <ul class="member-list">
          <li class="member-list-item">
            <RouterLink :to="`/users/${ranker.nsaid}`">
              <a class="internal-link" href="">
                <div>
                  <img
                    class="thumbnail-image"
                    :src="ranker.thumbnail_url"
                    alt="Ranker thumbnail URL"
                  />
                </div>
              </a>
            </RouterLink>
            <span class="nickname">{{ ranker.nickname }}</span>
          </li>
        </ul>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.ranking {
  text-align: center;

  h1 {
    font-family: Splatoon1;
    display: inline-block;
    border-bottom: 3px dashed #ccc;
    padding: 24px 0 6px;
    margin-bottom: 8px;
    line-height: 1;
    font-size: 30px;
    color: #19d719;
    font-weight: 300;
    text-shadow: 1px 1px 0 #000;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 16px;
    color: #fff;
    text-shadow: 1px 1px 0 #000;
    font-weight: 300;
    line-height: 1.5;
  }
}

.ranking-mode-list,
.aggregation-mode-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 1.1;
  margin-bottom: 24px;
}

.aggregation-mode-list-item {
  width: calc(90% / 3);
}

.ranking-mode-list-item {
  width: calc(90% / 4);
}

// デフォルトのチェックボックスを無効化
input[type='radio'] {
  display: none;
}

// 選択されているもののテキスト色を変更
input[type='radio']:checked {
  + label {
    color: #ff0;
  }
}

p {
  &.golden-eggs {
    &::before {
      // position: absolute;
      display: inline-block;
      content: '';

      background: url(/images/bundled/3aa6fb4ec1534196ede450667c1183dc.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: 50%;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 0.3em;
    }
  }

  &.power-eggs {
    &::before {
      // position: absolute;
      display: inline-block;
      content: '';

      background: url(/images/bundled/78f61aacb1fbb50f345cdf3016aa309e.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: 50%;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 0.3em;
    }
  }

  &.shifts-worked {
    &::before {
      // position: absolute;
      display: inline-block;
      content: '';

      background: url(/images/bundled/2e4ca1b65a2eb7e4aacf38a8eb88b456.png);
      background-size: 30px 20px;
      background-repeat: no-repeat;
      background-position: 50%;
      width: 30px;
      height: 20px;
      vertical-align: middle;
      margin-right: 0.3em;
    }
  }

  &.grade-point {
    &::before {
      // position: absolute;
      display: inline-block;
      content: '';

      background: url(/images/bundled/ae680e6dc6f8090d5b0c21c51351d7e9.png);
      background-size: 10.83px 20px;
      background-repeat: no-repeat;
      background-position: 50%;
      width: 10.83px;
      height: 20px;
      vertical-align: middle;
      margin-right: 0.3em;
    }
  }
}

// 自作チェックボックス
input[type='radio'] + label:before {
  display: inline-block;
  letter-spacing: 0.5em;
  content: '';
  background-image: url(data:image/png;base64,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);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0 0;
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  margin-bottom: -0.1em;
}

// 選択されているもののチェックボックスの色を変更
input[type='radio']:checked + label:before {
  background-image: url(data:image/png;base64,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);
}

// カーソルで選択できるようにする
input[type='radio'] + label {
  cursor: pointer;
}

.ranking-list {
  text-align: left;
  background: #a0a0a0;
  max-width: 380px;
  margin: 30px auto 0;
  border-radius: 20px;
  overflow: hidden;
}

.ranking-list-header {
  background: #222;
  color: #fff;

  span {
    display: inline-block;
    vertical-align: middle;
  }
}

.member-list {
  zoom: 1;
  padding: 0 8px 8px;
}

.member-list-item {
  float: left;
  font-size: 16px;
  line-height: 42px;
  width: 100%;
}

.ranking .rank {
  color: #19d719;
}

.rank {
  font-size: 18px;
  min-width: 42px;
  text-align: center;
}

.score {
  font-size: 16px;
  background: #000;
  line-height: 20px;
  margin: 6px 0;
  padding: 0 10px;
  border-radius: 15px;

  &::before {
    content: 'X';
    font-size: 0.6em;
    margin: 0 0.1em;
  }
}

.team-id {
  color: #999;
  font-size: 11px;
  padding-left: 12px;
}

.member-list {
  &::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
  }
}

.thumbnail-image {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.member-list-item {
  padding-top: 6px;
  display: flex;
}

.nickname {
  padding-left: 8px;
  color: #000;
}
</style>
