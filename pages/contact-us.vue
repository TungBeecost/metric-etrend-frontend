<template>
  <div class="container">
    <div class="section bannerSection">
      <div class="background">
        <div class="left" />
        <NuxtImg src="/images/contact-banner.png" class="background" />
      </div>
      <p class="title">Liên hệ tư vấn</p>
      <p class="description">Liên hệ với chúng tôi để nhận được tư vấn, hỗ trợ và giải đáp các thắc mắc</p>
    </div>

    <div class="section infoSection">
      <div class="block contactInfo">
        <p class="title">Thông tin liên hệ</p>
        <div class="information">
          <div v-for="(item, index) in CONTACTS" :key="index" class="contactItem">
            <CustomIcon :type="item.icon as any" />
            <p class="inforDetail">{{ item.label }}</p>
          </div>

          <iframe class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.2490730627674!2d105.78780652773692!3d21.022717716024722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5190b0368f%3A0x12db3ef926ba4b14!2zVMOyYSBuaMOgIEhIMiwgWcOqbiBIb8OgLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1719398232615!5m2!1svi!2s"
            width="600" height="450" style="border: 0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
        </div>
      </div>

      <div class="block contactForm">
        <p class="title">Liên hệ với chúng tôi</p>
        <p class="description">Liên hệ với chúng tôi để thấu hiểu thị trường Thương mại Điện tử và bán hàng trực tuyến ngay bây giờ!</p>
        <div class="information">
          <CustomInput label="Họ và tên" :error-message="'This is error'" :is-required="true" :input-props="{ status: 'error', placeholder: 'Nhập họ và tên' }" class="infoBlock" />
          <div class="infoBlock contactInfo">
            <CustomInput class="contactItem" label="Email" :input-props="{ placeholder: 'example@gmail.com' }" />
            <CustomInput class="contactItem" label="Số điện thoại" :is-required="true" :input-props="{ placeholder: 'Nhập SĐT' }" />
          </div>
          <CustomSelect label="Ngành hàng quan tâm" :is-required="true" :error-message="'this is error message'"
            :select-props="{ placeholder: 'Chọn ngành hàng', showSearch: true, options: CATEGORIES, filterOption: filterSelectOption as any }" class="infoBlock" />
          <CustomSelect label="Mô hình doanh nghiệp" :select-props="{ placeholder: 'Chọn mô hình doanh nghiệp', showSearch: true, options: COMPANY_TYPES, filterOption: filterSelectOption as any }"
            class="infoBlock" />
          <CustomSelect label="Bạn biết tới Metric từ kênh nào?" :select-props="{ placeholder: 'Chọn kênh', showSearch: true, options: SOCIAL_MEDIA_TYPES, filterOption: filterSelectOption as any }"
            class="infoBlock" />
        </div>
        <AButton type="primary">Gửi</AButton>

      </div>
    </div>

    <div class="section callActionBanner">
      <NuxtImg src="/images/orange-banner-wave.png" class="background" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CONTACTS, CATEGORIES, COMPANY_TYPES, SOCIAL_MEDIA_TYPES } from "../helpers/constains";
import { filterSelectOption } from "~/helpers/supporter"

</script>

<style lang="scss" scoped>
@import url("./contact-us.scss");
</style>
