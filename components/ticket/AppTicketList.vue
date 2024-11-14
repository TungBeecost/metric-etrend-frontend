<script setup>
import { CalendarOutlined } from "@ant-design/icons-vue";
import AppTag from "~/components/ticket/AppTag.vue";
import { getPriorityColor, getPriorityText } from "~/utils/ticket.js";
import dayjs from "dayjs";

defineProps({
  tickets: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const formatDateTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

const columns = [
  { index: 'id', title: 'ID', dataIndex: 'id', key: 'id' },
  { index: 'title', title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
  { index: 'owner', title: 'Người sở hữu', dataIndex: 'owner', key: 'owner' },
  { index: 'reporter', title: 'Người báo cáo', dataIndex: 'reporter', key: 'reporter' },
  { index: 'person_incharge', title: 'PIC', dataIndex: 'person_incharge', key: 'person_incharge' },
  { index: 'priority', title: 'Ưu tiên', dataIndex: 'priority', key: 'priority' },
  { index: 'status', title: 'Trạng thái', dataIndex: 'status', key: 'status' },
  { index: 'due_date', title: 'Ngày giải quyết', dataIndex: 'due_date', key: 'due_date' },
];

</script>

<template>
  <a-table id="id-ticket-list-table"
           style="margin-bottom: 0.5rem"
           :columns="columns"
           :data-source="tickets"
           :loading="loading"
           class="ticket-list-table"
           :row-class-name="(record) => (`${getPriorityColor(record.priority)}-row`)"
  >
    <template #bodyCell="{ column, record }">
      <nuxt-link v-if="column.key === 'id'" :to="`/ticket/internal/detail/tkid.${record.id}`" class="ticket-id">
        #{{ record.id }}
      </nuxt-link>
      <div v-if="column.key === 'title'">
        <nuxt-link class="title" :to="`/ticket/internal/detail/tkid.${record.id}`">{{ record.title }}</nuxt-link>
        <div class="date-info">
          <div class="created-at">
            <calendar-outlined />&nbsp;Ngày tạo: {{ formatDateTime(record.created_at) }}
          </div>
        </div>
      </div>
      <div v-if="column.key === 'owner'" class="cell-info">
        {{ record.owner }}
      </div>
      <div v-if="column.key === 'reporter'" class="cell-info">
        {{ record.reporter }}
      </div>
      <div v-if="column.key === 'person_incharge'" class="cell-info">
        {{ record.person_incharge }}
      </div>
      <div v-if="column.key === 'due_date'" class="cell-info">
        {{ formatDateTime(record.resolved_at) }}
      </div>
      <div v-if="column.key === 'priority'" class="cell-info">
        <app-tag :type="getPriorityColor(record.priority)">{{ getPriorityText(record.priority) }}</app-tag>
      </div>
      <div v-if="column.key === 'status'" class="cell-info">
        <app-tag :type="getStatusColor(record.status)">{{ getStatusText(record.status) }}</app-tag>
      </div>
    </template>
  </a-table>
</template>

<style scoped lang="scss">
.ticket-list-table {
  .ticket-id {
    color: #E85912;
    cursor: pointer; /* Ensure pointer cursor */
  }

  .title {
    font-weight: bold;
    color: #E85912;
    display: block;
    margin-bottom: 0.25rem;
    cursor: pointer; /* Ensure pointer cursor */
  }

  .cell-info {
    font-size: 0.85rem;
    color: #241E46;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text_center {
    text-align: center;
  }

  .date-info {
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #716B95;
    margin-top: 0.25rem;

    .created-at, .updated-at {
      white-space: nowrap;
    }
  }

  :deep .ant-pagination {
    padding-right: 1rem;
    align-items: center;
  }

  .ticket-type {
    &.metric {
      color: #FA8C16;
      background: #FFF4E8;
      border: 1px solid #FA8C16;
    }
    &.ereport {
      color: #096dd9;
      background: #e6f7ff;
      border: 1px solid #096dd9;
    }
    &.unknown {
      color: #6c757d;
    }
  }
}

:deep(.danger-row) td {
  background-color: #fff3f3;
}

:deep(.success-row) td {
  background-color: #f1fcff;
}

:deep(.ant-table-thead > tr > th) {
  text-align: center;
}
</style>

<style lang="scss">
#id-ticket-list-table{
  .ant-table-container{
    .ant-table-content{
      table{
        .ant-table-tbody{
          .ant-table-row{
            .ant-table-cell{
            align-items: center
            }
          }
        }
      }
    }
  }
}
</style>
