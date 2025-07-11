<script setup lang="ts">
import {NAVIGATIONS, REPORT_TYPE_MAP} from "~/constant/constains";
import {formatDate} from "compatx";
import {upperFirst} from "scule";
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
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Thời điểm xem báo cáo',
    dataIndex: 'time_used',
    key: 'time_used',
  },
  {
    title: 'Gói áp dụng',
    dataIndex: 'package',
    key: 'package',
    ellipsis: true,
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

function getStatusClass(claimedAt: string, expiredAt: string): string {
  return new Date() >= new Date(claimedAt) && new Date() <= new Date(expiredAt) ? 'status_active' : 'status_inactive';
}

function handleRowClick(record: any) {
  console.log('record', record);
  const url = `${NAVIGATIONS.home}${record.source === 'marketing' ? 'insight/' + record.slug : record.slug}`;
  router.push(url);
}
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
        <template v-else-if="column.dataIndex === 'status'">
          <div style="display: flex; height: 100%; align-items: center; align-content: center; gap: 16px">
            <span :class="getStatusClass(record.claimed_at, record.expired_at)">{{ new Date() >= new Date(record.claimed_at) && new Date() <= new Date(record.expired_at) ? 'Còn khả dụng' : 'Đã hết hạn' }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'time_used'">
          <div style="display: flex; height: 100%; align-items: center; gap: 16px">
            <span>{{ formatExpiredAt(record.created_at) }}</span>
            <span>{{ text }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'package'">
          <div style="display: flex; height: 100%; align-items: center; align-content: center; gap: 16px">
            <div :class="getPackageClass(record.package)">{{ record.package }}</div>
          </div>
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

.package_ereport{
  display: flex;
  height: 24px;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #FDEEE7;
  color: #E85912;
  font-size: 12px;
  font-weight: 400;
}

.package_metric{
  display: flex;
  height: 24px;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #FFF7E8;
  color: #FAAD14;
  font-size: 12px;
  font-weight: 400;
}

.status_active{
  display: flex;
  height: 24px;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #EAF8EE;
  color: #35A855;
  font-size: 12px;
  font-weight: 400;
}

.status_inactive{
  display: flex;
  height: 24px;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #F5F5F5;
  color: #667085;
  font-size: 12px;
  font-weight: 400;
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
