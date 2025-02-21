<script setup lang="ts">
import {NAVIGATIONS, REPORT_TYPE_MAP} from "~/constant/constains";
import { LoadingOutlined } from '@ant-design/icons-vue';
import {getUrlImageThumbnail} from "~/services/ecommerce/EcomUtils";
import {getIndexedDB} from "~/helpers/IndexedDBHelper";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";
import {message} from "ant-design-vue";
import {ref} from "vue";
import moment from "moment/moment";

const config = useRuntimeConfig();
const downloading = ref(false);

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

const formatDate = (value: string | Date, format: string = 'DD/MM/YYYY', inputFormat: string = "YYYY-MM-DD[T]HH:mm:ss"): string => {
  return moment(value, inputFormat).format(format);
}

const handleDownload = async (start_date: any, end_date: any, slug: any, name: any) => {
    const url = `${config.public.API_ENDPOINT}/api/report/get_download_pdf_url?slug=${slug}&type=download&start_date=${start_date}&end_date=${end_date}`;
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
              const fileName = `Báo cáo chi tiết nhóm hàng ${name} ${formatDate(start_date, "DDMMYYYY")}-${formatDate(end_date, "DDMMYYYY")}.pdf`;
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
};


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
          <a-button v-if="record.operation" @click="handleDownload(record.start_date, record.end_date, record.slug, record.name)" class="icon-wrapper" style="display: flex; gap: 4px">
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