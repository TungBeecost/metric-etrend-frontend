<script setup lang="ts">
import { defineProps } from 'vue';

const { report } = defineProps({
  report: {
    type: Object,
    required: true
  }
});

interface Marketplace {
  platform_id: string;
  name: string;
  ratio_revenue: number;
  ratio_sale: number;
}

function formatDate(dateStr: string): string {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${day}-${month}-${year}`;
}

const formattedStartDate = formatDate(report.start_date);
const formattedEndDate = formatDate(report.end_date);

</script>

<template>
  <div
      id="pack_service"
      class="border statistic-block"
  >
    <div class="statistic-item__title">
      <div class="title">
        <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
        </svg>
        <div>
          <div class="title_content">Chi tiết đơn hàng</div>
        </div>
      </div>
    </div>
    <div class="statistic-item__content">
      <div class="content">
        <div class="summary">
          <div class="report_type">
            <p>Loại báo cáo</p>
            <p style="font-size: 16px; color: #E85912; font-weight: 700;">Báo cáo chuyên sâu</p>
          </div>
          <div class="report_group">
            <p>Nhóm hàng</p>
            <p style="font-size: 16px; color: #241E46; font-weight: 700;">{{ report.name }}</p>
          </div>
        </div>

        <div class="divider"/>

        <div class="permission">
          <p class="includeLabel">Thông tin chi tiết</p>
          <div class="permissionList">
            <p>• Số liệu sàn: {{ report.data_analytic.by_marketplace.lst_marketplace.map((marketplace: Marketplace) => marketplace.name).join(', ') }}</p>
            <p>• Từ {{ formattedStartDate }} đến {{ formattedEndDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#pack_service{
  display: flex;
  flex-direction: column;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid #EEEBFF;
  background-color: #FFF;

  .statistic-item__title{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EEEBFF;
    padding: 24px;


    .title{
      display: flex;
      align-items: center;
      gap: 16px;

      .title_content{
        font-size: 24px;
        color: #241E46;
        font-weight: bold;
        line-height: 38px;
      }
    }

    .title_link{
      display: flex;
      align-items: center;

      a{
        font-size: 16px;
        color: #1890FF;
        font-weight: 400;
        line-height: 22px;
        text-decoration: none;
      }
    }
  }

  .statistic-item__content{
    padding: 24px;
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      //padding: 30px 24px 24px 24px;
      align-items: stretch;
      gap: 24px;
      flex: 1 0 0;

      .summary {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .report_type {
          display: flex;
          justify-content: space-between;
        }

        .report_group {
          display: flex;
          justify-content: space-between;
        }

        .planPrice {
          font-size: 36px;
          font-weight: 700;
          line-height: 48px;

          @include mobile {
            font-size: 24px;
            line-height: 38px;
          }

          .priceUnit {
            color: $lighter_text_color;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
        }
      }

      .divider {
        height: 1px;
        background: $divider;
      }

      .permission {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        flex: 1 0 0;

        .includeLabel {
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
        }

        .permissionList {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;

          .permissionItem {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;

            font-size: 14px;
            font-weight: 400;
            line-height: 22px;

            .permissionIcon {
              width: 16px;
              height: 16px;
            }

            .perm {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .subPerm {
              margin-left: 16px;
            }
          }
        }
      }

      .not_user_plan{
        background: #E85912;
        color: #FFF;
        width: 100%;
      }

      .user_plan{
        background: #DEDEE4;
        color: #9D9BB0;
        width: 100%;
      }
    }
  }
}
</style>