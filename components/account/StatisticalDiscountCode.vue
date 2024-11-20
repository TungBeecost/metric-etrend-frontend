<script setup lang="ts">
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

const data = [
  {
    key: '1',
    discountCode: 'DISCOUNT10',
    discountRate: '10%',
    expiryDate: '2023-12-31',
    transactionCount: 5,
    totalTransactionValue: '5000',
    totalCommissionAmount: '500',
  },
  {
    key: '2',
    discountCode: 'DISCOUNT20',
    discountRate: '20%',
    expiryDate: '2023-11-30',
    transactionCount: 10,
    totalTransactionValue: '10000',
    totalCommissionAmount: '1000',
  },
  {
    key: '3',
    discountCode: 'DISCOUNT30',
    discountRate: '30%',
    expiryDate: '2023-10-31',
    transactionCount: 15,
    totalTransactionValue: '15000',
    totalCommissionAmount: '1500',
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
    <div class="container_content">
      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
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