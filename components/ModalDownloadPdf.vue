<script setup lang="ts">
import {gsap} from 'gsap';
import {PARTERS} from "~/constant/constains"
import {NAVIGATIONS, WALLET} from "~/constant/constains";
import {computed, onMounted, onBeforeUnmount, ref, toRefs, watch, nextTick} from 'vue';
import {useCurrentUser} from "~/stores/current-user";
import {useRoute} from "vue-router";
import ViewPdfModal from "~/components/ViewPdfModal.vue";
import ReportPreviewSlide from "~/components/PreviewSlide/ReportPreviewSlide.vue";
import moment from "moment";
import {message} from "ant-design-vue";
import {formatCurrency} from "~/helpers/FormatHelper";
import {getIndexedDB} from "~/helpers/IndexedDBHelper";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { setCookie } from '~/helpers/CookieHelper';

const config = useRuntimeConfig();
const prefixResource = config.public.BASE_PATH !== '/' ? config.public.BASE_PATH : '';
const route = useRoute();
const showAlert = ref(false);
const currentUserStore = useCurrentUser();
const {userInfo} = storeToRefs(currentUserStore);
const selectOptions = [
  {
    name: 'Báo cáo 2 năm (2023 và 2024)',
      value: '20230101_20241231'
  },
  {
    name: 'Báo cáo năm 2024',
    value: '20240101_20241231'
  },
  {
    name: 'Báo cáo tháng 1/2025',
    value: '20250101_20250131'
  }
]

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({})
  },
  periodOfTimeDownload: {
    type: String,
    default: ''
  }
});

type HorizontalLoopConfig = {
  paused?: boolean;
  speed?: number;
  repeat?: number;
  paddingRight?: number;
  snap?: boolean | number | ((value: number) => number);
  reversed?: boolean;
};

onMounted(() => {
  if (Array.isArray(props.data.lst_period_of_time_download)) {
    const additionalOptions = props.data.lst_period_of_time_download.map(period => {
      const [start, end] = period.split('_');
      const startDate = dayjs(start, 'YYYYMMDD').format('MM/YYYY');
      const endDate = dayjs(end, 'YYYYMMDD').format('MM/YYYY');
      return {
        name: `Báo cáo năm ${startDate} - ${endDate}`,
        value: period
      };
    });
    selectOptions.push(...additionalOptions);
  }
  nextTick(() => {
    const boxes: HTMLElement[] = gsap.utils.toArray('.brand-item.loop') as HTMLElement[];

    if (boxes.length === 0) {
      console.warn("No elements found with selector '.brand-item.loop'");
      return;
    }

    horizontalLoop(boxes, {
      paused: false,
      speed: 0.3,
      repeat: -1,
      paddingRight: 32,
    });
  });
});

function horizontalLoop(items: HTMLElement[], config: HorizontalLoopConfig = {}): gsap.core.Timeline {
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });

  const length = items.length;
  const startX = items[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap(config.snap || 1);

  gsap.set(items, {
    xPercent: (i: number, el: HTMLElement) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100 +
        (gsap.getProperty(el, 'xPercent') as number)
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  const totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], 'scaleX') as number) +
    (config.paddingRight || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, 'scaleX') as number);

    tl.to(item, {
      xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
      duration: distanceToLoop / pixelsPerSecond,
    }, 0)
      .fromTo(item, {
        xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
      }, {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      }, distanceToLoop / pixelsPerSecond)
      .add(`label${i}`, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  (tl as any).times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }

  return tl;
}

const {open} = toRefs(props);
const emits = defineEmits(["update:open"]);

watch(open, (newVal) => {
  if (newVal) {
    nextTick(() => {
      const boxes: HTMLElement[] = gsap.utils.toArray('.brand-item.loop') as HTMLElement[];

      if (boxes.length === 0) {
        console.warn("No elements found with selector '.brand-item.loop'");
        return;
      }

      horizontalLoop(boxes, {
        paused: false,
        speed: 0.3,
        repeat: -1,
        paddingRight: 32,
      });
    });
  }
});

onBeforeUnmount(() => {
  gsap.killTweensOf('.brand-item.loop');
});

const downloading = ref(false);

