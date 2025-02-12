<template>
  <div id="trang-bia">
    <div class="main-slide">
      <BeeMetricLogo style="width: 140px; height: 45px;"/>
      <div class="main-info">
        <div class="report-info">
          <div class="subtitle">
            Báo cáo thị trường<br/>
            Thương mại điện tử
          </div>
          <div class="title" style="max-width: 400px; text-transform: uppercase">
            {{ props.data.name }}
          </div>
          <div class="date">
            Số liệu thống kê từ <br/>
            {{ formatDate(props.data.start_date, "DD/MM/YYYY") }}
            -
            {{ formatDate(props.data.end_date, "DD/MM/YYYY") }}
          </div>
        </div>
        <div class="report-thumbnail">
          <NuxtImg format="webp" loading="lazy" :src="getUrlImageThumbnail(props.data.url_thumbnail)" alt="" width="300" height="300"/>
        </div>
      </div>
      <div class="sub-info">
        <div class="platforms">
          <div
              v-for="platform in props.data.filter_custom?.lst_platform_id" :key="platform" class="platform"
          >
          </div>
        </div>
        <div class="links">
          <div>
            https://metric.vn/ereport/{{ props.data.slug }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getUrlImageThumbnail} from "~/services/ecommerce/EcomUtils";
import moment from 'moment';
import BeeMetricLogo from '@/components/svg/BeeMetricLogo';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  slide: {
    type: String,
    default: '0'
  }
});

const formatDate = (value, format, inputFormat = 'YYYYMMDD') => {
  return moment(value, inputFormat).format(format);
};
</script>

<style lang="scss" scoped>
#trang-bia {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;

  background-color: #fff;

  .main-slide {
    width: 100%;
    height: 600px;
    padding: 50px 40px 50px;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .main-info {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      .report-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .subtitle {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 32px;
          line-height: 32px;

          letter-spacing: -0.02em;

          color: #241E46;
        }

        .title {
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 40px;
          line-height: 48px;

          letter-spacing: -0.02em;

          text-transform: uppercase;

          color: #E85912;
        }

        .date {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;

          letter-spacing: -0.02em;

          color: #241E46;

        }
      }
    }

    .sub-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      height: 40px;

      padding: 0 16px;

      background: linear-gradient(270deg, #241E46 0%, #343388 98.36%);
      border-radius: 5px;

      .platforms {
        display: flex;
        gap: 40px;
      }

      .links {
        font-family: "Montserrat", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;

        letter-spacing: -0.02em;

        color: #FFFFFF;

        a {
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
