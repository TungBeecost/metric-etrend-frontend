<script setup lang="ts">

</script>

<template>
  <div class="general_transaction">
    <div class="item bdr">
      <div class="label">Số lần click</div>
      <div class="value">0</div>
    </div>
    <div class="item bdr">
      <div class="label">Số lần mua</div>
      <div class="value">0</div>
    </div>
    <div class="item">
      <div class="label">Số lần hoàn thành</div>
      <div class="value">0</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.general_transaction{
  display: flex;
  border: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);
  border-radius: 16px;
  background-color: var(--Dark-blue-dark-blue-1, #FFF);
  .item{
    display: flex;
    padding: 24px 20px 24px 18.5px;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;

    .label{
      color: var(--Dark-blue-dark-blue-5, #716B95);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }

    .value{
      color: var(--Dark-blue-dark-blue-8, #241E46);
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }
  }
  .bdr{
    border-right: 1px solid var(--Dark-blue-dark-blue-2, #EEEBFF);
  }
}
</style>