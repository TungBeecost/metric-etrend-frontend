<script setup lang="ts">
import {NAVIGATIONS, WALLET} from "~/constant/constains";
import {computed, defineEmits, defineProps, ref, toRefs} from 'vue';
import {useCurrentUser} from "~/stores/current-user";
import {useRoute} from "vue-router";
import ViewPdfModal from "~/components/ViewPdfModal.vue";
import ReportPreviewSlide from "~/components/PreviewSlide/ReportPreviewSlide.vue";
import moment from "moment";
import {message} from "ant-design-vue";
import {formatCurrency} from "~/helpers/FormatHelper";

const config = useRuntimeConfig();
const route = useRoute();
const showAlert = ref(false);
const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({})
  }
});

const {open} = toRefs(props);
const emits = defineEmits(["update:open"]);

const downloading = ref(false);

const handleDownload = async () => {
  if (!currentUserStore.authenticated) {
    currentUserStore.setShowPopupLogin(true);
    return;
  }

  if (props.data.can_download) {
    const url = `${config.public.API_ENDPOINT}/api/report/get_download_pdf_url?slug=${props.data.slug}`;

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';
    try {
      downloading.value = true;
      const response: any = await $fetch(
          url,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
      );

      console.log('response', response)
      const {url_download} = response;
      downloading.value = false;
      if (url_download) {
        message.success('Bắt đầu tải xuống báo cáo');
        emits('update:open', false);

        fetch(url_download, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
        })
            .then((response) => response.blob())
            .then((blob) => {
              // Create blob link to download
              const url = window.URL.createObjectURL(
                  new Blob([blob]),
              );
              const link = document.createElement('a');
              link.href = url;
              const fileName = `Báo cáo chuyên sâu nhóm hàng ${props.data.name} ${formatDate(props.data.start_date, "DDMMYYYY")}-${formatDate(props.data.end_date, "DDMMYYYY")}.pdf`;
              link.setAttribute(
                  'download',
                  fileName,
              );

              document.body.appendChild(link);
              link.click();

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              link.parentNode.removeChild(link);

            });
      }
    } catch (e) {
      downloading.value = false;
      console.log('error', e)
    }
    return
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


const formatDate = (value: string | Date, format: string = 'DD/MM/YYYY', inputFormat: string = "YYYY-MM-DD[T]HH:mm:ss"): string => {
  return moment(value, inputFormat).format(format);
}

</script>

<template>
  <a-modal
      :visible="open" :width="1000" :footer="null" @cancel="toggleUnlock" @ok="toggleUnlock"
  >
    <div class="noti_view_dept_report">
      <div class="slide_thumbnail">
        <ReportPreviewSlide :data="props.data"/>
      </div>
      <div class="summary">
        <div class="title_container">
          <div class="title_report">Báo cáo chuyên sâu</div>
          <div>
            <p>Nhóm hàng {{ props.data.name }}</p>
            <ul>
              <li>• Số liệu sàn: Shopee, Tiki, Lazada</li>
              <li>• Từ {{ formatDate(props.data.start_date, "DD-MM-YYYY") }}
                đến {{ formatDate(props.data.end_date, "DD-MM-YYYY") }}
              </li>
            </ul>
          </div>
        </div>
        <div class="payment_container">
          <div class="price">
            <p class="price_real">{{ formatCurrency(props.data.price) }}</p>
            <!-- TODO: price_discount -->
            <p class="price_discount">2.500.000đ</p>
          </div>
          <div class="note">
            Nhận báo cáo qua email trong vòng 05 phút
          </div>
          <div class="button_group">
            <a-button type="primary"
                      style="width: 100%; height: 40px; font-size: 14px; display: flex; justify-content: center; align-items: center"
                      class="download_report_button" :loading="downloading"
                      @click="handleDownload">Tải báo cáo
            </a-button>
            <a-button v-if="userInfo.current_plan.remain_claim_pdf"
                      :disabled="!canViewReport"
                      style="width: 100%; height: 40px; font-size: 14px; display: flex; justify-content: center; align-items: center"
                      class="download_report_button" @click="handleView">Xem báo cáo
            </a-button>
          </div>
          <div class="wallet_info">
            <p>Hỗ trợ thanh toán trực tuyến</p>
            <div style="display: flex">
              <div v-for="wallet in WALLET" :key="wallet.code">
                <img style="width: 40px; height: 40px" :src="wallet.thumbnail" alt="icon">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
  <view-pdf-modal v-model:showAlert="showAlert" :is-report-pdf-valid="props.data.is_report_pdf_valid"/>
</template>
<style scoped lang="scss">
.noti_view_dept_report {
  display: flex;

  padding: 16px;

  .slide_thumbnail {
    display: flex;
    flex: 0.6;
    justify-content: center;
    align-items: center;
  }

  .summary {
    display: flex;
    flex: 0.4;
    flex-direction: column;

    justify-content: center;

    .title_container {
      display: flex;
      flex-direction: column;
      gap: 20px;

      margin-bottom: 50px;

      .title_report {
        color: #E85912;
        text-align: center;
        font-size: 28px;
        font-weight: 700;
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 16px;

        p {
          color: #241E46;
          text-align: center;
          font-family: Inter, sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 20px;
        }

        ul {
          li {
            color: var(--Dark-blue-dark-blue-5, #716B95);
            text-align: center;
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 133.333% */
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
          font-weight: 800;
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