<script setup lang="ts">

import {DATACOLLECTION} from "~/constant/constains";
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in DATACOLLECTION" :key="index">
        <img loading="lazy" :src="item.thumbnail" alt="Thumbnail" />
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

li{
  display: flex;
  padding: 16px;
  gap: 16px;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.05);
}

h3{
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

p{
  font-size: 14px;
  line-height: 22px;
  color: #716B95;
}
</style>