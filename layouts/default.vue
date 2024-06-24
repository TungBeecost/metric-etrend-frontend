<script setup>
</script>

<template>
  <div class="">
    <slot/>
  </div>
</template>

<style>
@media (min-width: 1920px) {
  .default_section {
    flex-direction: row;
    width: 1440px;
    margin: 0 auto;
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .default_section {
    flex-direction: row;
    width: 1280px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) and (max-width: 1439px) {
  .default_section {
    flex-direction: row;
    width: 960px;
    margin: 0 auto;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .default_section {
    flex-direction: row;
    width: 720px;
    margin: 0 auto;
  }
}

@media (min-width: 425px) and (max-width: 767px) {
  .default_section {
    flex-direction: row;
    width: 375px;
    margin: 0 auto;
  }
}

@media (max-width: 424px) {
  .default_section {
    flex-direction: row;
    width: 325px;
    margin: 0 auto;
  }
}

</style>
