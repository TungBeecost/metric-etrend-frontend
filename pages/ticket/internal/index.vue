<script setup>
import { FilterOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { getTickets } from "~/utils/ticket.js";
import AppTicketList from "~/components/ticket/AppTicketList.vue";
import AppDrawer from "~/components/ticket/AppDrawer.vue";
import AppTitle from "~/components/ticket/AppTitle.vue";
import AppSection from "~/components/ticket/AppSection.vue";
import {priorityOptions, statusOptions, supportDepartmentOptions} from "~/constant/general/common_ticket.js";

definePageMeta({
  title: "View Tickets",
});

const currentPage = useState('currentPage', () => 1);
const totalRow = useState('totalRow', () => 0);
const sorter = useState('internal.ticket.sorter', () => undefined);
const filter = useState('internal.ticket.filter', () => {
  return {
    search: '',
    createdAt: {
      start: '',
      end: ''
    },
    resolvedAt: {
      start: '',
      end: ''
    },
    priority: '',
    status: '',
    personIncharge: '',
    owner: '',
    supportDepartment: '',
    reporter: '',
    cc_user: '',
  };
});
const priorityOpts = useState('myTicket.priorityOptions', () => [...priorityOptions]);
const supportDepartmentOpts = useState('myTicket.supportDepartmentOptions', () => [...supportDepartmentOptions]);
const statusOpts = useState('myTicket.statusOptions', () => [...statusOptions]);
const isOpenFilterDrawer = useState('isOpenFilterDrawer', () => false);

const filteredReporter = ref([]);

const { pending: staffOptionsLoading, data: staffOptions } = useAsyncData('userOptions', async () => {
  const listUserStaffOptions = await getListUserStaffOptions();
  return listUserStaffOptions.map((user) => ({
    label: user.email,
    value: user.email
  }));
});

const filterEmailOptions = (input, option) => {
  return option.label.toLowerCase().startsWith(input.toLowerCase());
};

const handleOpenFilterDrawer = () => {
  isOpenFilterDrawer.value = true;
};

const handleCloseFilterDrawer = () => {
  isOpenFilterDrawer.value = false;
};

const handleSubmitAction = async () => {
  currentPage.value = 1;
  await refreshTickets();
  isOpenFilterDrawer.value = false;
};

const onResetFilter = async () => {
  filter.value = {
    search: '',
    createdAt: {
      start: '',
      end: ''
    },
    resolvedAt: {
      start: '',
      end: ''
    },
    priority: '',
    status: '',
    personIncharge: '',
    owner: '',
    supportDepartment: '',
    reporter: '',
    cc_user: '',
  };
  filteredReporter.value = [];
  await refreshTickets();
};

const onReporterChange = (value) => {
  filter.value.reporter = filteredReporter.value.length > 0 ? filteredReporter.value[filteredReporter.value.length - 1] : '';
};

const {
  pending: ticketsLoading,
  data: tickets = [],
  refresh: refreshTickets,
} = await useAsyncData("tickets", async () => {
  const startCreatedAt = filter.value.createdAt.start ? filter.value.createdAt.start.format('YYYY-MM-DD') : '';
  const endCreatedAt = filter.value.createdAt.end ? filter.value.createdAt.end.format('YYYY-MM-DD') : '';
  const startResolvedAt = filter.value.resolvedAt.start ? filter.value.resolvedAt.start.format('YYYY-MM-DD') : '';
  const endResolvedAt = filter.value.resolvedAt.end ? filter.value.resolvedAt.end.format('YYYY-MM-DD') : '';

  const filterPayload = {
    "created_at": {
      "start": startCreatedAt,
      "end": endCreatedAt
    },
    "resolved_at": {
      "start": startResolvedAt,
      "end": endResolvedAt
    },
    "priority": filter.value.priority,
    "status": filter.value.status,
    "incharge_by": filter.value.personIncharge,
    "owned_by": filter.value.owner,
    "report_by": filter.value.reporter,
    "cc_user": filter.value.cc_user,
    "support_department": filter.value.supportDepartment,
  };
  const [tickets, total] = await getTickets(currentPage.value - 1, 10, filter.value.search, filterPayload, sorter.value);
  totalRow.value = total;
  return tickets;
});

const handleTicketTableChange = async (pagination, filters, sorter, { currentDataSource }) => {
  const { current } = pagination;
  currentPage.value = current;
  await refreshTickets();
};
</script>

<template>
  <div class="main-content default_section">
    <app-section>
      <a-flex justify="space-between" class="header">
        <app-title text="Yêu cầu hỗ trợ"/>
        <a-button type="default" @click="handleOpenFilterDrawer" size="large">
          <template #icon>
            <filter-outlined/>
          </template>
          Filter
        </a-button>
      </a-flex>
      <div class="content">
        <app-ticket-list :tickets="tickets.data"
                         :loading="ticketsLoading"
                         :pagination="{
                           pageSize: 10,
                           current: currentPage,
                           total: totalRow
                         }"
                         @change="handleTicketTableChange"
        />
      </div>
    </app-section>
    <app-drawer :open="isOpenFilterDrawer" @close="handleCloseFilterDrawer">
      <a-form :model="filter" name="form-edit" layout="vertical" @finish="handleSubmitAction">
        <a-form-item label="Tìm kiếm theo tiêu đề" name="search">
          <a-input v-model:value="filter.search" placeholder="Tìm kiếm theo tiêu đề">
            <template #prefix>
              <search-outlined/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="Ngày tạo" name="createdAt">
          <a-flex justify="space-between" gap="small" align="center">
            <a-date-picker v-model:value="filter.createdAt.start"
                           style="width: 100%"
                           format="DD/MM/YYYY"
                           placeholder="Chọn ngày tạo"/>
            đến
            <a-date-picker v-model:value="filter.createdAt.end"
                           style="width: 100%"
                           format="DD/MM/YYYY"
                           placeholder="Chọn ngày tạo"/>
          </a-flex>
        </a-form-item>
        <a-form-item label="Ngày giải quyết" name="resolvedAt">
          <a-flex justify="space-between" gap="small" align="center">
            <a-date-picker v-model:value="filter.resolvedAt.start"
                           style="width: 100%"
                           format="DD/MM/YYYY"
                           placeholder="Chọn ngày hết hạn"/>
            đến
            <a-date-picker v-model:value="filter.resolvedAt.end"
                           style="width: 100%"
                           format="DD/MM/YYYY"
                           placeholder="Chọn ngày hết hạn"/>
          </a-flex>
        </a-form-item>
        <a-flex justify="space-between" gap="small">
          <a-form-item label="Ưu tiên" name="priority">
            <a-select v-model:value="filter.priority"
                      :options="priorityOpts"
                      :allow-clear="true"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="Trạng thái" name="status">
            <a-select v-model:value="filter.status"
                      :options="statusOpts"
                      :allow-clear="true"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="Phòng ban hỗ trợ" name="supportDepartment">
            <a-select v-model:value="filter.supportDepartment"
                      :options="supportDepartmentOpts"
                      :allow-clear="true"
            >
            </a-select>
          </a-form-item>
        </a-flex>
        <a-form-item label="Người sở hữu" name="owner">
          <a-select v-model:value="filter.owner"
                    :options="staffOptions"
                    :show-search="true"
                    :show-arrow="false"
                    :filter-option="filterEmailOptions"
                    :loading="staffOptionsLoading"
                    :allow-clear="true"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="PIC" name="personIncharge">
          <a-select v-model:value="filter.personIncharge"
                    :options="staffOptions"
                    :show-arrow="false"
                    :show-search="true"
                    :filter-option="filterEmailOptions"
                    :loading="staffOptionsLoading"
                    :allow-clear="true"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="Người báo cáo" name="reporter">
          <a-select v-model:value="filteredReporter"
                    :options="staffOptions"
                    :show-search="true"
                    :show-arrow="false"
                    :filter-option="filterEmailOptions"
                    :loading="staffOptionsLoading"
                    :allow-clear="true"
                    mode="tags"
                    @change="onReporterChange"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="CC Emails" name="cc_user">
          <a-select v-model:value="filter.cc_user"
                    :options="staffOptions"
                    :show-search="true"
                    :show-arrow="false"
                    :filter-option="filterEmailOptions"
                    :loading="staffOptionsLoading"
                    :allow-clear="true"
                    :remove-icon="true"
          >
          </a-select>
        </a-form-item>

        <a-flex gap="small">
          <a-spin :spinning="ticketsLoading">
            <a-form-item>
              <a-button type="primary" html-type="submit">Lọc</a-button>
            </a-form-item>
          </a-spin>
          <a-form-item>
            <a-button @click="onResetFilter">Reset</a-button>
          </a-form-item>
        </a-flex>
      </a-form>
    </app-drawer>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  .header {
    padding: 1rem 1.5rem;

    .list-filter-desktop {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
}

.ant-form-item {
  width: 100%;
}

a-spin {
  width: fit-content;
}

.ant-pagination-options {
  display: none;
}
</style>
