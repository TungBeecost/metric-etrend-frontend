<script setup>
import { PlusOutlined, CalendarOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { getMyTickets, getStatusColor, getStatusText, getSupportDepartmentName } from "~/utils/ticket.js";
import AppSection from "~/components/ticket/AppSection.vue";
import AppTitle from "~/components/ticket/AppTitle.vue";
import AppTag from "~/components/ticket/AppTag.vue";
import { watchDebounced } from '@vueuse/core';
// import { useState, useAsyncData, navigateTo } from '#imports';
import dayjs from "dayjs";
const currentPage = useState('myTicket.currentPage', () => 1);
const totalRow = useState('myTicket.totalRow', () => 0);
const filter = useState('myTicket.filter', () => undefined);
const sorter = useState('myTicket.sorter', () => undefined);


const {
  pending: listMyTicketsLoading,
  data: myTickets,
  refresh: refreshMyTickets
} = await useAsyncData("myTickets", async () => {
  const [myTickets, total] = await getMyTickets(currentPage.value - 1, 10, filter.value, sorter.value);
  totalRow.value = total;
  return myTickets;
});

const columns = [
  {
    index: 'title',
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
    width: '50%'
  },
  {
    index: 'support_department',
    title: 'Phân loại hỗ trợ',
    dataIndex: 'support_department',
    key: 'support_department'
  },
  {
    index: 'status',
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  }
];

const handleMyTicketTableChange = async (pagination) => {
  const { current } = pagination;
  currentPage.value = current;
  await refreshMyTickets();
};

const textInputSearch = useState('myTicket.textInputSearch', () => '');
const supportDepartmentFilterValue = useState('myTicket.supportDepartmentFilterValue', () => 'all');

watchDebounced([textInputSearch, supportDepartmentFilterValue], async () => {
  filter.value = {
    field: 'support_department',
    value: supportDepartmentFilterValue.value === 'all' ? undefined : supportDepartmentFilterValue.value,
    search: textInputSearch.value
  };
  await refreshMyTickets();
}, { debounce: 500 });

const formatDateTime = (date) => {
  if (!date) return ''
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}
</script>

<template>
  <div class="main-content">
    <app-section class="ticket-list-section default_section">
      <a-flex align="center" justify="space-between" class="filter-section">
        <app-title :text="'Ticket của tôi'"/>
        <a-flex align="center">
          <div class="list-filter-desktop">
            <a-input v-model:value="textInputSearch" placeholder="Tìm kiếm theo tiêu đề hoặc id" style="width: 20rem">
              <template #prefix>
                <search-outlined/>
              </template>
            </a-input>
            <a-select v-model:value="supportDepartmentFilterValue" placeholder="Lọc theo phân loại hỗ trợ"
                      style="width: 12rem">
              <a-select-option value="all">Tất cả</a-select-option>
              <a-select-option value="service_support">Hỗ trợ dịch vụ</a-select-option>
              <a-select-option value="technical_support">Hỗ trợ kỹ thuật</a-select-option>
            </a-select>
          </div>
          <a-button type="primary" @click="navigateTo('/ticket/submit')" size="large" style="margin-left: 1rem">
            <template #icon>
              <plus-outlined/>
            </template>
            Tạo mới
          </a-button>
        </a-flex>
      </a-flex>
      <a-table :columns="columns"
               :loading="listMyTicketsLoading"
               :data-source="myTickets.data" :pagination="{
                  current: currentPage,
                  total: totalRow,
                  pageSize: 10
               }" @change="handleMyTicketTableChange">
        <template #bodyCell="{column,record}">
          <div v-if="column.key === 'title'">
            <nuxt-link class="ticket-title" :to="`/ticket/detail/${record.ticket_code}`">
              [#{{ record.id }}] {{ record.title }}
            </nuxt-link>
            <div class="ticket-created-at">
              <calendar-outlined/>&nbsp;{{ formatDateTime(record.created_at) }}
            </div>
          </div>
          <div v-if="column.key === 'support_department'">
            {{ getSupportDepartmentName(record.support_department) }}
          </div>
          <div v-if="column.key === 'status'">
            <app-tag :type="getStatusColor(record.status)">{{ getStatusText(record.status) }}</app-tag>
          </div>
        </template>
        <template #emptyText>
          <svg style="margin-top: 2.5rem" width="174" height="115" viewBox="0 0 174 115" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_134_20037)">
              <path
                  d="M132.922 37.4855C132.922 37.4855 117.496 51.0255 135.258 80.0192C151.032 105.768 115.577 116.93 100.298 113.941C80.5063 110.07 69.1426 85.0535 54.007 92.9801C38.8713 100.907 23.8769 64.9881 45.8932 51.7709C73.2805 35.3295 55.7037 25.7752 58.1634 13.7198C59.9289 5.06784 85.0514 -8.30902 98.5974 6.94991C109.996 19.7901 115.586 15.1964 120.796 13.4823C128.311 11.01 144.712 23.8697 132.922 37.4855Z"
                  fill="#F5F5F5"/>
              <g opacity="0.5">
                <path
                    d="M89.2464 52.7436L84.1925 73.4736C84.0049 74.2423 83.9706 75.0405 84.0915 75.8225C84.2125 76.6045 84.4863 77.3551 84.8974 78.0312C85.3085 78.7074 85.8488 79.2959 86.4874 79.7632C87.126 80.2304 87.8505 80.5673 88.6193 80.7545L113.754 86.8822C113.747 86.9039 113.773 86.8693 113.754 86.8822L122.246 88.9524C123.015 89.14 123.813 89.1744 124.595 89.0534C125.377 88.9325 126.128 88.6586 126.804 88.2475C127.48 87.8364 128.068 87.2962 128.536 86.6575C129.003 86.0189 129.34 85.2945 129.527 84.5256L134.581 63.7957C134.768 63.0269 134.803 62.2288 134.682 61.4468C134.561 60.6647 134.287 59.9142 133.876 59.2381C133.465 58.5619 132.925 57.9734 132.286 57.5061C131.647 57.0388 130.923 56.7019 130.154 56.5147L96.5273 48.3168C95.7586 48.1292 94.9604 48.0948 94.1784 48.2158C93.3963 48.3367 92.6458 48.6106 91.9697 49.0217C91.2935 49.4328 90.705 49.9731 90.2377 50.6117C89.7704 51.2503 89.4336 51.9747 89.2464 52.7436Z"
                    fill="#CACDD3"/>
                <path
                    d="M130.94 62.9702L116.885 59.5438C116.792 59.5212 116.699 59.578 116.676 59.6705L115.955 62.6281C115.933 62.7207 115.989 62.814 116.082 62.8365L130.137 66.263C130.229 66.2856 130.323 66.2288 130.345 66.1363L131.066 63.1787C131.089 63.0861 131.032 62.9928 130.94 62.9702Z"
                    fill="white"/>
                <path
                    d="M128.933 71.2023L90.852 61.9185C90.7595 61.896 90.6662 61.9527 90.6436 62.0453L89.9226 65.0029C89.9 65.0954 89.9567 65.1887 90.0493 65.2113L128.13 74.4951C128.223 74.5177 128.316 74.4609 128.338 74.3684L129.06 71.4108C129.082 71.3182 129.025 71.2249 128.933 71.2023Z"
                    fill="#F5F5F5"/>
                <path
                    d="M126.926 79.4343L88.8451 70.1505C88.7526 70.1279 88.6593 70.1847 88.6367 70.2772L87.9157 73.2348C87.8931 73.3273 87.9498 73.4207 88.0424 73.4432L126.123 82.727C126.216 82.7496 126.309 82.6929 126.332 82.6003L127.053 79.6427C127.075 79.5502 127.018 79.4568 126.926 79.4343Z"
                    fill="#F5F5F5"/>
              </g>
              <path
                  d="M103.398 27.8763L111.662 54.4154C111.969 55.3995 112.079 56.4345 111.985 57.4611C111.892 58.4877 111.597 59.4858 111.118 60.3985C110.639 61.3112 109.984 62.1205 109.192 62.7802C108.4 63.4399 107.486 63.937 106.502 64.2432L74.3236 74.2632C74.3126 74.2354 74.3152 74.292 74.3236 74.2632C74.2993 74.2807 74.3321 74.2345 74.3236 74.2632L63.4521 77.6484C62.468 77.9551 61.4331 78.0649 60.4065 77.9715C59.38 77.8781 58.3819 77.5834 57.4692 77.1042C56.5566 76.625 55.7474 75.9707 55.0877 75.1787C54.428 74.3866 53.9308 73.4724 53.6246 72.4881L45.3603 45.949C45.0535 44.9649 44.9437 43.9299 45.037 42.9033C45.1303 41.8767 45.425 40.8786 45.9043 39.9659C46.3835 39.0532 47.0379 38.2439 47.83 37.5842C48.6221 36.9245 49.5364 36.4273 50.5207 36.1211L93.5699 22.7159C94.554 22.4091 95.589 22.2992 96.6156 22.3926C97.6422 22.4859 98.6403 22.7806 99.553 23.2599C100.466 23.7391 101.275 24.3934 101.935 25.1855C102.594 25.9776 103.092 26.892 103.398 27.8763Z"
                  fill="#BDC2CB"/>
              <path
                  d="M72.9948 37.3813L49.9419 44.5506C49.8509 44.5789 49.8001 44.6756 49.8284 44.7665L51.0372 48.6535C51.0655 48.7445 51.1622 48.7953 51.2532 48.767L74.3061 41.5977C74.3971 41.5694 74.4479 41.4727 74.4196 41.3817L73.2108 37.4948C73.1825 37.4038 73.0858 37.353 72.9948 37.3813Z"
                  fill="white"/>
              <path
                  d="M102.087 39.8448L53.2356 55.0574C53.1446 55.0857 53.0938 55.1824 53.1222 55.2733L54.3323 59.1594C54.3606 59.2504 54.4573 59.3011 54.5483 59.2728L103.399 44.0603C103.49 44.0319 103.541 43.9352 103.513 43.8443L102.303 39.9582C102.274 39.8673 102.177 39.8165 102.087 39.8448Z"
                  fill="#F5F5F5"/>
              <path
                  d="M105.364 50.4377L56.5013 65.6336C56.4104 65.6619 56.3595 65.7586 56.3878 65.8496L57.5967 69.7365C57.625 69.8275 57.7217 69.8783 57.8126 69.85L106.675 54.6541C106.766 54.6258 106.817 54.5291 106.789 54.4381L105.58 50.5512C105.551 50.4602 105.455 50.4094 105.364 50.4377Z"
                  fill="#F5F5F5"/>
            </g>
            <defs>
              <clipPath id="clip0_134_20037">
                <rect width="172.5" height="114.414" fill="white" transform="translate(0.75)"/>
              </clipPath>
            </defs>
          </svg>
          <div class="empty-text">Chưa có dữ liệu</div>
          <div class="empty-subtext">Dữ liệu hiện tại đang trống</div>
        </template>
      </a-table>
    </app-section>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  .filter-section {
    padding: 1.5rem;
  }

  .ticket-list-section {
    margin-top: 1rem;

    .list-filter-desktop {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .ticket-title {
      color: #E85912;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }

    }
    .ticket-created-at {
      color: #716B95;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      font-weight: 400;
      line-height: 1.25rem;
    }
  }
}

.empty-text {
  color: #241E46;
  text-align: center;
  font-family: Inter, Montserrat, sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
  margin-top: 1.5rem;
}

.empty-subtext {
  color: #716B95;
  text-align: center;
  font-family: Inter, Montserrat, sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  margin-top: 0.75rem;
  margin-bottom: 2.5rem;
}
</style>
