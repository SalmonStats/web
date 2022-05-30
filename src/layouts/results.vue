<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <Suspense>
      <Result />
    </Suspense>
    <Footer />
  </main>
</template>
