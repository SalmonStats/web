<script setup lang="ts">
// ブキのデータ
import weapons from '../assets/weapons.json';
// ステージのデータ
import stages from '../assets/stages.json';

interface Schedule {
  stage_id: number;
  start_time: Date;
  end_time: Date;
  rare_weapon?: number;
  weapon_list: number[];
}

const request = async () => {
  const url = `${import.meta.env.VITE_SERVER_URL}/v1/schedules`;
  const response = await (
    await fetch(url, { cache: 'no-cache', mode: 'cors' })
  ).json();
  return response.map((schedule) => ref<Schedule>(schedule).value);
};
const schedules = await request();
</script>

<template>
  <div class="coop-schedule-list">
    <div
      class="coop-schedule-list-item"
      v-for="schedule in schedules"
      :key="schedule.start_time"
    >
      <h5>
        <time datetime="2022-06-11T21:00:00+09:00">6/11 9:00 p.m.</time> -
        <time datetime="2022-06-13T15:00:00+09:00">6/13 3:00 p.m.</time>
      </h5>
      <div class="coop-schedule-list-item-content">
        <div class="coop-schedule-list-stage">
          <img
            class="coop-stage-image"
            :src="'/images/coop_stage/' + stages[schedule.stage_id]"
            alt=""
          />
          <p>Lost Outpost</p>
        </div>
        <div class="coop-schedule-list-weapons">
          <p>Supplied Weapons</p>
          <ul>
            <li v-for="weapon in schedule.weapon_list" :key="weapon">
              <img
                class="weapon-image"
                :src="'/images/weapon/' + weapons[weapon]"
                alt="Splat Brella"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.coop-schedule-list-item {
  max-width: 380px;
  margin: 0 auto;
  padding: 0 12px;
  background: rgba(0, 0, 0, 0.8)
    url(/images/bundled/b24ee02521f18ebe1bf8b05e1396c3dc.png) top;
  background-size: 80px 80px;
  border-radius: 20px;
  padding: 0 4px;
  margin-bottom: 24px;
  color: #fff;
  font-family: Splatoon2, sans-serif;
  box-shadow: 1px 1px 0 #000;

  h5 {
    text-align: left;
    margin: 0;
    color: #fff;
    font-size: 17px;
    border-bottom: 3px dashed #666;
    padding: 10px 12px 3px;

    &::before {
      position: relative;
      display: inline-block;
      content: '';
      background: url('/images/bundled/2e4ca1b65a2eb7e4aacf38a8eb88b456.png');
      width: 31.5px;
      height: 21px;
      background-size: contain;
      vertical-align: middle;
      margin-right: 10px;
      top: -2px;
    }
  }
}

.coop-schedule-list-item-content {
  display: flex;
  padding: 12px;
}

.coop-schedule-list-stage {
  font-size: 13px;
  text-align: center;
  width: 128px;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  p {
    padding: 4px 0 0;
  }
}

.coop-schedule-list-weapons {
  font-size: 15px;
  margin-left: 12px;
  max-width: 180px;

  p {
    text-align: left;
    padding: 4px 0;
  }

  ul {
    display: flex;
    width: 100%;
  }

  li {
    width: 25%;
    max-width: 45px;

    &:not(:last-child) {
      margin-right: 3px;
    }
  }

  img {
    width: 100%;
    height: auto;
  }
}
</style>
