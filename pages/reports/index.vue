<script setup lang="ts">

import Discover from "~/components/report/Discover.vue";
import FeaturedReport from "~/components/report/FeaturedReport.vue";
import ItemNewReport from "~/components/report/ItemNewReport.vue";
import { searchReport, type SearchReportPayload } from "~/services/reports";
import { PAGE_TITLES } from "../../constant/constains";


const lstReportNew = ref([])

const fetchReport = async () => {
  try {
    const body: SearchReportPayload = {
      limit: 10,
      lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop", "created_at"],
      lst_query: [],
      lst_category_report_id: [],
      offset: 0,
      sort: "popularity",
      order: "desc",
    };
    const response: any = await searchReport(body)

    lstReportNew.value = response.lst_report;

    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  fetchReport()
})

useSeoMeta({
  title: PAGE_TITLES.reports
})
</script>

<template>
  <div class="title_report">
    <div class="image">
      <div class="default_section">
        <div class="title">
          <div class="content">
            <div class="report_title">Báo cáo</div>
            <div class="description">Cung cấp thông tin chi tiết về doanh số và số sản phẩm đã bán bán hàng của các sản
              phẩm theo từng ngành hàng trên các sàn, Cung cấp thông tin chi tiết về doanh số và số sản phẩm đã bán bán
              hàng của các sản phẩm theo từng ngành hàng trên các sàn.
            </div>
          </div>
          <div class="new_report">
            <div class="new_report">
              <div class="title_new_report">
                Báo cáo mới nhất
              </div>
              <item-new-report :reports="lstReportNew" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <discover />
    <featured-report />
    <ContactUs />
  </div>
</template>

<style scoped lang="scss">
.title_report {
  width: 100%;
  height: 100%;

  .image {
    display: flex;
    padding-top: 60px;
    flex-direction: column;
    gap: 40px;
    background: url('/images/Hero_banner.png') no-repeat;
    background-size: cover;
    height: 434px;

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

          margin-bottom: 16px;
        }

        .description {
          font-size: 16px;
          max-width: 500px;
          color: #FFF;
        }
      }
    }
  }
}

.new_report {
  .title_new_report {
    margin-bottom: 16px;
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
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
    .image {
      .title {
        .content {
          .report_title {
            font-size: 48px;
          }

          .description {
            font-size: 16px;
            //width: 600px;
          }
        }
      }
    }
  }
}

@media (max-width: 1919px) {
  .title_report {
    .image {
      .title {
        .content {
          .report_title {
            font-size: 36px;
          }

          .description {
            font-size: 14px;
            width: 400px;
          }
        }
      }
    }
  }
}

@media (max-width: 1439px) {
  .title_report {
    .image {
      .title {
        .content {
          .report_title {
            font-size: 32px;
          }

          .description {
            font-size: 14px;
            //width: 350px;
          }
        }
      }
    }
  }
}

@media (max-width: 1023px) {
  .title_report {
    .image {
      .title {
        .content {
          .report_title {
            font-size: 28px;
          }

          .description {
            font-size: 12px;
            width: 300px;
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .title_report {
    .image {
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

@media (max-width: 424px) {
  .title_report {
    .image {
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