const handleDownload = async () => {
  if (!currentUserStore.authenticated) {
    emits('update:open', false);
    localStorage.setItem('loginPayment', `${NAVIGATIONS.payment}/${route.params.slug}`);
    currentUserStore.setShowPopupLogin(true);
    return;
  }

  if (props.data.lst_period_of_time_download.includes(selectedReport.value)) {
    const [start_date, end_date] = selectedReport.value.split('_');
    const url = `${config.public.API_ENDPOINT}/api/report/get_download_pdf_url?slug=${props.data.slug}&type=download&start_date=${start_date}&end_date=${end_date}`;
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    trackEventCommon(EVENT_TYPE.DOWNLOAD_REPORT, 'download_report', '');
    try {
      downloading.value = true;
      const response: any = await $fetch(
          url,
          {
            headers: {
              'Authorization': `${accessToken}`,
              'Visitorid': visitorId.visitor_id,
            }
          }
      );
      const { url_download } = response;
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
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement('a');
              link.href = url;
              const fileName = `Báo cáo chi tiết nhóm hàng ${props.data.name} ${formatDate(props.data.start_date, "DDMMYYYY")}-${formatDate(props.data.end_date, "DDMMYYYY")}.pdf`;
              link.setAttribute('download', fileName);

              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
            });
      }
    } catch (e) {
      downloading.value = false;
      console.log('error', e);
    }
  } else {
    const slug = route.params.slug;
    let startDate = dateRange.value[0].format('YYYYMMDD');
    let endDate = dateRange.value[1].format('YYYYMMDD');
    navigateTo(`${NAVIGATIONS.payment}/${slug}?startDate=${startDate}&endDate=${endDate}`);
  }
};

const handleView = async () => {
  if (!currentUserStore.authenticated) {
    currentUserStore.setShowPopupLogin(true);
    return;
  }
  emits('update:open', false);
  if (props.data.is_report_pdf_valid && props.data.can_view) {
    navigateTo(`${NAVIGATIONS.home}view_pdf/${route.params.slug}`);
  } else {
    showAlert.value = true;
    console.log('showAlert', showAlert.value)
  }
};

watch(open, (newVal) => {
  if (newVal) {
    trackEventCommon(EVENT_TYPE.SHOW_POPUP_BUY_REPORT, 'show_popup_buy_report', '');
  }
});

const toggleUnlock = () => {
  emits('update:open', false);
};

const canViewReport = computed(() => {
  return (userInfo.value.current_plan?.remain_claim_pdf ?? 0) > 0;
});

const handleBuyReport = () => {
  navigateTo(`${NAVIGATIONS.pricing}`);
};

const formatDate = (value: string | Date, format: string = 'DD/MM/YYYY', inputFormat: string = "YYYY-MM-DD[T]HH:mm:ss"): string => {
  return moment(value, inputFormat).format(format);
}

const platforms = computed(() => {
  const basePlatforms = ['Shopee', 'Tiki', 'Lazada', 'Tiktok'];
  if (props.data.report_type !== 'report_category') {
    basePlatforms.push('Tiktok');
  }
  return basePlatforms;
});

const selectedReport = ref<string | null>(props.periodOfTimeDownload || selectOptions[1].value);
const showMonthPicker = ref(false);
const buttonText = computed(() => {
  return props.data.lst_period_of_time_download.includes(selectedReport.value) ? 'Tải xuống báo cáo' : 'Thanh toán ngay';
});
const splitDefault = selectedReport?.value.split('_');
const dateRange = ref<[Dayjs, Dayjs]>([dayjs(splitDefault[0], 'YYYYMMDD'), dayjs(splitDefault[1], 'YYYYMMDD')]);

// Handle selection change
const handleSelectChange = (value: string | null) => {
  if (value === null) {
    showMonthPicker.value = true;
  } else {
    showMonthPicker.value = false;
    if (!selectedReport) selectedReport.value = selectOptions[1].value;
    let splitDate = selectedReport?.value.split('_');
    dateRange.value = [dayjs(splitDate[0], 'YYYYMMDD'), dayjs(splitDate[1], 'YYYYMMDD')];
  }
};

// Update selected report when user picks a date range
const handleDateChange = () => {
  if (dateRange.value.length === 2) {
    let selectedRange = `Từ ${dateRange.value[0].format('YYYY-MM')} đến ${dateRange.value[1].format('YYYY-MM')}`;
    selectedReport.value = `${dateRange.value[0].format('DD/MM/YYYY')}-${dateRange.value[1].format('DD/MM/YYYY')}`;
    message.success(`Đã chọn: ${selectedRange}`);
  }
};

const disabledMonth = (current: Dayjs) => {
  return current.isBefore(dayjs('2022-01')) || current.isAfter(dayjs().subtract(1, 'month'));
};
</script>

