<template>
  <div id="thong-ke-thuong-hieu">
    <div class="main-slide">
      <div class="title"><span>THỐNG KÊ THƯƠNG HIỆU TOÀN SÀN</span></div>
      <div class="relative">
        <div style="font-size: 16px; margin-bottom: 16px; color: #241E46">
          Nhóm hàng "{{ data.name }}" có
          <BlurContent :is-blurred="isCovered" style="font-size: 20px; font-weight: 700; color: #000">
            {{
              formatNumber(data.data_analytic.by_brand.ratio?.brand.brand || 0)
            }}
            thương hiệu
          </BlurContent>
          kinh doanh trên sàn TMĐT.
        </div>
        <div class="statistics">
          <div
              class="statistic-item"
          >
            <div class="chart-title" style="margin-bottom: 0; margin-left: 0">
              <div class="chart-title-shape" style="background: #FFE7BA"/>
              Top 10 thương hiệu có doanh thu cao nhất<br/>trên các sàn TMĐT
            </div>
            <div :class="{'blurred-4': isCovered}">
              <highchart :options="charts[0]"/>
            </div>
            <div class="descriptions">
              <ul>
                <li>Top thương hiệu có <span class="text-bold">doanh thu cao nhất</span> là
                  <BlurContent :is-blurred="isCovered"><span
                      v-for="(brand, index) in data.data_analytic.by_brand.lst_top_brand_revenue.slice(0, 3)"
                      :key="brand.name"
                  >{{ brand.name }}{{ index === 2 ? '.' : '' }}<span v-if="index < 1">, </span><span
                      v-else-if="index < 2"> và </span></span></BlurContent>
                </li>
                <li>
                  10 thương hiệu có doanh thu cao nhất chiếm
                  <BlurContent :is-blurred="isCovered" class="text-bold">{{
                      Number(totalBrandRevenue / (data.data_analytic.by_brand.ratio.brand.revenue + data.data_analytic.by_brand.ratio.no_brand.revenue) * 100 || 0).toFixed(1).replace(".", ",")
                    }}%
                  </BlurContent>
                  thị phần doanh thu của ngành hàng "{{ data.name }}".
                </li>
              </ul>
            </div>
          </div>
          <div
              class="statistic-item"
          >
            <div class="chart-title" style="margin-bottom: 0; margin-left: 0">
              <div class="chart-title-shape" style="background: #FFE7BA"/>
              Top 10 thương hiệu có sản lượng bán cao nhất<br/>trên các sàn TMĐT
            </div>
            <div :class="{'blurred-4': isCovered}">
              <highchart :options="charts[1]"/>
            </div>
            <div class="descriptions">
              <ul>
                <li>Top thương hiệu có <span class="text-bold">sản lượng bán</span> cao nhất là
                  <BlurContent :is-blurred="isCovered"><span
                      v-for="(brand, index) in data.data_analytic.by_brand.lst_top_brand_sale.slice(0, 3)"
                      :key="brand.name"
                  >{{ brand.name }}{{ index === 2 ? '.' : '' }}<span v-if="index < 1">, </span><span
                      v-else-if="index < 2"> và </span></span></BlurContent>
                </li>
                <li>
                  10 thương hiệu có sản lượng bán cao nhất chiếm
                  <BlurContent :is-blurred="isCovered" class="text-bold">{{
                      Number(totalBrandSale / (data.data_analytic.by_brand.ratio.brand.sale + data.data_analytic.by_brand.ratio.no_brand.sale) * 100 || 0).toFixed(1).replace(".", ",")
                    }}%
                  </BlurContent>
                  thị phần sản lượng của ngành hàng này.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--        <CoverSlidePopup v-if="isCovered" size="lg" :data="data"/>-->
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, defineProps } from 'vue';
import Highcharts from 'highcharts';
import { formatNumber } from '~/helpers/FormatHelper.js';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isHideContent: {
    type: Boolean,
    default: false
  }
});

const isCovered = computed(() => true);

// Safely access properties using optional chaining and default values
const totalBrandRevenue = computed(() => {
  const brands = props.data.data_analytic?.by_brand?.lst_top_brand_revenue || [];
  return brands.reduce(
      (total, item) => total + (item.revenue || 0),
      0
  );
});

const totalBrandSale = computed(() => {
  const brands = props.data.data_analytic?.by_brand?.lst_top_brand_sale || [];
  return brands.reduce(
      (total, item) => total + (item.sale || 0),
      0
  );
});

