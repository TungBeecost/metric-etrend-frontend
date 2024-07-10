<template>
  <TermAndPolicy :banner="{ type: 'BuyDocument', title: 'CHÍNH SÁCH ĐẶT HÀNG' }">
    <template #detail>
      <div class="detail">
        <div class="summary">
          Để đặt mua phần mềm phân tích thị trường và quản lý bán hàng trên trang Website <b>eReport.vn</b>, khách hàng đăng nhập vào trang Web và lựa chọn gói cước riêng theo tùy theo nhu cầu. Thông
          tin chi
          tiết vui lòng xem tại <b>Hình thức thanh toán</b>.
        </div>
        <TermAndPolicyContact />
      </div>
    </template>
  </TermAndPolicy>
</template>

<script setup lang="ts">
import { PAGE_TITLES } from '../../constant/constains';

useSeoMeta({
  title: PAGE_TITLES.placeOrderPolicy
})
</script>

<style lang="scss" scoped>
@import url("chinh-sach-dat-hang.scss");
</style>
