<template>
  <TermAndPolicy :banner="{ type: 'RefundDocument', title: 'CHÍNH SÁCH ĐỔI TRẢ SẢN PHẨM' }">
    <template #detail>
      <div class="detail">
        <p class="summary">
          Metric hỗ trợ đổi trả sản phẩm do lỗi của nhà sản xuất trong vòng tối đa 05 ngày trong trường hợp sau: Sản phẩm được xác định nguồn gốc mua tại Metric và các đối tác được Metric ủy quyền
          (căn cứ vào hóa đơn mua hàng)
        </p>
        <p class="summary">
          Những trường hợp không đủ điều kiện và tiêu chí như trên, chúng tôi sẽ không nhận đổi trả sản phẩm. Thời gian xử lý quy trình đổi trả hàng tại Metric diễn ra trong vòng 03 ngày kể từ ngày
          nhận được yêu cầu của khách hàng.
        </p>

        <TermAndPolicyContact />
      </div>
    </template>
  </TermAndPolicy>
</template>

<script setup lang="ts">
import { PAGE_TITLES } from '../../constant/constains';

useSeoMeta({
  title: PAGE_TITLES.refundPolicy
})
</script>

<style lang="scss" scoped>
@import url("chinh-sach-doi-tra-san-pham.scss");
</style>