const charts = computed(() => {

  const revenueData = props.data.data_analytic?.by_brand?.lst_top_brand_revenue || [];
  const saleData = props.data.data_analytic?.by_brand?.lst_top_brand_sale || [];

  return [
    {
      chart: {
        type: 'pie',
        width: 400,
        height: 300,
        style: {
          fontFamily: 'Montserrat',
        },
      },
      title: {
        text: undefined,
      },
      plotOptions: {
        pie: {
          colors: [
            '#9254DE',
            '#FF7A45',
            '#FF4D4F',
            '#597EF7',
            '#241E46',
            '#F15D25',
            '#1890FF',
            '#36CFC9',
            '#AEC986',
            '#FFC53D'
          ],
          size: 130,
          cursor: 'pointer',
          showInLegend: false,
          innerSize: '70%',
          dataLabels: {
            distance: 10,
            formatter: function () {
              return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 1, ',') + ' %';
            }
          }
        },
      },
      legend: {
        position: 'left',
        symbolRadius: 1,
        align: 'left',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemMarginTop: 10,
        itemStyle: { fontSize: '8px', fontFamily: 'Montserrat', fontWeight: 400 }
      },
      series: [
        {
          name: 'Doanh số',
          data: revenueData.map(({ name, ratio_revenue }) => {
            return {
              name: name ? (name.length > 13 ? name.slice(0, 13) + '...' : name) : '',
              y: ratio_revenue * 100 || 0,  // Convert ratio to percentage
              categoryName: 'Shop'
            };
          })
        }
      ]
    },
    {
      chart: {
        type: 'pie',
        width: 400,
        height: 300,
        style: {
          fontFamily: 'Montserrat',
        },
      },
      title: {
        text: undefined,
      },
      plotOptions: {
        pie: {
          colors: [
            '#9254DE',
            '#FF7A45',
            '#FF4D4F',
            '#597EF7',
            '#241E46',
            '#F15D25',
            '#1890FF',
            '#36CFC9',
            '#AEC986',
            '#FFC53D'
          ],
          size: 130,
          cursor: 'pointer',
          showInLegend: false,
          innerSize: '70%',
          dataLabels: {
            enabled: true,
            distance: 10,
            formatter: function () {
              return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 1, ',') + ' %';
            },
          }
        },
      },
      legend: {
        position: 'left',
        symbolRadius: 1,
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemMarginTop: 10,
        itemStyle: { fontSize: '8px', fontFamily: 'Montserrat', fontWeight: 400 }
      },
      series: [
        {
          name: 'Sản phẩm đã bán',
          data: saleData.map(({ name, ratio_sale }) => {
            return {
              name: name ? (name.length > 13 ? name.slice(0, 13) + '...' : name) : '',
              y: ratio_sale ? ratio_sale * 100 : 0,  // Convert ratio to percentage
              categoryName: 'Shop'
            };
          })
        }
      ]
    }
  ];
});

</script>


<style lang="scss" scoped>
#thong-ke-thuong-hieu {
  font-family: "Montserrat", sans-serif;
  color: #333;

  .main-slide {
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .title {
      font-weight: 700;
      font-size: 28px;  // Increase font size for better visibility
      line-height: 36px;
      color: #241E46;
      margin-bottom: 24px;  // Increase margin for separation
      letter-spacing: -0.02em;

      span {
        font-weight: 700;
      }
    }

    .relative {
      position: relative;  // Needed for any absolutely positioned elements

      .statistics {
        display: flex;
        flex-wrap: wrap;  // Allow items to wrap on smaller screens
        gap: 20px;  // Add spacing between chart items

        .statistic-item {
          flex: 1;
          min-width: 300px;  // Minimum width for responsiveness
          display: flex;
          flex-direction: column;
          align-items: stretch;
          background-color: #f9f9f9;  // Background color for each item
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          padding: 16px;  // Padding inside the statistic items

          .chart-title {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #241E46;
            margin-bottom: 12px;
            display: flex;
            align-items: center;

            .chart-title-shape {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #FFE7BA;
              margin-right: 8px;
            }
          }

          .descriptions {
            ul {
              padding-left: 20px;
              list-style: disc;

              li {
                font-size: 14px;
                line-height: 22px;
                color: #241E46;
                margin-bottom: 12px;

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .main-slide {
      padding: 15px 20px;

      .title {
        font-size: 24px;
        line-height: 32px;
      }
    }

    .statistics {
      .statistic-item {
        min-width: 100%;
      }
    }
  }
}
.blurred-4{
  filter: blur(4px);
}
</style>

