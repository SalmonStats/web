<script setup lang="ts">
// import { ref } from '@vue/reactivity'
// const { t, availableLocales, locale } = useI18n()
</script>

<template>
  <div class="coop-result">
    <section class="wave-card-wrapper">
      <ul class="wave">
        <li>
          <ul class="wave-card">
            <li class="wave-result gj">
              ✓
            </li><li class="wave-num">
              Wave 1
            </li><li class="quota-num">
              50/21
            </li><li class="water-level low">
              Low tide
            </li><li class="event-type">
              -
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.coop-result .wave-card-wrapper {
    position: relative;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 0 16px 50px;
    text-align: center;
    box-sizing: border-box;
    z-index: 1;
}

.coop-result .wave-card-wrapper:before {
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

.coop-result .wave {
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 1.3;
}

.coop-result .wave, .coop-result .wave-detail {
    font-family: Splatoon2,sans-serif;
    display: -ms-flexbox;
    display: flex;
}

.coop-result .wave>li {
    position: relative;
    color: #000;
    padding-bottom: 16px;
    border-radius: 3px;
}

.coop-result .wave>li:before {
    background: #e5f100 url(/images/bundled/3be424b57f616fc54f4b33e32ee4d964.png);
    background-size: 80px 80px;
    z-index: -1;
}

.coop-result .wave-detail>li:not(:last-child), .coop-result .wave>li:not(:last-child) {
    margin-right: 8px;
}
</style>
