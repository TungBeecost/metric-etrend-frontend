<template>
  <div>
    <div class="footerContent">
      <!-- introduce -->
      <div class="info introduce">
        <NuxtImg src="/images/Logo-black.svg" width="186" height="36" />
        <p>Metric là Nền tảng Số liệu Thương mại Điện tử dành cho Doanh nghiệp, Thương hiệu và Nhà bán. Metric tạo ra báo cáo phân tích dữ liệu thị trường chỉ trong 30 giây, giúp việc thực thi và ra
          quyết định kinh doanh nhanh hơn 5 lần.</p>
        <NuxtImg src="/images/gov-mark.png" width="176" height="67" />
      </div>

      <!-- term & policy -->
      <div class="info term">
        <div class="title">Chính sách & quy định</div>
        <NuxtLink v-for="(item, index) in termAndPolicies" :key="index" :to="item.link" class="termLink">
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- contact -->
      <div class="info contact">
        <div class="title">Liên hệ</div>
        <div v-for="(item, index) in contacts" :key="index" class="contactItem">
          <NuxtImg :src="item.icon" width="24" height="24" />
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>

    <div class="divider" />

    <div class="footerSignature">
      <p class="copyright">© 2024 Metric.vn</p>
      <div class="socialIconList">
        <div onclick="window.location = 'https://www.facebook.com/metricplatform'">
          <NuxtImg src="/icons/Social-FB.svg" width="24" height="24" class="" />
        </div>
        <div onclick="window.location = 'https://www.linkedin.com/company/metricplatform/mycompany/'">
          <NuxtImg src="/icons/Social-Linkedin.svg" width="24" height="24" />
        </div>
        <div onclick="window.location = 'https://www.youtube.com/@metricplatform'">
          <NuxtImg src="/icons/Social-Ytb.svg" width="24" height="24" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

const termAndPolicies = [{
  label: "Chính sách bảo mật thông tin",
  link: "/",
}, {
  label: "Hình thức thanh toán",
  link: "/",
}, {
  label: "Chính sách đổi trả sản phẩm",
  link: "/",
}, {
  label: "Chính sách đặt hàng",
  link: "/",
}, {
  label: "Điều kiện giao dịch chung",
  link: "/",
}]

const contacts = [{
  label: "CÔNG TY CỔ PHẦN KHOA HỌC DỮ LIỆU",
  icon: "/icons/Buildings.svg",
}, {
  label: "Tầng 6 Tòa nhà AZ Lâm Viên, 107A Nguyễn Phong Sắc, phường Dịch Vọng Hậu, quận Cầu Giấy, thành phố Hà Nội, Việt Nam",
  icon: "/icons/MapPin.svg",
}, {
  label: "033.806.2221",
  icon: "/icons/Phone.svg",
}, {
  label: "info@metric.vn",
  icon: "/icons/Envelope.svg",
}]
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>