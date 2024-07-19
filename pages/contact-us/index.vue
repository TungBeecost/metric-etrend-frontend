<template>
  <div class="container">
    <div class="section bannerSection">
      <div class="background">
        <div class="left" />
        <NuxtImg src="/images/contact-banner.png" class="background" />
      </div>
      <p class="title default_section">Liên hệ tư vấn</p>
      <p class="description default_section">Liên hệ với chúng tôi để nhận được tư vấn, hỗ trợ và giải đáp các thắc mắc</p>
    </div>

    <div class="section infoSection default_section">
      <div class="block contactInfo">
        <div class="title">Thông tin liên hệ</div>
        <div class="information">
          <div v-for="(item, index) in CONTACTS" :key="index" class="contactItem">
            <CustomIcon :type="item.icon as any" />
            <div class="inforDetail">{{ item.label }}</div>
          </div>

          <iframe class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.2490730627674!2d105.78780652773692!3d21.022717716024722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5190b0368f%3A0x12db3ef926ba4b14!2zVMOyYSBuaMOgIEhIMiwgWcOqbiBIb8OgLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1719398232615!5m2!1svi!2s"
            width="600" height="450" style="border: 0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
        </div>
      </div>

      <div class="block contactForm">
        <div class="title">Liên hệ với chúng tôi</div>
        <div class="description" style="font-size: 16px">Liên hệ với chúng tôi để thấu hiểu thị trường Thương mại Điện tử và bán hàng trực tuyến ngay bây giờ!</div>

        <ContactUsForm />

      </div>
    </div>

    <div class="background_poster">
      <div class="poster default_section">
        <div class="default_section">
        </div>
        <div class="info ">
          <div class="content">Truy cập kho dữ liệu với hàng trăm báo cáo và xu hướng mới nhất</div>
          <a-button
              style="
              background-color: #241E46;
              color: #FFF;
              border: 1px solid #241E46;
              display: flex;
              height: 40px;
              justify-content: center;
              align-items: center
            "
              @click="navigateTo(NAVIGATIONS.pricing)"
          >
            Xem báo giá
          </a-button>
        </div>
        <div class="big_logo_metric">
          <img src="/images/big_logo_metric.svg" alt="">
        </div>
        <div class="chart_image">
          <img src="/images/chart_image.svg" alt="">
        </div>
        <div class="line_styling_image">
          <img src="/images/line_styling_image.svg" alt="">
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {CONTACTS, NAVIGATIONS, PAGE_TITLES} from "~/constant/constains";

useSeoMeta({
  title: PAGE_TITLES.contactUs
})
</script>

<style lang="scss" scoped>
@import url("contact-us.scss");
.background_poster{
  background: linear-gradient(90deg, #FF6931 1.09%, #FF9839 49.34%);

  .poster {
    display: flex;
    height: 335px;
    padding: 40px 0;
    align-items: center;
    gap: 64px;

    position: relative;

    .info {
      position: absolute;
      display: flex;
      width: 500px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 24px;
      z-index: 999;

      .content {
        font-size: 40px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 56px;
      }
    }

    .big_logo_metric {
      width: inherit;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
    }

    .chart_image {
      position: absolute;
      right: 0;
      top: 0;
    }

    .line_styling_image {
      position: absolute;
      right: 500px;
      top: 70px;
    }

    @media (max-width: 1023px) {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .info {
        width: 100%;

        .content {
          font-size: 24px;
        }
      }
    }

    @media (max-width: 767px) {
      height: 384px;
      padding: 32px 16px;

      .info {
        align-items: center;

        .content {
          line-height: 38px;
          font-size: 24px;
        }
      }

      .chart_image {
        top: 225px;
        right: 0;

        img {
          width: 300px;
        }

      }

      .line_styling_image {
        top: 250px;
        right: 220px;

        img {
          width: 150px;
        }
      }
    }
  }
}

</style>
