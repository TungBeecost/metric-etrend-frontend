<template>
    <!-- Container Report Detail Structure -->
    <div class="container_report_detail">
      <div class="container_report_detail_left">
        <p>Trending template content</p>
        <overview :data="data?.reportDetail"/>
        <top-shop-info v-if="data?.reportDetail?.report_type === 'report_top_shop'" :data="data?.reportDetail"/>
        <report-content :data="data?.reportDetail"/>
      </div>
      <div class="container_report_detail_right">
        <div v-if="props.isStaff" style="display: flex; justify-content: flex-end">
            <a-button class="hover-button" style="display: flex; gap: 8px" @click="handleExportPdf">
                <img class="download-icon" src="/icons/Download.svg" alt="pdf"/>
                <span>Xuất báo cáo Tháng 1/2024</span>
            </a-button>
        </div>
        <indept-report-link :slug="$route.params.slug"
                           :data="data?.reportDetail"
                           :show-modal-download-pdf="props.showModalDownloadPdf"
        />
        <report-filter-detail :data="data?.reportDetail"
                             :breadcrumbs="data?.breadcrumbs" class="report-filter-detail"/>
      </div>
    </div>

    <!-- Container Metric Structure -->
    <div class="container-metric default_section">
      <div class="general_overview_container">
        <relate-report class="relate_report" :recomends="recomends"/>
        <h2 class="title_main">{{ reportTitle }}</h2>
        <div>Từ tháng <b>{{ formattedStartDate }}</b> đến tháng <b>{{ formattedEndDate }}</b></div>

        <!-- Trending specific content -->
        <general-overview :data="data?.reportDetail"/>
        <keyword-statistic v-if="data?.reportDetail?.report_type === 'report_category'" :data="data?.reportDetail"/>
        <h2 class="title_main margin-top">Phân khúc giá</h2>
        <div>Từ tháng <b>{{ formattedStartDate }}</b> đến tháng <b>{{ formattedEndDate }}</b></div>
        <price-range-statistic :data="data?.reportDetail"/>
        <list-products :data="data?.reportDetail" :custom-title="'Sản phẩm bán chạy phân khúc giá'" :custom-subtitle="''" :custom-limit="20"/>

        <h2 class="title_main margin-top">Top sản phẩm trending</h2>
        <div>Từ tháng <b>{{ formattedStartDate }}</b> đến tháng <b>{{ formattedEndDate }}</b></div>
        <list-products :data="data?.reportDetail" :custom-title="'Top sản phẩm trending theo doanh số'" :custom-subtitle="''" :custom-limit="5"/>
        <div class="statistic-block">
          <h3 class="statistic-block__title" style="margin-bottom: 16px;">
            <div>
              <span>Xu hướng tăng trưởng của sản phẩm nổi bật</span>
            </div>
          </h3>
          <div class="statistic-block-content horizontal">
            <div class="statistic-block-content-column">
              <div class="product-mini-item">
                <div class="product-mini-thumbnail">
                  <img src="https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/469e74c0c6a74313a7069e0bc869f26d~tplv-o3syd03w52-resize-jpeg:800:800.jpeg?dr=15584&from=1826719393&idc=maliva&ps=933b5bde&shcp=e1be8f53&shp=6ce186a1&t=555f072d" alt="Nồi cơm điện Amey đa năng, nồi cơm ủ nhiệt chín cơm tự động lòng nồi tráng sứ chống dính nấu cơm ngon - Cá Heo Shop's">
                </div>
                <div class="product-mini-info">
                  <div class="product-mini-name" title="Nồi cơm điện Amey đa năng, nồi cơm ủ nhiệt chín cơm tự động lòng nồi tráng sứ chống dính nấu cơm ngon - Cá Heo Shop's">Nồi cơm điện Amey đa năng, nồi cơm ủ nhiệt chín cơm tự động lòng nồi tráng sứ chống dính nấu cơm ngon - Cá Heo Shop's</div>
                  <div class="product-mini-description">Ghi nhận mức tăng [X%] về doanh số và [Y%] về sản lượng trong kỳ [KỲ_XÉT]. Sản phẩm có doanh số bán cao nhất vào khoảng thời gian từ [x] đến [y]</div>
                </div>
              </div>
              <line-chart
                :data="growthTrendData"
                :categories="growthTrendMonths"
                title=""
                yAxisTitle="Doanh số (Đồng)"
                seriesName="Doanh số"
              />
            </div>
            <div class="statistic-block-content-column">
              <div class="product-mini-item">
                <div class="product-mini-thumbnail">
                  <img src="https://cf.shopee.vn/file/vn-11134207-7ra0g-m834lrpartduea_tn" alt="Nồi cơm điện tử áp suất cao tần Cuckoo 1.8 lít CRP-HUS1000F màu đỏ- lòng nồi chống dính cao cấp phủ Xwall Black shine">
                </div>
                <div class="product-mini-info">
                  <div class="product-mini-name" title="Nồi cơm điện tử áp suất cao tần Cuckoo 1.8 lít CRP-HUS1000F màu đỏ- lòng nồi chống dính cao cấp phủ Xwall Black shine">Nồi cơm điện tử áp suất cao tần Cuckoo 1.8 lít CRP-HUS1000F màu đỏ- lòng nồi chống dính cao cấp phủ Xwall Black shine</div>
                  <div class="product-mini-description">Ghi nhận mức tăng [X%] về doanh số và [Y%] về sản lượng trong kỳ [KỲ_XÉT]. Sản phẩm có doanh số bán cao nhất vào khoảng thời gian từ [x] đến [y]</div>
                </div>
              </div>
              <line-chart
                :data="growthTrendData"
                :categories="growthTrendMonths"
                title=""
                yAxisTitle="Doanh số (Đồng)"
                seriesName="Doanh số"
              />
            </div>
          </div>
          <InsightBlock>
            <li> Trong 12 tháng qua, phân khúc khách hàng thị trường Nồi cơm điện  thường mua chủ yếu ở mức giá khoảng 500.000₫ - 1.000.000₫. </li>
            <li> Phân khúc giá phổ biến của  Nồi cơm điện  là 200.000₫ -  500.000₫ , 1.000.000₫ - 2.000.000₫. </li>
          </InsightBlock>
        </div>

        <h2 class="title_main margin-top">Top thương hiệu & shop nổi bật</h2>
        <div>Từ tháng <b>{{ formattedStartDate }}</b> đến tháng <b>{{ formattedEndDate }}</b></div>
        <brand-statistic v-if="data?.reportDetail?.report_type !== 'report_brand'" :data="data?.reportDetail"/>
        <top-shop-statistic :data="data?.reportDetail"/>

        <h2 class="title_main margin-top">Mặt hàng trending từ các thương hiệu & shop nổi bật</h2>
        <div>Từ tháng <b>{{ formattedStartDate }}</b> đến tháng <b>{{ formattedEndDate }}</b></div>
        <list-products :data="data?.reportDetail" :custom-title="'Sản phẩm trending từ các thương hiệu nổi bật'" :custom-subtitle="''" :custom-limit="5"/>
        <list-products :data="data?.reportDetail" :custom-title="'Sản phẩm trending từ các shop nổi bật'" :custom-subtitle="''" :custom-limit="5"/>

        <h2 class="title_main margin-top">Xu hướng tìm kiếm sản phẩm</h2>
        <div>Trong tháng vừa qua, nhóm hàng ghi nhận mức tìm kiếm đạt <b>1,234,567</b> lượt tìm kiếm. Ngoài ra xu hướng người dùng đang tìm kiếm kèm theo các từ khóa liên quan khác như công dụng, thuộc tính, thương hiệu,... Từ đây doanh nghiệp có thông tin về nhu cầu của người mua về nhóm hàng <b>{{ data?.reportDetail?.name }}</b> để đưa ra các kế hoạch tiếp theo của mình.</div>
        <div class="statistic-block">
          <table class="statistic-table">
            <thead>
              <tr>
                <td>Thứ hạng</td>
                <td>Từ khoá</td>
                <td>Lượt tìm kiếm</td>
                <td>Biểu đồ xu hướng</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{{data?.reportDetail?.name}}</td>
                <td>123</td>
                <td>Biểu đồ xu hướng</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{{data?.reportDetail?.name}}</td>
                <td>123</td>
                <td>Biểu đồ xu hướng</td>
              </tr>
              <tr>
                <td>3</td>
                <td>{{data?.reportDetail?.name}}</td>
                <td>123</td>
                <td>Biểu đồ xu hướng</td>
              </tr>
              <tr>
                <td>4</td>
                <td>{{data?.reportDetail?.name}}</td>
                <td>123</td>
                <td>Biểu đồ xu hướng</td>
              </tr>
              <tr>
                <td>5</td>
                <td>{{data?.reportDetail?.name}}</td>
                <td>123</td>
                <td>Biểu đồ xu hướng</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Overview from '~/components/report/Overview.vue';
