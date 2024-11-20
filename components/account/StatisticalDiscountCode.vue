<script setup lang="ts">
import {formatCurrency, formatNumber} from "../../helpers/FormatHelper";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: true
  }
});

const columns = [
  {
    title: 'Mã giảm giá',
    dataIndex: 'discountCode',
    key: 'discountCode',
  },
  {
    title: 'Mức giảm',
    dataIndex: 'discountRate',
    key: 'discountRate',
  },
  {
    title: 'Hạn sử dụng',
    dataIndex: 'expiryDate',
    key: 'expiryDate',
  },
  {
    title: 'Số giao dịch',
    dataIndex: 'transactionCount',
    key: 'transactionCount',
  },
  {
    title: 'Tổng giá trị giao dịch',
    dataIndex: 'totalTransactionValue',
    key: 'totalTransactionValue',
  },
  {
    title: 'Tổng số tiền hoa hồng',
    dataIndex: 'totalCommissionAmount',
    key: 'totalCommissionAmount',
  },
];
</script>

<template>
  <div class="statistical_transaction">
    <div class="container_title">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
      </svg>
      <div>
        <div class="title">Thống kê mã giảm giá</div>
      </div>
    </div>
    <a-skeleton v-if="loading" class="default_section" :paragraph="{ rows: 20 }"/>
    <div v-else class="container_content">
      <a-table :columns="columns" :data-source="props.data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'discountRate'">
            <span>{{ text }}</span>
          </template>
          <template v-else-if="column.dataIndex === 'transactionCount'">
            <span>{{ formatNumber(text) }}</span>
          </template>
          <template v-else-if="column.dataIndex === 'totalTransactionValue'">
            <span>{{ formatCurrency(text) }}</span>
          </template>
          <template v-else-if="column.dataIndex === 'totalCommissionAmount'">
            <span>{{ formatCurrency(text) }}</span>
          </template>
          <template v-else>
            <span>{{ text }}</span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.statistical_transaction{
  background: #FFFFFF;
  border-radius: 16px;

  .container_title{
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;

    .title{
      font-size: 24px;
      font-weight: 700;
      line-height: 38px;
    }
  }

  .container_content{
    padding: 0 24px;
  }
}
</style>