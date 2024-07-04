<script setup lang="ts">

import NewReport from "~/components/report/NewReport.vue";
import Discover from "~/components/report/Discover.vue";
import FeaturedReport from "~/components/report/FeaturedReport.vue";
</script>

<template>
  <div class="title_report">
    <div class="image">
      <div class="title">
        <div class="content default_section">
          <div class="report_title">Báo cáo</div>
          <div class="description">Cung cấp thông tin chi tiết về doanh số và số sản phẩm đã bán bán hàng của các sản phẩm theo
            từng ngành hàng trên các sàn, Cung cấp thông tin chi tiết về doanh số và số sản phẩm đã bán bán hàng của các sản phẩm
            theo từng ngành hàng trên các sàn.
          </div>
        </div>
        <div class="new_report default_section">
          <new-report/>
        </div>
      </div>
    </div>
    <discover/>
    <featured-report/>
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
        }

        .description {
          font-size: 16px;
          width: 500px;
          color: #FFF;
        }
      }
    }
  }
}

@media (min-width: 1919px) {
  .default_section {
    flex-direction: row;
    width: 1440px;
    margin: 0 auto;
  }
  .title_report {
    .image {
      .title {
        .content {
          .report_title {
            font-size: 48px;
          }

          .description {
            font-size: 16px;
            width: 600px;
          }
        }
      }
    }
  }
}

@media (max-width: 1919px) {
  .default_section {
    flex-direction: row;
    width: 1440px;
    margin: 0 auto;
  }
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
  .default_section {
    flex-direction: row;
    width: 1200px;
    margin: 0 auto;
  }
  .title_report {
    .image {
      .title {
        .content {
          .report_title {
            font-size: 32px;
          }

          .description {
            font-size: 14px;
            width: 350px;
          }
        }
      }
    }
  }
}

@media (max-width: 1023px) {
  .default_section {
    flex-direction: column;
    width: 800px;
    margin: 0 auto;
  }
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
  .default_section {
    flex-direction: column;
    width: 700px;
    margin: 0 auto;
  }
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
  .default_section {
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  }
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
