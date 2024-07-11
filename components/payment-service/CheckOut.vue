<script setup lang="ts">
const value = ref<string>('');
</script>

<template>
    <div id="option_payment" class="border statistic-block">
      <div class="statistic-item__title">
        <div class="title">
          <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
          </svg>
          <div class="title_content">Thành tiền đơn hàng</div>
        </div>
      </div>
      <div class="statistic-item__content">
        <div class="discount_code">
          <div class="content">
            Nhập mã giảm giá
          </div>
          <div class="input_discount">
            <a-input v-model:value="value" style="border-radius: 4px" placeholder="Nhập mã giảm giá" />
            <a-button type="primary">Áp dụng</a-button>
          </div>
        </div>
        <div class="calculate">
          <div class="calculate_item">
            <div class="money">Số tiền</div>
            <div class="money">7.900.000đ</div>
          </div>
          <div class="calculate_item">
            <div class="money">Chiết khấu</div>
            <div class="money">-900000đ</div>
          </div>
          <div class="calculate_item">
            <div class="promotional_program">Chương trình khuyến mại</div>
            <div class="promotional_program">-900000đ</div>
          </div>
          <div class="calculate_item">
            <div class="promotional_program">Áp dụng mã giảm giá</div>
            <div class="promotional_program">-900000đ</div>
          </div>
          <div class="calculate_item">
            <div class="total">Thành tiền</div>
            <div class="total_price">5.900.000đ</div>
          </div>
          <a-button type="primary">Thanh toán</a-button>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
#option_payment{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #FFF;

  .statistic-item__title{
    padding: 24px;
    border: 1px solid #EEEBFF;
    border-radius: 16px 16px 0 0;

    .title{
      display: flex;
      gap: 16px;
      align-items: center;

      .title_content{
        font-size: 24px;
        line-height: 38px;
        font-weight: bold;
      }
    }
  }
  .statistic-item__content{
    padding: 24px;
    border: 1px solid #EEEBFF;
    border-radius: 0 0 16px 16px;
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    justify-content: space-between;

    .content{
      font-size: 14px;
      line-height: 22px;
      color: #716B95;

    }

    .discount_code{
      align-items: flex-start;

      .content{
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        color: #241E46;
      }

      .input_discount{
        display: flex;
        gap: 16px;
        padding: 16px 0;
      }
    }

    .calculate{
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 16px;
      border-top: 1px solid #EEEBFF;

      .calculate_item{
        display: flex;
        justify-content: space-between;
        line-height: 22px;
      }

      .money{
        font-weight: bold;
        font-size: 16px;
      }

      .promotional_program{
        font-size: 12px;
        line-height: 22px;

      }

      .total{
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #241E46;
      }

      .total_price{
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #FF4D4F;
      }
    }
  }
}
</style>