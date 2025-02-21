<script setup lang="ts">
import {NAVIGATIONS, REPORT_TYPE_MAP} from "~/constant/constains";
import { LoadingOutlined } from '@ant-design/icons-vue';
import {getUrlImageThumbnail} from "~/services/ecommerce/EcomUtils";

const props = defineProps({
  data: {
    type: Array as () => any[],
    default: () => [],
  },
});

const router = useRouter();

const columns = [
  {
    title: 'Tên báo cáo',
    dataIndex: 'name',
    key: 'name',
    width: 600,
  },
  {
    title: 'Số liệu thống kê',
    dataIndex: 'statistics',
    key: 'statistics',
  },
  {
    title: 'Thao tác',
    dataIndex: 'operation',
    key: 'operation',
  },
];

function formatExpiredAt(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

function getPackageClass(packageName: string): string {
  return packageName === 'eReport' ? 'package_ereport' : 'package_metric';
}

function handleRowClick(record: any) {
  console.log('record', record);
  const url = `${NAVIGATIONS.home}${record.source === 'marketing' ? 'insight/' + record.slug : record.slug}`;
  router.push(url);
}

function formatDateString(dateString: string): string {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${day}/${month}/${year}`;
}

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '16px',
    color: '#332D59',
    opacity: '0.38',
  },
  spin: true,
});
</script>

<template>
  <div id="lst_report_id">
    <a-table :columns="columns" :data-source="props.data" :scroll="{ x: 1000 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div style="display: flex; align-items: center; gap: 16px; cursor: pointer" @click="handleRowClick(record)">
            <img
                :src="record.url_thumbnail ? getUrlImageThumbnail(record.url_thumbnail) : '/images/default_thumbnail_report.png'"
                alt="thumbnail"
                style="width: 60px; height: 60px; border-radius: 8px"
            />
            <div class="info">
              <div class="category">{{ REPORT_TYPE_MAP[record.report_type] || REPORT_TYPE_MAP.default }}</div>
              <div class="title">Báo cáo {{ text }}</div>
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'statistics'">
          <div>

            <div>{{ formatDateString(record.start_date) }} - {{ formatDateString(record.end_date) }}</div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-button v-if="record.operation" class="icon-wrapper" style="display: flex; gap: 4px">
            <img src="/icons/Download.svg" alt="download" />
            <span>Tải báo cáo</span>
          </a-button>
          <a-button v-else disabled class="icon-wrapper" style="display: flex; gap: 4px; align-items: center">
            <a-spin style="display: flex; align-items: center" :indicator="indicator" />
            <span>Đang xử lý</span>
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: column;
}

.title {
  color: #241E46;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.category {
  color: #716B95;
  font-weight: 400;
  line-height: 22px;
}

.icon-wrapper img {
  transition: filter 0.3s;
}

.icon-wrapper:hover img {
  filter: invert(39%) sepia(100%) saturate(1000%) hue-rotate(359deg) brightness(97%) contrast(104%);
}

</style>

<style>
#lst_report_id {
  .ant-table-wrapper {
    .ant-spin-container {
      .ant-table {
        .ant-table-container {
          .ant-table-content {
            table {
              .ant-table-thead {
                .ant-table-cell {
                  background: #EEEBFF;
                  border-bottom: 1px solid #EEEBFF;

                }
              }
              .ant-table-cell {
                vertical-align: middle;
              }
            }
          }
        }
      }
      .ant-pagination{
        display: none;
      }
    }
  }
}
</style>