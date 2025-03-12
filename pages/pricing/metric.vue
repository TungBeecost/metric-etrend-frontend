<script setup lang="ts">
definePageMeta({
  layout: false
});
</script>

<template>
  <div id="metric_ereport_pricing">
    <div class="default_section">
      <Plans />
    </div>
  </div>
</template>

<style lang="scss">
#metric_ereport_pricing {
  background-color: #FFFFFF;
  padding: 40px 0;
  height: 100vh;
  overflow: auto;

  .default_section{
    .wrapper{
      div{
        p{
          color: #1a1a46;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>