<template>
  <main class="py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <Suspense>
      <Overview />
    </Suspense>
    <Navigation />
  </main>
</template>
