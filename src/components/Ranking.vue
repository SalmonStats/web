<script setup lang="ts">
import { ref } from '@vue/reactivity';

interface ShiftRankParam {
  golden_ikura_num: number;
  ikura_num: number;
  dead_count?: number;
  help_count?: number;
}

interface ShiftRank {
  nsaid: string;
  sum: ShiftRankParam;
  avg: ShiftRankParam;
  max: ShiftRankParam;
  count: number;
}

enum RankType {
  JOB_NUM = 'Shifts worked',
  GRADE_POINT = 'Grade',
  IKURA_NUM = 'Golden Eggs',
  GOLDEN_IKURA_NUM = 'Power Eggs',
}

const RankMode: RankType[] = [
  RankType.JOB_NUM,
  RankType.GRADE_POINT,
  RankType.IKURA_NUM,
  RankType.GOLDEN_IKURA_NUM,
];

const request = async () => {
  const url = 'http://localhost:3000/v1/ranks';
  const response = await (
    await fetch(url, { cache: 'no-cache', mode: 'cors' })
  ).json();
  return response.map((result) => ref<ShiftRank>(result).value);
};

const rank_type = ref(RankType.JOB_NUM);
const rankers: ShiftRank[] = ref(await request());

function reverse() {
  rankers.value.reverse();
}

function change_rank_mode() {
  const index =
    (Object.values(RankType).indexOf(rank_type.value) + 1) % RankMode.length;
  rank_type.value = RankMode[index];
}
</script>

<template>
  <section class="ranking">
    <h1 @click="change_rank_mode">Mode: {{ rank_type }}</h1>
    <h2>TOP 100</h2>
    <ol class="ranking-list">
      <li
        class="ranking-list-item"
        v-for="(ranker, index) in rankers"
        :key="ranker.nsaid"
      >
        <div class="ranking-list-header">
          <span class="rank">{{ index + 1 }}</span
          ><span class="point">{{ ranker.count }}</span
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
  }

  h2 {
    font-size: 16px;
    color: #fff;
    text-shadow: 1px 1px 0 #000;
    font-weight: 300;
    line-height: 1.5;
  }
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
  padding: 0 16px 16px;
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

.point {
  font-size: 21px;
  background: #000;
  line-height: 30px;
  margin: 6px 0;
  padding: 0 12px;
  border-radius: 15px;
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