<template>
  <a-modal
      :open="open" :width="950" :footer="null" @cancel="toggleUnlock" @ok="toggleUnlock"
  >
    <div>
      <div class="title_report">
        {{ props.data.can_download ? 'Tải báo cáo PDF' : 'Mua báo cáo PDF chi tiết chuyên sâu' }}
      </div>
      <div style="margin-bottom: 16px; margin-top: 4px;">
        <div 
          v-if="props.data.report_type !== 'report_brand' && props.data.report_type !== 'report_category'"
          class="name_report"
          style="text-align: center; margin-bottom: 12px; color: #706b92;"
          >
          Nhóm hàng: <span style="font-weight: 600; color: #E85912">{{ props.data.name }}</span>
        </div>
        <p v-else
          style="font-size: 14px; line-height: 22px; text-align: center; color: #706b92;"
        >
          {{ props.data.name.split(' ').slice(0,2).join(' ') }}:
          <span style="font-weight: 600; color: #E85912">{{ props.data.name.split(' ').slice(2).join(' ') }}</span>
        </p>
      </div>
    </div>
    <div class="noti_view_dept_report">
      <div class="preview_wrapper">
        <div class="slide_thumbnail">
          <ReportPreviewSlide :data="props.data"/>
        </div>
      </div>
      <div class="summary">
        <div class="title_container">
          <div>
            <ul>
              <li>Số liệu sàn: {{ platforms.join(', ') }}</li>
              <li>Gồm 50 trang dữ liệu chính xác, trực quan</li>
              <li>Nhận báo cáo PDF qua email trong 3 phút</li>
            </ul>
          </div>
        </div>
        <div class="adjust_time_wrapper">
          <p>Tuỳ chỉnh thời gian</p>
          <div class="adjust_time_wrapper_select">
            <a-select
                v-model:value="selectedReport"
                placeholder="Chọn báo cáo"
                ref="select"
                @change="handleSelectChange"
            >
              <a-select-option v-for="opt in selectOptions" :key="opt.value" :value="opt.value">
                {{ opt.name }}
              </a-select-option>
              <a-select-option :value="null">Tuỳ chọn thời gian</a-select-option>
            </a-select>

            <!-- Month Range Picker Modal -->
            <a-range-picker
                v-if="showMonthPicker"
                v-model:value="dateRange"
                format="MM/YYYY"
                picker="month"
                :disabledDate="disabledMonth"
                style="margin-top: 10px; width: 100%;"
                :placeholder="['Tháng bắt đầu', 'Tháng kết thúc']"
                @change="handleDateChange"
            />
          </div>
        </div>
        <div class="payment_container">
          <div v-if="!props.data.can_download" class="price">
            <div style="text-align: center">
              <span class="price_real">{{ formatCurrency(props.data.price) }}</span>
            </div>
            <div style="text-align: center; display: flex; align-items: center">
              <span class="price_discount">{{ formatCurrency(props.data.price_before_discount) }}</span>
            </div>
          </div>
          <div class="button_group">
            <a-button
                v-if="!data.is_unsellable"
                type="primary"
                style="width: 100%;height: 40px; font-size: 14px; box-shadow: 0 2px 0 rgba(0,0,0,.045); filter: font-family: Montserrat,serif;font-weight: 500"
                class="download_report_button" :loading="downloading"
                @click="handleDownload">
              {{ buttonText }}
            </a-button>
            <div v-if="userInfo.current_plan?.remain_claim_pdf && !props.data.can_download" class="button_group_view">
              <div style="color: #716B95">hoặc</div>
              <a-button
                  v-if="(userInfo.current_plan?.remain_claim_pdf ?? 0) > 0"
                  :disabled="!canViewReport"
                  style="width: 100%; height: 40px; font-size: 14px; display: flex; justify-content: center; align-items: center; position: relative"
                  class="download_report_button" @click="handleView">
                Xem báo cáo
                <div
                    style="position: absolute; top: -12px; right: -12px; background: #241E46; color: #FFFFFF; padding: 2px 4px">
                  còn {{ userInfo.current_plan?.remain_claim_pdf ?? 0 }} lượt
                </div>
                <svg style="position: absolute; top: 15px; right: -12px;" xmlns="http://www.w3.org/2000/svg" width="13"
                     height="8" viewBox="0 0 13 8" fill="none">
                  <path d="M0 8L13 0H0V8Z" fill="#120B37"/>
                </svg>
              </a-button>
              <a-button
                  v-else
                  style="width: 100%; height: 40px; font-size: 14px; display: flex; justify-content: center; align-items: center; position: relative"
                  @click="handleBuyReport"
              >
                Mua gói báo cáo
              </a-button>
            </div>
          </div>
