<script setup lang="ts">
const columns = [
  {
    title: 'Mã giao dịch',
    dataIndex: 'transactionId',
    key: 'transactionId',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mã giảm giá',
    dataIndex: 'discountCode',
    key: 'discountCode',
  },
  {
    title: 'Giá trị giao dịch',
    dataIndex: 'transactionValue',
    key: 'transactionValue',
  },
  {
    title: 'Số tiền hoa hồng',
    dataIndex: 'commissionAmount',
    key: 'commissionAmount',
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
];

const data = [
  {
    key: '1',
    transactionId: 'TX123456',
    email: 'john@example.com',
    discountCode: 'DISCOUNT10',
    transactionValue: '1000',
    commissionAmount: '100',
    time: '2023-10-01 10:00:00',
  },
  {
    key: '2',
    transactionId: 'TX123457',
    email: 'jane@example.com',
    discountCode: 'DISCOUNT20',
    transactionValue: '2000',
    commissionAmount: '200',
    time: '2023-10-01 11:00:00',
  },
  {
    key: '3',
    transactionId: 'TX123458',
    email: 'doe@example.com',
    discountCode: 'DISCOUNT30',
    transactionValue: '3000',
    commissionAmount: '300',
    time: '2023-10-01 12:00:00',
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
        <div class="title">Thống kê giao dịch</div>
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