import TopShopStatistic from '~/components/report/TopShopStatistic.vue';
import ReportContent from '~/components/report/ReportContent.vue';
import IndeptReportLink from '~/components/report/IndeptReportLink.vue';
// Using global component registration for report-filter-detail
import RelateReport from '~/components/RelateReport.vue';
import GeneralOverview from '~/components/report/GeneralOverview.vue';
import PriceRangeStatistic from '~/components/report/PriceRangeStatistic.vue';
import BrandStatistic from '~/components/report/BrandStatistic.vue';
import ListProducts from '~/components/report/ListProducts.vue';

const route = useRoute();

const growthTrendData = computed(() => {
  // Data matching the sample chart
  return [450, 850, 600, 770, 530, 800, 730, 690, 550, 320, 600, 580, 180];
});

const growthTrendMonths = computed(() => {
  // Dates matching the sample chart
  return [
    '31-05-2024', '30-06-2024', '31-07-2024', '31-08-2024', '30-09-2024',
    '31-10-2024', '30-11-2024', '31-12-2024', '31-01-2025', '28-02-2025',
    '31-03-2025', '30-04-2025', '12-05-2025'
  ];
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  recomends: {
    type: Array,
    default: () => []
  },
  showModalDownloadPdf: {
    type: Boolean,
    default: false
  },
  isStaff: {
    type: Boolean,
    default: false
  },
  openFormExportPdf: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:openFormExportPdf']);

const handleExportPdf = () => {
  emit('update:openFormExportPdf', true);
};

const reportTitle = computed(() => {
  return `Báo cáo xu hướng ${props.data?.reportDetail?.name || ''} - Nghiên cứu thị trường TMĐT`;
});
const formattedStartDate = computed(() => {
  if (!props.data?.reportDetail?.filter_custom || !props.data?.reportDetail?.start_date) {
    return 'N/A';
  }
  return props.data.reportDetail.start_date.slice(4, 6) + '/' + props.data.reportDetail.start_date.slice(0, 4);
});

const formattedEndDate = computed(() => {
  if (!props.data?.reportDetail?.filter_custom || !props.data?.reportDetail?.end_date) {
    return 'N/A';
  }
  return props.data.reportDetail.end_date.slice(4, 6) + '/' + props.data.reportDetail.end_date.slice(0, 4);
});
</script>

<!-- <style scoped>
.trending-report-template {
  width: 100%;
}

.container_report_detail {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}

.container_report_detail_left {
  flex: 0.7;
}

.container_report_detail_right {
  flex: 0.3;
}

.container-metric {
  margin-top: 48px;
}

.general_overview_container {
  width: 100%;
}

.title_main {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #241E46;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin: 24px 0 16px;
  color: #241E46;
}

.trending-content {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 24px;
  margin-top: 24px;
}

.trend-overview, .trend-analysis {
  margin-bottom: 32px;
}
</style> -->