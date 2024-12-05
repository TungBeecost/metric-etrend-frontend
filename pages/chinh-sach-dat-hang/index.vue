<template>
  <TermAndPolicy :banner="{ type: 'BuyDocument', title: 'CHÍNH SÁCH ĐẶT HÀNG' }">
    <template #detail>
      <div class="detail">
        <div class="summary">
          Để đặt mua các gói dịch vụ của Metric eReport, khách hàng đăng nhập vào website và lựa chọn gói cước riêng
          theo tùy theo nhu cầu. Thông tin hướng dẫn thanh toán chi tiết
          <b><a style="color: #E85912" href="https://hotro.metric.vn/ereport/thanh-toan-goi-dich-vu/huong-dan-thanh-toan">tại đây.</a></b>
        </div>

        <div class="clause">
          <div class="header">
            <div class="mark"/>
            <div class="label">Chính sách trả hàng / hoàn tiền</div>
          </div>

          <ul class="statement">
            Chúng tôi tại Metric luôn cam kết cung cấp những báo cáo nghiên cứu thị trường thương mại điện tử chất
            lượng cao, giúp khách hàng có được thông tin chính xác và hữu ích để đưa ra quyết định kinh doanh hiệu quả.
            Tuy nhiên, nếu bạn không hài lòng với báo cáo đã mua, chúng tôi sẵn sàng hỗ trợ trả lại theo các điều khoản
            sau:
            <li>
              <b>Loại sản phẩm áp dụng:</b> Báo cáo PDF, Gói dịch vụ (*)
            </li>
            <li>
              <b>Thời gian yêu cầu trả lại hàng:</b> Khách hàng có thể yêu cầu trả lại báo cáo trong vòng 07 ngày kể từ
              ngày nhận được sản phẩm.
            </li>
            <li>
              <b>Điều kiện trả lại hàng:</b> Báo cáo không đạt chất lượng như mô tả hoặc gặp lỗi kỹ thuật trong quá trình
              tải xuống hoặc xem.
            </li>
            <li>
              <b>Chi phí trả lại hàng:</b> Metric không thu bất kỳ khoản phí nào cho việc trả lại hàng. Khách hàng sẽ
              được hoàn tiền 100%.
            </li>
            <li>
              <b>Quy trình xử lý:</b> Sau khi yêu cầu trả lại được chấp nhận, chúng tôi sẽ xử lý và hoàn tiền cho bạn
              trong vòng 03 ngày làm việc.
            </li>
            <li>
              <b>Cách thức yêu cầu trả lại hàng:</b> Để yêu cầu trả lại, vui lòng liên hệ với bộ phận chăm sóc khách
              hàng của chúng tôi qua email hoặc hotline cung cấp trên website. Hãy đính kèm thông tin về đơn hàng và lý
              do trả lại để chúng tôi có thể hỗ trợ bạn nhanh chóng.
            </li>
          </ul>

          <p>(*) Lưu ý: Chính sách không áp dụng đối với chương trình ưu đãi đặc biệt: Gói ra mắt tháng 12/2024</p>

          <div class="statement">
            Chúng tôi luôn trân trọng sự ủng hộ của bạn và mong muốn mang đến những trải nghiệm tốt nhất khi sử dụng
            dịch vụ của Metric. Nếu có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua tổng đài
            <b>033 806 2221</b>, hoặc gửi vào hòm thư: <span style="font-weight:700; color: #E85912">ereport@metric.vn</span>. Cảm ơn bạn đã tin tưởng và lựa chọn Metric eReport!
          </div>

        </div>

        <TermAndPolicyContact/>
      </div>
    </template>
  </TermAndPolicy>
</template>

<script setup lang="ts">
import {CONTACTS, PAGE_TITLES} from '~/constant/constains';

useSeoMeta({
  title: PAGE_TITLES.placeOrderPolicy
})
</script>

<style lang="scss" scoped>
@import url("chinh-sach-dat-hang.scss");
</style>
