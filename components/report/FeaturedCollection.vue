<script setup lang="ts">
import { REPORT_ENDPOINTS } from "~/constant/endpoints";
import allReports from "public/file_json/list_category.json";
const config = useRuntimeConfig();
const lstReport = ref([]);
const isLoading = ref(true);

const fetchReport = async () => {
  try {
    lstReport.value = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.get_top_product_line_by_list_category.endpoint}`, {
      method: 'GET'
    });
    lstReport.value = lstReport.value.map(report => {
      const category = allReports.find(cat => cat.value === report.category_report_id);
      return {
        ...report,
        label: category ? category.parent_name : 'Unknown'
      };
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleClickReport = (slug: string) => {
  window.location.href = `${config.public.BASE_URL}/${slug}`;
};

onMounted(() => {
  fetchReport();
});
</script>

<template>
  <div class="featured_collection default_section">
    <div class="title_container">
      <div class="title">
        <div>Collection nổi bật</div>
        <p>Danh sách bộ sưu tập báo cáo chọn lọc</p>
      </div>
    </div>
    <a-skeleton v-if="isLoading" class="default_section" :paragraph="{ rows: 7 }"/>
    <div v-else class="content_container">
      <div class="card" v-for="report in lstReport" :key="report.category_report_id">
        <div class="header">
        </div>
        <div class="content">
          <div class="content_label">
            <div class="label">
              Ngành hàng {{ report.label }}
            </div>
            <p>8 báo cáo</p>
          </div>
          <div class="list_report_container">
            <div @click="handleClickReport(item.slug)" class="item" v-for="item in report.list_report" :key="item.report_id">
              <div>
                Báo cáo {{ capitalizeFirstLetter(item.name) }}
              </div>
              <div>
                {{ item.description }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.featured_collection {
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .title_container {
    display: flex;
    gap: 8px;

    .title {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1 0 0;

      div {
        color: var(--Dark-blue-dark-blue-8, #241E46);
        font-size: 36px;
        font-weight: 700;
        line-height: 48px;
      }

      p {
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
      }
    }

    .description {
      display: flex;
      padding: 5px 8px 5px 5.5px;
      justify-content: center;
      align-items: flex-end;
      color: #1890FF;
      gap: 5.5px;
      cursor: pointer;
    }
  }

  .content_container {
    display: flex;
    flex-direction: column;
    gap: 40px;

    .card {
      padding: 40px 24px 32px 24px;
      gap: 16px;
      border-radius: 12px;
      border: 1px solid #EEEBFF;
      position: relative;

      .header {
        position: absolute;
        width: 100%;
        height: 6px;
        top: 0;
        left: 0;
        border-radius: 12px;
        background: var(--volcano-volcano-3, #F5B899);
      }

      .content {
        display: flex;
        justify-content: space-between;
        gap: 24px;

        .content_label{
          flex: 1;

          .label{
            font-size: 24px;
            font-weight: 700;
            line-height: 32px;
          }
        }

        .list_report_container {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;

          .item{
            cursor: pointer;
          }

          .item:hover{
            color: #F5B899;
          }
        }
      }
    }
  }
}
</style>