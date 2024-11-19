<script setup lang="ts">
import {NAVIGATIONS} from "~/constant/constains";
import {formatDate} from "compatx";
import {upperFirst} from "scule";

const props = defineProps({
  data: {
    type: Array as () => any[],
    default: () => [],
  },
});
</script>

<template>
    <div id="lst_report_id">
      <nuxt-link v-for="item in props.data" :key="item.id" class="lst_item"
                 :to="`${NAVIGATIONS.home}${item.source ==='marketing' ? 'insight/' + item.slug : item.slug}`">
        <div class="item">
          <div class="image">
            <img :src="item.url_thumbnail" alt="">
          </div>
          <div class="info">
            <div class="breadcrumb">
              <span :class="(item.report_type === 'report_product_line' || item.report_type === 'report_category') ? 'display_none' : 'display'">{{ formatDate(item.end_date) }}</span>
            </div>
            <div v-if="item.slug.startsWith('bao-cao')" class="name">
              {{ item.name }}
            </div>
            <div v-else-if="item.report_type === 'report_category'" class="name">
              Báo cáo Ngành hàng
            </div>
            <div v-else-if="item.report_type === 'report_brand'" class="name">
              Báo cáo Thương hiệu
            </div>
            <div v-else class="name">
              Báo cáo Nhóm hàng
            </div>
            <div class="title">{{item.name}}</div>
          </div>
        </div>
      </nuxt-link>
    </div>
</template>

<style scoped lang="scss">
#lst_report_id {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  .lst_item {
    display: flex;
    text-decoration: none;

    .item {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px;
      border: 1px solid #EEEBFF;
      background-color: #FFF;
      border-radius: 16px;
      width: 100%;
      cursor: pointer;

      .image {
        img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>