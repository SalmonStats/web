<script setup lang="ts">
interface Item {
  title: string
  icon: string
  path: string
}

const items: Item[] = [
  {
    title: 'Home',
    icon: 'i-carbon-home',
    path: '/',
  },
  {
    title: 'Search',
    icon: 'i-carbon-search-locate',
    path: '/search',
  },
  {
    title: 'Setting',
    icon: 'i-carbon-settings',
    path: '/settings',
  },
  {
    title: 'Rank',
    icon: 'i-carbon-list',
    path: '/settings',
  },
  {
    title: 'Setting',
    icon: 'i-carbon-settings',
    path: '/settings',
  },
]
</script>

<template>
  <nav text-xl mt-6 class="navigation-list">
    <template v-for="item in items">
      <RouterLink class="icon-btn mx-2 navigation-list-item" :to="item.path">
        <div :class="item.icon" />
      </RouterLink>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.navigation-list {
  position: fixed;
  display: flex;
  align-items: flex-end;
  direction: ltr;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: #131313;
}

.navigation-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  cursor: pointer;
}

.navigation-list-item-icon {
  width: 24px;
  height: 24px;
}

#text {
  color: transparent;
}
</style>