<!--          <a style="color: #1890FF;" @click="downloadSampleReport()">Tải báo cáo mẫu</a>-->
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="sectionHeader">
        <p class="sectionTitle">Được tin dùng bởi 1000+ doanh nghiệp TMĐT hàng đầu</p>
      </div>
      <div class="">
        <div class="brand-list">
          <div v-for="(brand, index) in PARTERS" :key="index" class="brand-item loop">
            <NuxtImg format="webp" loading="lazy" :src="prefixResource + brand" alt="brand_logo"/>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
  <view-pdf-modal v-model:showAlert="showAlert"/>
</template>


<style scoped lang="scss">
.wrapper {
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @include mobile {
    //padding: 0px 16px;
    margin: 14px 0;
    gap: 14px;
  }

  .sectionHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;

    .sectionTitle {
      font-size: 14px;
      font-weight: 700;
      line-height: 28px;

      @include mobile {
        line-height: 19px;
        font-size: 12px;
      }
    }
  }

  .brand-list {
    display: flex;
    gap: 10px;

    margin: 0 auto 14px;

    overflow: hidden;

    .brand-item {
      background-color: #fff;

      //height: 120px;
      width: 60px;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 5px;
      border-radius: 5px;
      z-index: 2;

      img {
        //height: 60px;
        width: 100%;
        object-fit: contain;
      }
    }
  }
}

.name_report{
  font-size: 16px;
  color: var(--Dark-blue-dark-blue-5, #716B95);
  font-weight: 400;
  line-height: 24px;
}

.title_report {
  color: #241E46;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  line-height: 32px;
  padding-top: 32px;
}
.noti_view_dept_report {
  display: flex;
  padding: 16px;
  font-family: 'Inter', sans-serif;

  .preview_wrapper {
    background: #FBFAFC;
    padding: 20px;
    border-radius: 8px;
    margin-right: 32px;

    .slide_thumbnail {
      display: flex;
      flex: 0.6;
      justify-content: center;
      align-items: center;
    }
  }

  .summary {
    display: flex;
    flex: 0.4;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title_container {
      display: flex;
      flex-direction: column;
      gap: 20px;


      div {
        p {
          color: #241E46;
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          line-height: 20px;
          margin-bottom: 12px;
        }

        ul {
          list-style-type: disc;

          li {
            color: #241E46;
            // text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.4;
            margin-bottom: 8px;
          }
        }
      }
    }
    .adjust_time_wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      gap: 16px;
      align-self: flex-start;
      width: 100%;

      .adjust_time_wrapper_select{
        width: 100%;
        .ant-select{
          width: 100% !important;
          .ant-select-selector{
            display: flex;
            align-items: center;
            height: 60px;
          }
        }
      }
      p {
        align-self: flex-start;
        font-size: 14px;
        font-weight: 700;
      }

    }
    .payment_container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      margin-top: 16px;

      .price {
        display: flex;
        flex-direction: row;
        gap: 8px;
        margin-top: 16px;

        .price_real {
          color: rgb(237, 75, 0);
          font-size: 32px;
          font-weight: 800;
          text-align: center;
        }

        .price_discount {
          color: #9FA5B2;
          font-size: 18px;
          font-weight: 500;
          text-align: center;
          text-decoration-line: line-through;
        }
      }

      .note {
        color: #716B95;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
      }
    }

    .button_group {
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .button_group_view {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
    }

    .wallet_info {
      display: flex;
      align-items: center;

      p {
        color: #716B95;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .slide_thumbnail, .summary {
      flex: 1;
      width: 100%;
    }

    .summary {
      .title_container {
        margin-bottom: 32px;
      }
    }

    .title_container {
      gap: 10px;
      margin-bottom: 20px;

      .title_report {
        font-size: 24px;
      }

      div {
        gap: 8px;

        p {
          font-size: 18px;
        }

        ul {
          li {
            font-size: 12px;
          }
        }
      }
    }

    .payment_container {
      gap: 8px;

      .price {
        gap: 4px;

        .price_real {
          font-size: 28px;
        }

        .price_discount {
          font-size: 12px;
        }
      }

      .note {
        font-size: 12px;
      }
    }

    .button_group {
      width: 100%;
      gap: 4px;
    }

    .wallet_info {
      p {
        font-size: 12px;
      }
    }
  }
}

@media (max-width: 768px) {
  .noti_view_dept_report {
    margin-top: 16px;
    gap: 24px;
  }
}
</style>

<style lang="scss">
.ant-modal {
  @media (max-width: 767px) {
    top: 20px;
  }
}
</style>

