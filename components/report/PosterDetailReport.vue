<script setup lang="ts">
import type SearchReport from "~/components/search/search-report.vue";
import {NAVIGATIONS} from "~/constant/constains";
import {onMounted, ref} from "vue";
import Cta from "~/components/report/Cta.vue";

const isDesktop = ref(true);
const openCta = ref(false); // popup form lead
onMounted(() => {
  isDesktop.value = window?.innerWidth >= 768;
});
const onClickSuggestion = (suggestion: string) => {
  navigateTo(`${NAVIGATIONS.search}?search=${suggestion}`);
}

const props = defineProps({
  listSuggest: {
    type: Array as () => { name: string }[],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const handleButtonClick = () => {
  openCta.value = true;
}

</script>

<template>
  <div class="poster_detail_report">
    <div class="title">
      Phần mềm phân tích dữ liệu sàn E-commerce
    </div>
    <div class="text-gray-50">
      Tìm kiếm sản phẩm mới, thị trường ngách mới, đặt giá tối ưu và phân tích doanh số đối thủ. Khám phá tăng chuyển
      đổi mua hàng từ nhà bán và thương hiệu thành công.
    </div>
    <a-button class="register-btn" :size="isDesktop ? 'large' : 'middle'" type="primary" @click="handleButtonClick">
      Trải nghiệm miễn phí
    </a-button>
    <!--    <div class="big_logo_metric">-->
    <!--      <NuxtImg src="/images/big_logo_metric.svg" alt=""/>-->
    <!--    </div>-->
  </div>
  <cta v-model:open="openCta"/>
  <!--  <div class="poster_detail_report">-->
  <!--    <div class="title">-->
  <!--      Truy cập kho dữ liệu với hàng triệu báo cáo TMĐT ngay bây giờ-->
  <!--    </div>-->
  <!--    <div class="searchContent">-->
  <!--      <SearchReport class="searchBox"/>-->
  <!--      <a-skeleton v-if="loading" :paragraph="{ rows: 1 }"/>-->
  <!--      <div  v-else class="recommendSearch">-->
  <!--        <div class="content_key">Từ khoá liên quan nổi bật: </div>-->
  <!--        <div style="display: flex; gap: 16px; flex-wrap: wrap;">-->
  <!--          <AButton v-for="(item, index) in props.listSuggest" :key="index" ghost class="recommendItem"-->
  <!--                   @click="onClickSuggestion(item.name)">-->
  <!--            {{ item.name }}-->
  <!--          </AButton>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--&lt;!&ndash;    <div class="big_logo_metric">&ndash;&gt;-->
  <!--&lt;!&ndash;      <NuxtImg src="/images/big_logo_metric.svg" alt=""/>&ndash;&gt;-->
  <!--&lt;!&ndash;    </div>&ndash;&gt;-->
  <!--  </div>-->
</template>

<style scoped lang="scss">
.recommendItem {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.poster_detail_report {
  background: linear-gradient(270deg, #4745A5 -67.05%, #241E46 98.36%);
  padding: 60px 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  position: relative;

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #FFF;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
  }

  .searchContent {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 800px;
    //padding: 0 200px;
    z-index: 999;

    .recommendSearch {
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: flex-start;

      .content_key {
        font-size: 16px;
        font-weight: 700;
        color: #FFF;
        margin-right: 16px;

        white-space: nowrap;
      }
    }
  }

  .big_logo_metric {
    width: inherit;
    overflow: hidden;
    opacity: 0.5;
    mix-blend-mode: luminosity;
    position: absolute;
    top: 0;
    right: 400px;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    padding: 16px;

    .title {
      font-size: 24px;
      line-height: 32px;
    }

    .searchContent {
      padding: 0 20px;

      .recommendSearch {
        flex-direction: column;
        align-items: stretch;

        .content_key {
          margin-right: 0;
          margin-bottom: 16px;
        }
      }
    }

    .big_logo_metric {
      width: inherit;
      overflow: hidden;
      right: 20px;
    }
  }
}
</style>
