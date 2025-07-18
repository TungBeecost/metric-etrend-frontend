<script setup lang="ts">
import Discover from "~/components/report/Discover.vue";
import FeaturedReport from "~/components/report/FeaturedReport.vue";
import ItemNewReport from "~/components/report/ItemNewReport.vue";
import { type SearchReportPayload } from "~/services/reports";
import { PAGE_TITLES } from "~/constant/constains";
import { REPORT_ENDPOINTS } from "~/constant/endpoints";
import ExploreByReportType from "~/components/report/ExploreByReportType.vue";
import {onMounted} from "vue";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";
import TopReportCategory from "~/components/report/TopReportCategory.vue";
import TopReportProductLine from "~/components/report/TopReportProductLine.vue";
import TopTredingKeyword from "~/components/report/TopTredingKeyword.vue";
import FeaturedCollection from "~/components/report/FeaturedCollection.vue";

const config = useRuntimeConfig();
const isLoading = ref(true);
const lstReport = ref([]);

const fetchReport = async () => {
  try {
    const body: SearchReportPayload = {
      limit: 6,
      lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop", "created_at", "url_square"],
      lst_query: [],
      lst_category_report_id: [],
      offset: 0,
      sort: "created_at",
      order: "desc",
    };
    const { lst_report }: any = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
      method: 'POST',
      body
    });
    lstReport.value = lst_report;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

fetchReport();

onMounted(() => {
  trackEventCommon(EVENT_TYPE.VIEW_REPORT_REPORTS, 'view_report_reports', '');
});

// Add beforeunload event listener
if (process.client) {
  window.addEventListener('beforeunload', async (event) => {
    console.log(`force send event before page unload`);
    // Ensure events are sent before the page unloads
    trackEventCommon(EVENT_TYPE.VIEW_REPORT_REPORTS, 'view_report_reports', '');
  })
}

useSeoMeta({
  title: PAGE_TITLES.reports
});
</script>

<template>
  <div class="title_report">
    <div class="image-metric">
      <div class="default_section">
        <div class="title">
          <div class="content">
            <div class="report_title">Khám phá xu hướng thị trường</div>
            <div class="description">
              Theo dõi xu hướng tăng trưởng, nhóm hàng bán chạy, từ khóa hot và phân tích sâu theo ngành, shop, thương hiệu ngay với dữ liệu chính xác nhất
            </div>
          </div>
<!--          <div class="new_report">-->
<!--            <div class="title_new_report">-->
<!--              Báo cáo mới nhất-->
<!--            </div>-->
<!--            <div v-if="isLoading">-->
<!--              <a-skeleton />-->
<!--            </div>-->
<!--            <item-new-report v-else class="item_new_report_tran" :reports="lstReport" />-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <top-report-category/>
    <top-report-product-line/>
    <top-treding-keyword/>
    <explore-by-report-type/>
    <discover/>
    <featured-collection/>
    <ContactUs/>
  </div>
</template>

<style scoped lang="scss">
.title_report {
  width: 100%;
  height: 100%;

  .image-metric {
    display: flex;
    padding: 60px;
    flex-direction: column;
    gap: 40px;
    background: url('/images/Hero_banner.png') no-repeat;
    background-size: cover;

    .title {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 80px;

      .content {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .report_title {
          font-size: 44px;
          font-weight: bold;
          color: #FFF;
          line-height: 56px;
        }

        .description {
          font-size: 16px;
          max-width: 650px;
          color: #FFF;
        }
      }
    }
  }
}

.hidden-report {
  opacity: 0;
  transition: opacity 0.9s ease;
}

.visible-report {
  opacity: 1;
  transition: opacity 0.9s ease;
}

.new_report {
  .title_new_report {
    margin-bottom: 16px;
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
  }
}

.item_new_report_tran{
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


@media (max-width: 1023px) {
  .new_report {
    gap: 16px;

    .title_new_report {
      font-size: 20px;
    }
  }
}

@media (min-width: 1919px) {
  .title_report {
    .image-metric {
      .title {
        .content {
          .report_title {
            font-size: 48px;
          }

          .description {
            font-size: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 1919px) {
  .title_report {
    .image-metric {
      .title {
        .content {
          .report_title {
            font-size: 36px;
          }

          .description {
            font-size: 14px;
            width: 650px;
          }
        }
      }
    }
  }
}

@media (max-width: 1380px) {
  .title_report {
    .image-metric {
      .title {
        .content {
          .report_title {
            font-size: 34px;
          }

          .description {
            font-size: 13px;
            width: 600px;
          }
        }
      }
    }
  }
}
@media (max-width: 1023px) {
  .title_report {
    .image-metric {
      .title {
        .content {
          .report_title {
            font-size: 28px;
          }

          .description {
            font-size: 12px;
            width: 550px;
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .title_report {
    .image-metric {
      height: 300px;
      padding: 20px;
      .title {
        gap: 40px;

        .content {
          .report_title {
            font-size: 36px;
          }

          .description {
            font-size: 14px;
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: 460px) {
  .title_report {
    .image-metric {
      .title {
        padding-top: 20px;
        gap: 40px;

        .content {
          .report_title {
            font-size: 36px;
          }

          .description {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
