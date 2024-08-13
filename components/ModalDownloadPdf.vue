<script setup lang="ts">
import { NAVIGATIONS, WALLET } from "~/constant/constains";
import {defineEmits, defineProps, toRefs, computed, ref} from 'vue';
import { useCurrentUser } from "~/stores/current-user";
import { useRoute } from "vue-router";
import ViewPdfModal from "~/components/ViewPdfModal.vue";

const route = useRoute();
const showAlert = ref(false);
const currentUserStore = useCurrentUser();
const { userInfo } = storeToRefs(currentUserStore);

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
});

const { open } = toRefs(props);
const emits = defineEmits(["update:open"]);

const reports = [
  {
    name: 'Báo cáo 1',
    url_thumbnail: '/images/dept_report_thumbnail/image 6.png',
  },
  // Additional reports can be added here
];

const handleDownload = () => {
  if (!currentUserStore.authenticated) {
    currentUserStore.setShowPopupLogin(true);
    return;
  }
  const slug = route.params.slug;
  navigateTo(`${NAVIGATIONS.payment}/${slug}`);
};

const handleView = async () => {
  if (!currentUserStore.authenticated) {
    currentUserStore.setShowPopupLogin(true);
    return;
  }
  emits('update:open', false);
  showAlert.value = true;
};

const toggleUnlock = () => {
  emits('update:open', false);
};

const canViewReport = computed(() => {
  return (userInfo.value.current_plan?.remain_claim_pdf ?? 0) > 0;
});
</script>

<template>
  <a-modal :visible="open" width="1000px" :footer="null" @cancel="toggleUnlock" @ok="toggleUnlock">
    <div class="noti_view_dept_report">
      <div class="slide_thumbnail">
        <Carousel :items-to-show="1" :items-to-scroll="1" :wrap-around="true" style="width: 100%;" :snap-align="'start'">
          <Slide v-for="report in reports" v-bind="report" :key="report.name">
            <div class="slide-item">
              <div class="thumbnail">
                <img :src="report.url_thumbnail" alt="" style="width: 100%; object-fit: cover">
              </div>
            </div>
          </Slide>
          <template #addons>
            <navigation/>
            <pagination/>
          </template>
        </Carousel>
      </div>
      <div class="summary">
        <div class="title_container">
          <div class="title_report">Báo cáo chuyên sâu</div>
          <div>
            <p>Nhóm hàng Dép Nam</p>
            <ul>
              <li>• Số liệu sàn: Shopee, Tiki, Lazada</li>
              <li>• Từ 01-07-2023 đến 30-06-2024</li>
            </ul>
          </div>
        </div>
        <div class="payment_container">
          <div class="price">
            <p class="price_real">1.600.000đ</p>
            <p class="price_discount">2.500.000đ</p>
          </div>
          <div class="note">
            Nhận báo cáo qua email trong vòng 05 phút
          </div>
          <div class="button_group">
            <a-button type="primary" style="width: 100%; height: 40px; font-size: 14px; display: flex; justify-content: center; align-items: center" class="download_report_button" @click="handleDownload">Tải báo cáo</a-button>
            <a-button v-if="userInfo.current_plan.remain_claim_pdf" :disabled="!canViewReport" style="width: 100%; height: 40px; font-size: 14px; display: flex; justify-content: center; align-items: center" class="download_report_button" @click="handleView">Xem báo cáo</a-button>
          </div>
          <div class="wallet_info">
            <p>Hỗ trợ thanh toán trực tuyến</p>
            <div style="display: flex">
              <div v-for="wallet in WALLET" :key="wallet.code">
                <img style="width: 40px; height: 40px" :src="wallet.thumbnail" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
  <view-pdf-modal v-model:showAlert="showAlert"/>
</template>
<style scoped lang="scss">
.noti_view_dept_report {
  display: flex;
  align-items: center;

  .slide_thumbnail {
    padding: 0 40px;
    flex: 0.6;
  }

  .summary {
    display: flex;
    flex: 0.4;
    flex-direction: column;
    justify-content: space-between;
    gap: 64px;

    .title_container {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .title_report {
        color: #E85912;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 8px;

        p {
          color: #241E46;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          line-height: 20px;
        }

        ul {
          li {
            text-align: center;
            color: #716B95;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
    }

    .payment_container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;

      .price {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .price_real {
          color: #E85912;
          font-size: 36px;
          font-weight: 700;
          text-align: center;
        }

        .price_discount {
          color: #716B95;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          text-decoration-line: line-through;
        }
      }

      .note {
        color: #716B95;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }
    }

    .button_group {
      width: 80%;
      display: flex;
      gap: 8px;
    }

    .wallet_info {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        color: #716B95;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }
    }
  }
}
</style>