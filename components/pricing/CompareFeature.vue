<script setup lang="ts">
import CheckIcon from "~/components/pricing/CheckIcon.vue";
import {NAVIGATIONS} from "~/constant/constains";
import {onMounted, ref} from "vue";
const currentUserStore = useCurrentUser();
const {userInfo}: any = storeToRefs(currentUserStore);
const value = ref('pt50');
const price = ref('1,990,000đ');

watch(value, (newValue) => {
  if (newValue === 'pt50') {
    price.value = '1,990,000đ';
  } else if (newValue === 'pt100') {
    price.value = '2,990,000đ';
  }
});

const windowWidth = ref(0);
const isMobile = ref(false);
const title = computed(() => {
  if (userInfo.value?.id) {
    if (userInfo.value?.current_plan?.plan_code === 'e_free'
        || userInfo.value?.current_plan?.plan_code === 'e_trial'
        || userInfo.value?.current_plan?.plan_code === 'e_community'
        || !userInfo.value?.current_plan?.plan_code
    ) {
      return 'Mua ngay';
    } else if (userInfo.value?.current_plan?.plan_code === value.value) {
      return 'Đang sử dụng';
    } else {
      return 'Liên hệ tư vấn';
    }
  }
  return 'Mua ngay';
});

onMounted(() => {
  windowWidth.value = window.innerWidth;
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
  });
});
const navigateToPayment = (plan_code: any) => {
  navigateTo(`${NAVIGATIONS.payment}?plan_code=${plan_code}`);
};

const navigateToContactUs = () => {
  navigateTo(`${NAVIGATIONS.contactUs}`);
};


const handleClickFindReport = () => {
  navigateTo(`${NAVIGATIONS.report}`);
};

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

const paddingLeft = computed(() => (isMobile ? '16px' : '32px'));

const dataSource = [
  {
    key: '1',
    type_compare: '<b style="font-weight: bold; font-size: 16px; display: flex; color: #E85912">Tổng quan</b>',
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
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê nhóm hàng</b>`,
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '10',
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê gian hàng toàn thị trường</b>`,
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '11',
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê thương hiệu toàn thị trường</b>`,
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '12',
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê sản phẩm bán chạy toàn sàn</b>`,
    pdf_report: 'CheckIcon',
    quick_view: 'CheckIcon',
  },
  {
    key: '13',
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê đánh giá</b>`,
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
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê thương hiệu từng sàn</b>`,
    pdf_report: 'CheckIcon',
    quick_view: '-',
  },
  {
    key: '16',
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê gian hàng từng sàn</b>`,
    pdf_report: 'CheckIcon',
    quick_view: '-',
  },
  {
    key: '17',
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Thống kê sản phẩm bán chạy từng sàn</b>`,
    pdf_report: 'CheckIcon',
    quick_view: '-',
  },
  {
    key: '18',
    type_compare: `<b style="font-weight: bold; display: flex; padding-left: ${paddingLeft.value}">Dữ liệu chi tiết của 10 shop hàng đầu</b>`,
    pdf_report: 'CheckIcon',
    quick_view: '-',
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
    <div class="note_price">
      <div></div>
      <div class="pdf_report">
        <div></div>
        <p>Từ  <b>250,000đ</b>/báo cáo</p>
        <a-button size="large" @click="handleClickFindReport" style="width: 200px">Tìm báo cáo ngay</a-button>
      </div>
      <div class="quick_view">
        <a-select
            v-model:value="value"
            style="width: 100%"
        >
          <a-select-option value="pt50">50 lượt xem online</a-select-option>
          <a-select-option value="pt100">100 lượt xem online</a-select-option>
        </a-select>
        <p>{{price}}</p>
        <a-button
            v-if="title === 'Mua ngay'"
            :class="'not_user_plan'"
            style="height: 40px"
            @click="userInfo.id ? navigateToPayment(userInfo.value?.current_plan?.plan_code) : currentUserStore.setShowPopupLogin(true)"
        >
          Mua ngay
        </a-button>

        <a-button
            v-if="title === 'Đang sử dụng'"
            :class="'user_plan'"
            style="height: 40px"
        >
          Đang sử dụng
        </a-button>

        <a-button
            v-if="title === 'Liên hệ tư vấn'"
            :class="'contact_plan'"
            style="height: 40px"
            @click="userInfo.id ? navigateToContactUs : currentUserStore.setShowPopupLogin(true)"
        >
          Liên hệ tư vấn
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#compare_feature{
  padding-bottom: 80px;
  .title{
    color: #241E46;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
    padding-bottom: 64px;
  }

  .note_price{
    display: flex;
    justify-content: space-around;

    .pdf_report{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      padding: 16px 0 16px 150px;
      p{
        b{
          font-size: 24px;
          font-weight: 700;
          color: #241E46;
        }
      }
    }

    .quick_view{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      padding: 16px 0;
      p{
        font-size: 24px;
        font-weight: 700;
        color: #241E46;
      }
    }
  }
}

.not_user_plan {
  background: #E85912;
  color: #FFF;
  width: 100%;
}

.user_plan {
  background: #DEDEE4;
  color: #9D9BB0;
  width: 100%;
}

.contact_plan{
  background: #FFF;
  width: 100%;
}
@media (max-width: 768px) {
  #compare_feature {
    .title{
      font-size: 24px;
      line-height: 32px;
      padding-bottom: 32px;
    }
    .note_price {
      display: none;
    }
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
                      td {
                        align-content: center;
                      }

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