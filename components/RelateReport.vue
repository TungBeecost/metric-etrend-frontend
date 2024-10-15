<script setup lang="ts">
import type {LstRecommed} from "~/services/reports";
import {NAVIGATIONS} from "~/constant/constains";
import {upperFirstLetter} from "~/helpers/utils";

const props = defineProps({
  recomends: {
    type: Array as () => LstRecommed[],
    required: true
  }
});

const handleItemClick = (item: LstRecommed) => {
  if (item.source === 'marketing') {
    navigateTo(`${NAVIGATIONS.home}/insight/${item.slug}`);
    return;
  }
  navigateTo(`${NAVIGATIONS.home}${item.slug}`);
};

const getRandomReplacement = () => {
  const replacements = ["Báo cáo thị trường", "Nghiên cứu thị trường"];
  return replacements[Math.floor(Math.random() * replacements.length)];
};
</script>

<template>
  <div class="raleted_report">
    <div class="title">
      <!--      <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--        <rect width="16" height="32" rx="4" fill="#F9D7C6"/>-->
      <!--      </svg>-->
      <h2 class="title_content">
        Báo cáo liên quan
      </h2>
    </div>
    <div class="grid">
      <div v-for="item in props.recomends" :key="item.id" class="item" @click="handleItemClick(item)">
        <div class="info">
          <nuxt-link :to="item.source === 'marketing' ? `/insight/${item.slug}` : `/${item.slug}`" class="name">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M8.75 15C12.2018 15 15 12.2018 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15Z"
                  stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.168 13.1699L17.4984 17.5004" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
            {{ item.source === 'marketing' ? '' : getRandomReplacement() }}
            {{ upperFirstLetter(item.name.replace('Báo cáo', '')) }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.raleted_report {
  display: flex;
  flex-direction: column;
  //padding: 24px;
  align-items: flex-start;
  //border-radius: 16px;
  //border: 1px solid #EEEBFF;
  //background: #FFF;
  gap: 24px;
  margin-bottom: 16px;

  .title {
    display: flex;
    align-items: center;
    gap: 16px;

    .title_content {
      font-size: 20px;
      font-weight: bold;
      color: #241E46;
      line-height: 24px;
    }
  }

  .grid {
    width: 100%;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: flex-start;
    gap: 16px;
    cursor: pointer;

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1 0 0;

      .report_type {
        font-size: 14px;
        color: #716B95;
        font-weight: 400;
        line-height: 14px;
      }

      .name {
        font-size: 16px;
        color: #241E46;

        display: flex;
        gap: 8px;

        padding: 4px 12px 4px 8px;
        border: 1px solid #9D97BF;

        align-items: center;
        line-height: 24px;

        text-decoration: none;

        border-radius: 30px;

      }
    }
  }
}

@media (max-width: 767px) {
  .raleted_report {
    .grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>