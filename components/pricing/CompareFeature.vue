<script setup lang="ts">
import CheckIcon from "~/components/pricing/CheckIcon.vue";

const columns = [
  {
    title: '',
    dataIndex: 'type_compare',
    key: 'type_compare',
  },
  {
    title: 'Báo cáo PDF chi tiết',
    dataIndex: 'pdf_report',
    key: 'pdf_report',
  },
  {
    title: 'Tài khoản xem nhanh',
    dataIndex: 'quick_view',
    key: 'quick_view',
    scopedSlots: { customRender: 'quick_view' },
  },
]

const dataSource = [
  {
    key: '1',
    type_compare: '<b style="font-weight: bold; display: flex; color: #E85912">Tổng quan</b>',
    pdf_report: '',
    quick_view: '',
  },
  {
    key: '2',
    type_compare: '<b style="font-weight: bold; display: flex">Số lượng báo cáo</b>',
    pdf_report: '<b style="font-weight: bold">1 báo cáo</b><br/>(Báo cáo chi tiết PDF)',
    quick_view: '<b style="font-weight: bold">50 báo cáo</b><br/>(Báo cáo rút gọn Online)',
  },
  {
    key: '3',
    type_compare: '<b style="font-weight: bold; display: flex">Thời gian xem báo cáo</b>',
    pdf_report: 'Vĩnh viễn',
    quick_view: 'Không giới hạn xem lại báo cáo trong vòng 24h',
  },
  {
    key: '4',
    type_compare: '<b style="font-weight: bold; display: flex">Chi tiết số liệu</b>',
    pdf_report: '50 trang PDF chuyên sâu về 1 nhóm hàng',
    quick_view: 'Tổng quan Quy mô thị trường và thị phần',
  },
  {
    key: '5',
    type_compare: '<b style="font-weight: bold; display: flex">Thời gian nhận báo cáo</b>',
    pdf_report: 'Trong vòng 5 phút',
    quick_view: 'Xem ngay lập tức',
  },
  {
    key: '6',
    type_compare: '<b style="font-weight: bold; display: flex">Phân tích thông minh</b>',
    pdf_report: '-',
    quick_view: 'CheckIcon',
  },
  {
    key: '7',
    type_compare: '<b style="font-weight: bold; display: flex; color: #E85912">Nội dung báo cáo</b>',
    pdf_report: '',
    quick_view: '',
  },
  {
    key: '8',
    type_compare: '<b style="font-weight: bold; display: flex">Tổng quan thị trường</b>',
    pdf_report: '',
    quick_view: '',
  },
  {
    key: '9',
    type_compare: '<b style="font-weight: bold; display: flex; padding-left: 32px">Thống kê nhóm hàng</b>',
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '10',
    type_compare: '<b style="font-weight: bold; display: flex; padding-left: 32px">Thống kê gian hàng toàn thị trường</b>',
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '11',
    type_compare: '<b style="font-weight: bold; display: flex; padding-left: 32px">Thống kê thương hiệu toàn thị trường</b>',
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '12',
    type_compare: '<b style="font-weight: bold; display: flex; padding-left: 32px">Thống kê sản phẩm bán chạy toàn sàn</b>',
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '13',
    type_compare: '<b style="font-weight: bold; display: flex; padding-left: 32px">Thống kê đánh giá</b>',
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '14',
    type_compare: '<b style="font-weight: bold; display: flex">Dữ liệu chi tiết từng sàn</b>',
    pdf_report: '',
    quick_view: '',
  },
  {
    key: '15',
    type_compare: '<b style="font-weight: bold; display: flex">Thống kê thương hiệu từng sàn</b>',
    pdf_report: 'CheckIcon',
    quick_view: '-',
  },
  {
    key: '16',
    type_compare: '<b style="font-weight: bold; display: flex">Thống kê gian hàng từng sàn</b>',
    pdf_report: 'CheckIcon',
    quick_view: '-',
  },
  {
    key: '17',
    type_compare: '<b style="font-weight: bold; display: flex">Thống kê sản phẩm bán chạy từng sàn</b>',
    pdf_report: 'CheckIcon',
    quick_view: '-',
  },
  {
    key: '18',
    type_compare: '<b style="font-weight: bold; display: flex">Dữ liệu chi tiết của 10 shop hàng đầu</b>',
    pdf_report: 'CheckIcon',
    quick_view: '-',
  },
  {
    key: '19',
    type_compare: '',
    pdf_report: '<div><div style="color: #716B95">Từ <b style="font-size: 24px; font-weight: 700; line-height: 32px; color: #241E46">399,000đ</b>/báo cáo</div><div style="border: 1px solid; border-radius: 8px; font-size: 16px; padding: 12px 16px;">Tìm báo cáo ngay</div></div>',
    quick_view: '',
  },
]
</script>

<template>
  <div id="compare_feature">
    <div class="title">
      So sánh chi tiết tính năng các gói
    </div>
    <div class="table_compare">
      <a-table
          :dataSource="dataSource"
          :columns="columns"
          :pagination="false"
      >
        <template #headerCell="{ column }">
        </template>
        <template #bodyCell="{ column, record }">
          <div class="center-content">
            <component :is="record[column.dataIndex] === 'CheckIcon' ? CheckIcon : 'div'">
              <template v-if="record[column.dataIndex] !== 'CheckIcon'">
                <div v-html="record[column.dataIndex]"></div>
              </template>
            </component>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
#compare_feature{
  .title{
    color: #241E46;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
  }
}
</style>

<style lang="scss">
#compare_feature {
  .table_compare {
    .ant-table-wrapper {
      .ant-spin-nested-loading {
        .ant-spin-container {
          .ant-table {
            .ant-table-container {
              .ant-table-content {
                table {
                  .ant-table-thead {
                    tr {
                      th {
                        text-align: center;
                      }
                      th:nth-child(3) {
                        color: white;
                        background: var(--gradient-1, linear-gradient(270deg, #FF6931 0.47%, #FF9839 99.53%));
                      }
                    }
                  }
                  .ant-table-tbody{
                    tr:nth-child(even) {
                      td:nth-child(1),
                      td:nth-child(2) {
                        background: #FBFAFC;
                      }
                      td:nth-child(3) {
                        background: #FFE5D8; // Example background color for even rows
                        border-right: 1px solid var(--gradient-1, #FF6931);
                        border-left: 1px solid var(--gradient-1, #FF6931);
                      }
                    }
                    tr:nth-child(odd):not(:nth-child(1)):not(:nth-child(7)):not(:nth-child(19)) {
                      td:nth-child(3) {
                        background: #FFF7F3;
                        border-right: 1px solid var(--gradient-1, #FF6931);
                        border-left: 1px solid var(--gradient-1, #FF6931);
                      }
                    }
                    tr:nth-child(1), tr:nth-child(7) {
                      td:nth-child(3) {
                        border-right: 1px solid var(--gradient-1, #FBFAFC);
                      }
                    }
                    tr {
                      td:nth-child(2),
                      td:nth-child(3) {
                        text-align: center;

                        .center-content{
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>