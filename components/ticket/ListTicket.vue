// Update `ListTicket.vue` to handle pagination
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import dayjs from "dayjs";
import { getStatusColor, getStatusText, getSupportDepartmentName } from "~/utils/ticket";
import AppTag from "~/components/ticket/AppTag.vue";

interface TicketItem {
  id: number;
  name: string;
  title: string;
  created_at: string;
  support_department: string;
  report_link: string;
  status: string;
  ticket_code: string;
}

const props = defineProps<{
  data: TicketItem[];
  pagination: {
    pageSize: number;
    current: number;
    total: number;
  };
  loading: boolean;
}>();

const emits = defineEmits(["change"]);

const formatDateTime = (date: any) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

const handlePageChange = (page: number) => {
  emits("change", page);
};

console.log('data', props.data);
</script>

<template>
  <div class="list_ticket">
    <div v-for="item in props.data" :key="item.id" class="ticket_item">
      <div class="title">
        <nuxt-link class="ticket-title" :to="`/ticket/detail/${item.ticket_code}`">
          [#{{ item.id }}] {{ item.title }}
        </nuxt-link>
        <p style="display: flex; align-items: center; gap: 8px; color: #716B95">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.25 3.125H3.75C3.40482 3.125 3.125 3.40482 3.125 3.75V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V3.75C16.875 3.40482 16.5952 3.125 16.25 3.125Z" stroke="#716B95" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.75 1.875V4.375" stroke="#716B95" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.25 1.875V4.375" stroke="#716B95" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.125 6.875H16.875" stroke="#716B95" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ formatDateTime(item.created_at) }}</p>
      </div>
      <div class="support_classification">
        <p style="font-weight: 700">Phân loại hỗ trợ</p>
        <p>{{ getSupportDepartmentName(item.support_department) }}</p>
      </div>
      <div class="link_report">
        <p style="font-weight: 700">Link báo cáo</p>
        <p>{{ item.report_link }}</p>
      </div>
      <div class="status">
        <p style="font-weight: 700">Trạng thái</p>
        <app-tag :type="getStatusColor(item.status)">{{ getStatusText(item.status) }}</app-tag>
      </div>
    </div>
    <a-pagination
        :page-size="props.pagination.pageSize"
        :current="props.pagination.current"
        :total="props.pagination.total"
        @change="handlePageChange"
    />
  </div>
</template>

<style scoped lang="scss">
.list_ticket {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ticket_item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 16px;
    border: 1px solid #EEEBFF;

    .title {
      padding: 12px;
      align-items: flex-start;
      gap: 8px;
    }

    .support_classification {
      border-top: 1px solid #EEEBFF;
      width: 100%;
      padding: 12px;
      align-items: flex-start;
      gap: 8px;
    }

    .link_report {
      border-top: 1px solid #EEEBFF;
      width: 100%;
      padding: 12px;
      align-items: flex-start;
      gap: 8px;
    }

    .status {
      border-top: 1px solid #EEEBFF;
      width: 100%;
      padding: 12px;
      align-items: flex-start;
      gap: 8px;
    }
  }
}

.ticket-title {
  color: #E85912;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  text-decoration: none;
}
</style>