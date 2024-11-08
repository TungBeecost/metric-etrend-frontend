<script setup>
import { formatNumberHuman } from "~/helpers/FormatHelper";
import BlurContent from "~/components/BlurContent.vue";
import {formatSortTextCurrency} from "~/helpers/utils.js";

const {data, isHideContent} = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  isHideContent: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

const $t = (text) => {
  return text;
};
</script>

<template>
  <div class="SummaryStatistic">
    <div class="summary-statistic">
      <div class="summary-statistic-item">
        <div class="summary-statistic-item__icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2"
                  d="M20 16C20 16.7911 19.7654 17.5645 19.3259 18.2223C18.8864 18.8801 18.2616 19.3928 17.5307 19.6955C16.7998 19.9983 15.9956 20.0775 15.2196 19.9231C14.4437 19.7688 13.731 19.3878 13.1716 18.8284C12.6122 18.269 12.2312 17.5563 12.0769 16.7804C11.9225 16.0044 12.0017 15.2002 12.3045 14.4693C12.6072 13.7384 13.1199 13.1136 13.7777 12.6741C14.4355 12.2346 15.2089 12 16 12C17.0609 12 18.0783 12.4214 18.8284 13.1716C19.5786 13.9217 20 14.9391 20 16ZM25 8C25.2117 9.24915 25.8067 10.4015 26.7026 11.2974C27.5985 12.1933 28.7509 12.7883 30 13V8H25ZM25 24H30V19C28.7509 19.2117 27.5985 19.8067 26.7026 20.7026C25.8067 21.5985 25.2117 22.7509 25 24ZM2 19V24H7C6.78828 22.7509 6.19326 21.5985 5.29738 20.7026C4.4015 19.8067 3.24915 19.2117 2 19ZM2 13C3.24915 12.7883 4.4015 12.1933 5.29738 11.2974C6.19326 10.4015 6.78828 9.24915 7 8H2V13Z"
                  fill="white"/>
            <path
              d="M16 11C15.0111 11 14.0444 11.2932 13.2221 11.8427C12.3999 12.3921 11.759 13.173 11.3806 14.0866C11.0022 15.0002 10.9031 16.0055 11.0961 16.9755C11.289 17.9454 11.7652 18.8363 12.4645 19.5355C13.1637 20.2348 14.0546 20.711 15.0245 20.9039C15.9945 21.0969 16.9998 20.9978 17.9134 20.6194C18.827 20.241 19.6079 19.6001 20.1573 18.7779C20.7068 17.9556 21 16.9889 21 16C21 14.6739 20.4732 13.4021 19.5355 12.4645C18.5979 11.5268 17.3261 11 16 11ZM16 19C15.4067 19 14.8266 18.8241 14.3333 18.4944C13.8399 18.1648 13.4554 17.6962 13.2284 17.1481C13.0013 16.5999 12.9419 15.9967 13.0576 15.4147C13.1734 14.8328 13.4591 14.2982 13.8787 13.8787C14.2982 13.4591 14.8328 13.1734 15.4147 13.0576C15.9967 12.9419 16.5999 13.0013 17.1481 13.2284C17.6962 13.4554 18.1648 13.8399 18.4944 14.3333C18.8241 14.8266 19 15.4067 19 16C19 16.7956 18.6839 17.5587 18.1213 18.1213C17.5587 18.6839 16.7956 19 16 19ZM30 7H2C1.73478 7 1.48043 7.10536 1.29289 7.29289C1.10536 7.48043 1 7.73478 1 8V24C1 24.2652 1.10536 24.5196 1.29289 24.7071C1.48043 24.8946 1.73478 25 2 25H30C30.2652 25 30.5196 24.8946 30.7071 24.7071C30.8946 24.5196 31 24.2652 31 24V8C31 7.73478 30.8946 7.48043 30.7071 7.29289C30.5196 7.10536 30.2652 7 30 7ZM3 9H5.67125C5.15549 10.1995 4.19945 11.1555 3 11.6713V9ZM3 23V20.3288C4.19945 20.8445 5.15549 21.8005 5.67125 23H3ZM29 23H26.3288C26.8445 21.8005 27.8005 20.8445 29 20.3288V23ZM29 18.2062C27.8645 18.542 26.8311 19.1565 25.9938 19.9938C25.1565 20.8311 24.542 21.8645 24.2062 23H7.79375C7.45801 21.8645 6.84351 20.8311 6.00623 19.9938C5.16895 19.1565 4.1355 18.542 3 18.2062V13.7937C4.1355 13.458 5.16895 12.8435 6.00623 12.0062C6.84351 11.1689 7.45801 10.1355 7.79375 9H24.2062C24.542 10.1355 25.1565 11.1689 25.9938 12.0062C26.8311 12.8435 27.8645 13.458 29 13.7937V18.2062ZM29 11.6713C27.8005 11.1555 26.8445 10.1995 26.3288 9H29V11.6713Z"
              fill="white"/>
          </svg>
        </div>
        <div>
          <div class="summary-statistic-item__title">{{ $t('Doanh số') }} (VNĐ)</div>
          <div class="summary-statistic-item__value" style="margin-bottom: 16px;">
            <BlurContent :is-hide-content="isHideContent">
              {{ formatSortTextCurrency(data.data_analytic.by_overview.revenue) }}
            </BlurContent>
          </div>
        </div>
      </div>
      <div class="summary-statistic-item summary-statistic-item1">
        <div class="summary-statistic-item__icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2"
                  d="M16 16.1362V29C15.832 28.9993 15.667 28.9563 15.52 28.875L4.52 22.8525C4.36293 22.7665 4.23181 22.64 4.14035 22.4861C4.04888 22.3322 4.00041 22.1565 4 21.9775V10.0225C4.0004 9.88241 4.03021 9.74401 4.0875 9.61621L16 16.1362Z"
                  fill="#13C2C2"/>
            <path
              d="M27.96 8.26877L16.96 2.25002C16.6661 2.08763 16.3358 2.00244 16 2.00244C15.6642 2.00244 15.3339 2.08763 15.04 2.25002L4.04 8.27127C3.72586 8.44315 3.46363 8.69622 3.28069 9.00405C3.09775 9.31188 3.00081 9.66319 3 10.0213V21.9763C3.00081 22.3344 3.09775 22.6857 3.28069 22.9935C3.46363 23.3013 3.72586 23.5544 4.04 23.7263L15.04 29.7475C15.3339 29.9099 15.6642 29.9951 16 29.9951C16.3358 29.9951 16.6661 29.9099 16.96 29.7475L27.96 23.7263C28.2741 23.5544 28.5364 23.3013 28.7193 22.9935C28.9023 22.6857 28.9992 22.3344 29 21.9763V10.0225C28.9999 9.6638 28.9032 9.31172 28.7203 9.00317C28.5373 8.69462 28.2747 8.44096 27.96 8.26877ZM16 4.00002L26.0425 9.50002L22.3213 11.5375L12.2775 6.03752L16 4.00002ZM16 15L5.9575 9.50002L10.195 7.18002L20.2375 12.68L16 15ZM5 11.25L15 16.7225V27.4463L5 21.9775V11.25ZM27 21.9725L17 27.4463V16.7275L21 14.5388V19C21 19.2652 21.1054 19.5196 21.2929 19.7071C21.4804 19.8947 21.7348 20 22 20C22.2652 20 22.5196 19.8947 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19V13.4438L27 11.25V21.9713V21.9725Z"
              fill="#13C2C2"/>
          </svg>
        </div>
        <div>
          <div class="summary-statistic-item__title">{{ $t('Sản phẩm đã bán') }}</div>
          <div class="summary-statistic-item__value" style="margin-bottom: 16px;">
            <BlurContent :is-hide-content="isHideContent">
              {{ formatSortTextCurrency(data.data_analytic.by_overview.sale) }}
            </BlurContent>
          </div>
        </div>
      </div>
      <div class="summary-statistic-item">
        <div class="summary-statistic-item__icon">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="55" height="55" rx="27.5" fill="#E8F4FF"/>
            <rect x="0.5" y="0.5" width="55" height="55" rx="27.5" stroke="#9CCFFF"/>
            <path opacity="0.2" d="M34 30L38 34L34 38V30Z" fill="#1890FF"/>
            <path opacity="0.2" d="M18 22L22 18V26L18 22Z" fill="#1890FF"/>
            <path d="M34 30L38 34L34 38V30Z" stroke="#1890FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 34H34" stroke="#1890FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 26L18 22L22 18V26Z" stroke="#1890FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38 22H22" stroke="#1890FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </div>
        <div>
          <div class="summary-statistic-item__title">
            {{ $t('Sản phẩm có lượt bán') }}
          </div>
          <div class="summary-statistic-item__value">
            {{ formatNumberHuman(data?.data_analytic?.by_overview?.product) }}
          </div>
        </div>
      </div>
      <div class="summary-statistic-item summary-statistic-item1">
        <div class="summary-statistic-item__icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2"
                  d="M5.28613 9H27.9999L24.4349 20.5888C24.309 20.9976 24.0552 21.3553 23.711 21.6093C23.3668 21.8633 22.9502 22.0002 22.5224 22H10.5086C10.074 22.0002 9.65107 21.8588 9.30396 21.5971C8.95684 21.3355 8.70442 20.9679 8.58488 20.55L5.28613 9Z"
                  fill="#FA8C16"/>
            <path
              d="M10 29C11.1046 29 12 28.1046 12 27C12 25.8954 11.1046 25 10 25C8.89543 25 8 25.8954 8 27C8 28.1046 8.89543 29 10 29Z"
              fill="#FA8C16"/>
            <path
              d="M23 29C24.1046 29 25 28.1046 25 27C25 25.8954 24.1046 25 23 25C21.8954 25 21 25.8954 21 27C21 28.1046 21.8954 29 23 29Z"
              fill="#FA8C16"/>
            <path
              d="M5.28625 9H28L24.435 20.5888C24.3091 20.9976 24.0554 21.3553 23.7111 21.6093C23.3669 21.8633 22.9503 22.0002 22.5225 22H10.5087C10.0741 22.0002 9.65118 21.8588 9.30407 21.5971C8.95696 21.3355 8.70453 20.9679 8.585 20.55L4.06375 4.725C4.00401 4.51615 3.87789 4.33243 3.70446 4.20162C3.53103 4.07082 3.31973 4.00004 3.1025 4H1"
              stroke="#FA8C16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <div class="summary-statistic-item__title">
            {{ $t('Shop có lượt bán') }}
          </div>
          <div class="summary-statistic-item__value">
            {{ formatNumberHuman(data?.data_analytic?.by_overview?.shop) }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.SummaryStatistic{
  border: 1px solid #EEEBFF;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
}
.summary-statistic {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  border-radius: 12px;

  overflow: hidden;

  background: #fff;

  .summary-statistic-item1{
    border-left: 1px solid #EEEBFF;
  }

  .summary-statistic-item {
    display: flex;
    gap: 16px;
    flex: 1;
    padding: 24px;


    &:not(:first-child), &:not(:last-child) {
      //border-right: 1px solid #EEEBFF;
    }

    .summary-statistic-item__icon {
      width: 56px;
      height: 56px;

      display: flex;
      justify-content: center;
      align-items: center;

      margin-bottom: 16px;

      border-radius: 100000px;
    }

    &:nth-child(1) {
      .summary-statistic-item__icon {
        background: #EAF8EE;
        border: 1px solid #A5DFB5;

        svg {
          path {
            fill: #2EB553;
          }
        }
      }
    }

    &:nth-child(2) {
      .summary-statistic-item__icon {
        background: #E7F9F9;
        border: 1px solid #9AE5E5;
      }
    }

    &:nth-child(3) {
      .summary-statistic-item__icon {
        background: #E8F4FF;
        border: 1px solid #9CCFFF;

      }
    }

    &:nth-child(4) {
      .summary-statistic-item__icon {
        background: #FFF4E8;
        border: 1px solid #FDCE9B;
      }
    }

    .summary-statistic-item__title {
      color: #716B95;

      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
    }

    .summary-statistic-item__value {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: #241E46;

      span{
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        color: #241E46;
      }
    }
  }
}

@media (max-width: 768px) {
  .summary-statistic {
    grid-template-columns: 1fr;
  }
}
</style>
