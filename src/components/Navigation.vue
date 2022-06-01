<script setup lang="ts">
interface Item {
  title: string
  icon: string
  path: string
}

const items: Item[] = [
  {
    title: 'Home',
    icon: '',
    path: '/',
  },
]
</script>

<template>
  <div class="navigation-bar">
    <div :v-for="(item, index) in items" />
  </div>
</template>

<style lang="scss" scoped>
.sm-btn-container-foreground {
  position: fixed;
  display: flex;
  align-items: flex-end;
  direction: ltr;
  bottom: 0;
  width: 100%;
  z-index: 1;
  height: 40px;
  background: #000000;
//   box-shadow: 0 0 5px 0 #eee;
}

.sm-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
}

@media (min-width: 576px) {
  .sm-btn-container {
    cursor: pointer;
  }
}

.sm-btn-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0000008a;
}

.sm-btn-icon {
  font-size: 18px;
  transition: all 0.17s ease-in-out;
}

.sm-btn-icon-active {
  color: var(--icon-color);
  margin-bottom: 20px;
}

.sm-btn-title {
  position: absolute;
  color: var(--icon-color);
  transition: all 0.15s ease-in-out;
  top: 70px;
  font-size: 14px;
}

.sm-btn-title-active {
  color: var(--icon-color);
  top: 35px;
}

.border-swiper {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--swiper-color);
  transition: all 0.3s;
}
</style>
