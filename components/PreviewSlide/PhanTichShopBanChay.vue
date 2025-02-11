<template>
  <div id="chi-tiet-shop">
    <div class="main-slide">
      <div class="title">
        <div class="shop-index">
          {{ Number(page) + 1 < 10 ? '0' + (Number(page) + 1) : Number(page) + 1 }}
        </div>
        <img loading="lazy" v-if="shopDetail.official_type === 0" :src="platformIcons[shopDetail.platform_id].normal"
             class="platform-icon" style="border-radius: 50%"/>
        <img loading="lazy" v-else :src="platformIcons[shopDetail.platform_id]?.mall" class="platform-icon"
             style="border-radius: 500px"/>
        <a :href="shopDetail.url_shop" style="color: #000">
          Chi tiết số liệu 20 Shop hàng đầu
        </a>
      </div>
      <div class="statistics">
        <div class="main-statistic flex flex-col">
          <div class="main-statistic-item">
            <div class="main-statistic-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M22.6667 5.33398H9.33342C5.33341 5.33398 2.66675 7.33398 2.66675 12.0007V16.7473C2.66675 17.2407 3.17341 17.5473 3.61341 17.3473C4.92008 16.7473 6.42675 16.5207 8.01342 16.8007C11.5201 17.4273 14.0934 20.6807 14.0001 24.2407C13.9867 24.8006 13.9067 25.3473 13.7601 25.8806C13.6534 26.294 13.9867 26.6807 14.4134 26.6807H22.6667C26.6667 26.6807 29.3334 24.6807 29.3334 20.014V12.0007C29.3334 7.33398 26.6667 5.33398 22.6667 5.33398ZM16.0001 19.334C15.116 19.334 14.2682 18.9828 13.6431 18.3577C13.0179 17.7326 12.6667 16.8847 12.6667 16.0007C12.6667 15.1166 13.0179 14.2687 13.6431 13.6436C14.2682 13.0185 15.116 12.6673 16.0001 12.6673C16.8841 12.6673 17.732 13.0185 18.3571 13.6436C18.9822 14.2687 19.3334 15.1166 19.3334 16.0007C19.3334 16.8847 18.9822 17.7326 18.3571 18.3577C17.732 18.9828 16.8841 19.334 16.0001 19.334ZM25.6667 18.6673C25.6667 19.214 25.2134 19.6673 24.6667 19.6673C24.1201 19.6673 23.6667 19.214 23.6667 18.6673V13.334C23.6667 12.7873 24.1201 12.334 24.6667 12.334C25.2134 12.334 25.6667 12.7873 25.6667 13.334V18.6673Z"
                    fill="#039732"/>
                <path
                    d="M6.66659 18.666C3.71992 18.666 1.33325 21.0527 1.33325 23.9993C1.33325 24.9993 1.61325 25.946 2.10659 26.746C2.57663 27.536 3.2443 28.19 4.04387 28.6435C4.84344 29.0971 5.74734 29.3346 6.66659 29.3327C8.61325 29.3327 10.3066 28.2927 11.2266 26.746C11.7199 25.946 11.9999 24.9993 11.9999 23.9993C11.9999 21.0527 9.61325 18.666 6.66659 18.666ZM9.29325 23.5593L6.45325 26.186C6.26659 26.3593 6.01325 26.4527 5.77325 26.4527C5.51992 26.4527 5.26659 26.3594 5.06659 26.1594L3.74659 24.8393C3.56061 24.6512 3.45632 24.3973 3.45632 24.1327C3.45632 23.8681 3.56061 23.6142 3.74659 23.426C4.13325 23.0393 4.77325 23.0393 5.15992 23.426L5.79992 24.066L7.93325 22.0927C8.33325 21.7193 8.97325 21.746 9.34659 22.146C9.71992 22.546 9.69325 23.186 9.29325 23.5593Z"
                    fill="#039732"/>
              </svg>
            </div>
            <div class="main-statistic-numbers">
              <div class="statistic-item-value" style="white-space: nowrap;">
                Đã ẩn số liệu
              </div>
              <div class="statistic-item-name">Doanh số</div>
            </div>
          </div>
          <div class="main-statistic-item">
            <div class="main-statistic-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M23.4668 7.08037L15.9334 3.02704C15.5419 2.81697 15.1044 2.70703 14.6601 2.70703C14.2157 2.70703 13.7783 2.81697 13.3868 3.02704L5.86676 7.08037C5.32009 7.38704 4.97342 7.97371 4.97342 8.61371C4.97342 9.26704 5.30676 9.85371 5.86676 10.147L13.4001 14.2004C13.7892 14.4104 14.2245 14.5204 14.6668 14.5204C15.109 14.5204 15.5443 14.4104 15.9334 14.2004L23.4668 10.147C24.0134 9.85371 24.3601 9.26704 24.3601 8.61371C24.3601 7.97371 24.0134 7.38704 23.4668 7.08037ZM12.1601 15.6124L5.16009 12.119C4.89826 11.9856 4.60652 11.9217 4.31288 11.9334C4.01923 11.9452 3.73353 12.0322 3.4832 12.1861C3.23287 12.3401 3.0263 12.5558 2.88333 12.8125C2.74036 13.0693 2.66579 13.3585 2.66676 13.6524V20.2657C2.66676 21.4124 3.30676 22.439 4.33342 22.959L11.3334 26.4524C11.5734 26.5724 11.8401 26.639 12.1068 26.639C12.4134 26.639 12.7334 26.5457 13.0134 26.3857C13.5201 26.0657 13.8268 25.519 13.8268 24.919V18.3057C13.8134 17.159 13.1734 16.1324 12.1601 15.6124ZM26.6668 13.6524V16.9324C26.0268 16.7457 25.3468 16.6657 24.6668 16.6657C22.8534 16.6657 21.0801 17.2924 19.6801 18.4124C17.7601 19.919 16.6668 22.199 16.6668 24.6657C16.6668 25.319 16.7468 25.9724 16.9201 26.599C16.7201 26.5724 16.5201 26.4924 16.3334 26.3724C15.8268 26.0657 15.5201 25.519 15.5201 24.919V18.3057C15.5201 17.159 16.1601 16.1324 17.1734 15.6124L24.1734 12.119C24.4353 11.9856 24.727 11.9217 25.0206 11.9334C25.3143 11.9452 25.6 12.0322 25.8503 12.1861C26.1006 12.3401 26.3072 12.5558 26.4502 12.8125C26.5932 13.0693 26.6677 13.3585 26.6668 13.6524Z"
                    fill="#4E4873"/>
                <path
                    d="M29.3066 20.8934C28.7467 20.2033 28.0392 19.6475 27.2363 19.2667C26.4333 18.886 25.5552 18.6901 24.6666 18.6934C23.2532 18.6934 21.9466 19.1867 20.9199 20.0134C20.2138 20.5714 19.644 21.2828 19.2536 22.0936C18.8632 22.9044 18.6625 23.7935 18.6666 24.6934C18.6687 25.5825 18.8683 26.46 19.2511 27.2625C19.6339 28.0649 20.1902 28.7723 20.8799 29.3334H20.8932C21.9199 30.1867 23.2399 30.6934 24.6666 30.6934C26.1866 30.6934 27.5599 30.1334 28.6132 29.2001C29.2565 28.6383 29.7725 27.9457 30.1266 27.1685C30.4807 26.3913 30.6648 25.5475 30.6666 24.6934C30.6666 23.2534 30.1599 21.9201 29.3066 20.8934ZM27.6799 23.9467L24.4799 26.9067C24.2932 27.0801 24.0399 27.1734 23.7999 27.1734C23.5466 27.1734 23.2932 27.0801 23.0932 26.8801L21.6132 25.4001C21.4273 25.2119 21.323 24.958 21.323 24.6934C21.323 24.4288 21.4273 24.1749 21.6132 23.9867C21.9999 23.6001 22.6399 23.6001 23.0266 23.9867L23.8266 24.7867L26.3199 22.4801C26.7199 22.1067 27.3599 22.1334 27.7332 22.5334C28.1199 22.9467 28.0932 23.5734 27.6799 23.9467Z"
                    fill="#4E4873"/>
              </svg>
            </div>
            <div class="main-statistic-numbers">
              <div class="statistic-item-value">
                Đã ẩn số liệu
              </div>
              <div class="statistic-item-name">Sản phẩm đã bán</div>
            </div>
          </div>
          <div class="main-statistic-item">
            <div class="main-statistic-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M23.4668 7.08037L15.9334 3.02704C15.5419 2.81697 15.1044 2.70703 14.6601 2.70703C14.2157 2.70703 13.7783 2.81697 13.3868 3.02704L5.86676 7.08037C5.32009 7.38704 4.97342 7.97371 4.97342 8.61371C4.97342 9.26704 5.30676 9.85371 5.86676 10.147L13.4001 14.2004C13.7892 14.4104 14.2245 14.5204 14.6668 14.5204C15.109 14.5204 15.5443 14.4104 15.9334 14.2004L23.4668 10.147C24.0134 9.85371 24.3601 9.26704 24.3601 8.61371C24.3601 7.97371 24.0134 7.38704 23.4668 7.08037ZM12.1601 15.6124L5.16009 12.119C4.89826 11.9856 4.60652 11.9217 4.31288 11.9334C4.01923 11.9452 3.73353 12.0322 3.4832 12.1861C3.23287 12.3401 3.0263 12.5558 2.88333 12.8125C2.74036 13.0693 2.66579 13.3585 2.66676 13.6524V20.2657C2.66676 21.4124 3.30676 22.439 4.33342 22.959L11.3334 26.4524C11.5734 26.5724 11.8401 26.639 12.1068 26.639C12.4134 26.639 12.7334 26.5457 13.0134 26.3857C13.5201 26.0657 13.8268 25.519 13.8268 24.919V18.3057C13.8134 17.159 13.1734 16.1324 12.1601 15.6124ZM26.6668 13.6524V16.9324C26.0268 16.7457 25.3468 16.6657 24.6668 16.6657C22.8534 16.6657 21.0801 17.2924 19.6801 18.4124C17.7601 19.919 16.6668 22.199 16.6668 24.6657C16.6668 25.319 16.7468 25.9724 16.9201 26.599C16.7201 26.5724 16.5201 26.4924 16.3334 26.3724C15.8268 26.0657 15.5201 25.519 15.5201 24.919V18.3057C15.5201 17.159 16.1601 16.1324 17.1734 15.6124L24.1734 12.119C24.4353 11.9856 24.727 11.9217 25.0206 11.9334C25.3143 11.9452 25.6 12.0322 25.8503 12.1861C26.1006 12.3401 26.3072 12.5558 26.4502 12.8125C26.5932 13.0693 26.6677 13.3585 26.6668 13.6524Z"
                    fill="#096DD9"/>
                <path
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M24.6667 30.666C27.9805 30.666 30.6667 27.9797 30.6667 24.666C30.6667 21.3523 27.9805 18.666 24.6667 18.666C21.353 18.666 18.6667 21.3523 18.6667 24.666C18.6667 27.9797 21.353 30.666 24.6667 30.666ZM25.0895 27.1193C25.223 27.2648 25.3922 27.3327 25.5613 27.3327C25.7304 27.3327 25.8995 27.2648 26.0241 27.1096L27.8399 25.1305C27.9289 25.0141 27.9823 24.8879 28.0001 24.7521V24.5969C27.9912 24.4417 27.9289 24.2767 27.8132 24.1506L26.033 22.2104C25.7749 21.929 25.3477 21.929 25.0895 22.2104C24.956 22.3559 24.8937 22.5402 24.8937 22.7245C24.8934 22.8201 24.9106 22.9148 24.9442 23.0031C24.9778 23.0914 25.0272 23.1715 25.0895 23.2387L25.7304 23.9372H22.001C21.636 23.9372 21.3334 24.267 21.3334 24.6648C21.3334 25.0626 21.636 25.3924 22.001 25.3924H25.7304L25.0895 26.0909C24.9654 26.2278 24.8958 26.4126 24.8958 26.6051C24.8958 26.7976 24.9654 26.9823 25.0895 27.1193Z"
                    fill="#096DD9"/>
              </svg>
            </div>
            <div class="main-statistic-numbers">
              <div class="statistic-item-value">
                Đã ẩn số liệu
              </div>
              <div class="statistic-item-name">Sản phẩm có lượt bán</div>
            </div>
          </div>
<!--          <div class="main-statistic-item">-->
<!--            <div class="main-statistic-icon">-->
<!--              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path-->
<!--                    d="M20.5201 6.94769L22.4001 10.7077C22.6534 11.2277 23.3334 11.721 23.9067 11.8277L27.3067 12.3877C29.4801 12.7477 29.9867 14.321 28.4267 15.8944L25.7734 18.5477C25.3334 18.9877 25.0801 19.8544 25.2267 20.481L25.9867 23.761C26.5867 26.3477 25.2001 27.361 22.9201 26.001L19.7334 24.1077C19.1601 23.761 18.2001 23.761 17.6267 24.1077L14.4401 26.001C12.1601 27.3477 10.7734 26.3477 11.3734 23.761L12.1334 20.481C12.2534 19.841 12.0001 18.9744 11.5601 18.5344L8.90675 15.881C7.34675 14.321 7.85342 12.7477 10.0267 12.3744L13.4267 11.8144C14.0001 11.721 14.6801 11.2144 14.9334 10.6944L16.8134 6.93435C17.8401 4.90769 19.4934 4.90769 20.5201 6.94769ZM10.6667 7.66635H2.66675C2.12008 7.66635 1.66675 7.21302 1.66675 6.66635C1.66675 6.11969 2.12008 5.66635 2.66675 5.66635H10.6667C11.2134 5.66635 11.6667 6.11969 11.6667 6.66635C11.6667 7.21302 11.2134 7.66635 10.6667 7.66635ZM6.66675 26.333H2.66675C2.12008 26.333 1.66675 25.8797 1.66675 25.333C1.66675 24.7864 2.12008 24.333 2.66675 24.333H6.66675C7.21341 24.333 7.66675 24.7864 7.66675 25.333C7.66675 25.8797 7.21341 26.333 6.66675 26.333ZM4.00008 16.9997H2.66675C2.12008 16.9997 1.66675 16.5464 1.66675 15.9997C1.66675 15.453 2.12008 14.9997 2.66675 14.9997H4.00008C4.54675 14.9997 5.00008 15.453 5.00008 15.9997C5.00008 16.5464 4.54675 16.9997 4.00008 16.9997Z"-->
<!--                    fill="#FAAD14"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <div class="main-statistic-numbers">-->
<!--              <div class="statistic-item-value">-->
<!--                Đã ẩn số liệu-->
<!--              </div>-->
<!--              <div class="statistic-item-name">Tổng đánh giá</div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div class="chart-statistic">
          <div class="relative">
            <div :class="{'blurred-4': isCovered}">
              <highchart :options="chartOptions[0]"/>
            </div>
            <CoverSlidePopup v-if="isCovered" :data="data" size="lg"/>
          </div>
          <div class="list-products" :class="{'blurred-3': isCovered}">
            <ProductItemPrint
                v-for="productItem in (data.data_analytic?.by_product?.lst_product_revenue_30d.slice(0,5) || [])"
                :key="productItem.id"
                :product-item="productItem"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';  // Import useRoute from vue-router
import moment from 'moment';
import Highcharts from 'highcharts';
import CoverSlidePopup from '/components/PreviewSlide/CoverSlidePopup.vue';
import ProductItemPrint from "~/components/PreviewSlide/ProductItemPrint.vue";

const platformNames = {
  1: "Shopee",
  2: "Lazada",
  3: "Tiki",
  4: "Sendo"
};

const platformIcons = {
  1: {
    normal: 'https://lh3.googleusercontent.com/mvI9jsrKjP7Q7ZqYOXuJTRZF9Q1e4PZJjjmNAyzh6OKtxtSUNPK920MMFsXploU60VPMqHCdJLEMzaEF_ktvIXuII2IEamnw0Cr5Cb97_803ePqQQYOLtHQLrVUe9e2DPZ3MoxTp',
    mall: 'https://lh3.googleusercontent.com/pw/AMWts8CWbeVuOx5R0XMESs9hOrx0yH0ZwBN_hugmFpOb4lJQAEwUZykA-Habt1SzFOB3NXFXWxYeD7ukQKwH5cDvXJ4xfCiiMo-Gm21JVFBokuYr0L12M1NguLGc9nw70YV-Uz4jkN17TZl2w3uG8zCKlnB6=w960-h256-s-no'
  },
  2: {
    normal: 'https://laz-img-cdn.alicdn.com/tfs/TB1ODo.f2b2gK0jSZK9XXaEgFXa-64-64.png',
    mall: 'https://lh3.googleusercontent.com/pw/AMWts8AXPfmhdCIyZoaHqU0nWrbPFBYsbewHYRq1mHY7Aa3Vk6rwFElRWGo6l8z5Jvou9jrPH9IHY6DuAMCGaG-yPLYfF0vaE-bblu6DCJ1wCH63Icn3GJ9GHv25gaagx59li-eT88vpSPS0qJEVe3Ve92D4=w807-h256-s-no'
  },
  3: {
    normal: 'https://lh3.googleusercontent.com/-Rwy9DczZyAbvIivqO1fAmSWRw0cThG3fRXMjOOVsOtTiDlAdMUff8N_zmvCxI8CGzH-dWZdQNXFIGhmaR4Mc8J0GrkZwKL-MvsjsOdLw_9Aa9xJjVAKED4MCb1OtggIcnWFUPwRQQ',
    mall: 'https://lh3.googleusercontent.com/-Rwy9DczZyAbvIivqO1fAmSWRw0cThG3fRXMjOOVsOtTiDlAdMUff8N_zmvCxI8CGzH-dWZdQNXFIGhmaR4Mc8J0GrkZwKL-MvsjsOdLw_9Aa9xJjVAKED4MCb1OtggIcnWFUPwRQQ',
  },
};

const platformColors = {
  Shopee: "#DD5521",
  Lazada: "#1B1A48",
  Tiki: "#5799FF"
};

// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isHideContent: {
    type: Boolean,
    default: false
  },
  slide: {
    type: String,
    default: '0'
  }
});

const route = useRoute();  // Use useRoute to access route information

function formatDateFunc(value, format) {
  return moment(value, "YYYYMMDD").format(format);
}

const platformNamesRef = ref(platformNames);
const platformColorsRef = ref(platformColors);
const hcInstance = ref(Highcharts);

const isCovered = computed(() => true);

const page = computed(() => route.query.page || 0);

const shopDetail = computed(() => {
  const { data_analytic } = props.data;
  return data_analytic?.by_shop?.lst_shop?.length > page.value
      ? data_analytic.by_shop.lst_shop[page.value]
      : {};
});

const chartOptions = computed(() => {
  const chartTextStyle = {
    fontSize: "8px",
    fontFamily: "Inter",
    fontWeight: 400
  };

  return [
    {
      chart: {
        width: 500,
        height: 230,
        style: {
          fontFamily: "Inter",
        },
      },
      title: {
        text: null
      },
      yAxis: [
        {
          title: {
            text: "Số sản phẩm đã bán", // Assuming this is 'Products Sold'
            style: chartTextStyle,
          },
          labels: {
            style: chartTextStyle,
          },
          opposite: true
        },
        {
          title: {
            text: "Doanh số", // Assuming this is 'Revenue'
            style: chartTextStyle,
          },
          labels: {
            style: chartTextStyle,
          }
        }
      ],
      plotOptions: {
        series: {
          stacking: "normal"
        }
      },
      legend: {
        reversed: true,
        layout: 'horizontal',
        itemStyle: chartTextStyle,
        symbolRadius: 1,
      },
      xAxis: {
        categories: (props.data?.data_analytic?.by_overview?.lst_revenue_sale_monthly || [])
            .map(({ begin }) => formatDateFunc(begin, "MM/YYYY")),
        labels: {
          style: chartTextStyle
        }
      },
      series: [
        {
          name: "Số sản phẩm đã bán", // Data for products sold
          color: "#FFBF00",
          type: "spline",
          data: (props.data?.data_analytic?.by_overview?.lst_revenue_sale_monthly || [])
              .map(() => null), // Replace with actual sales data if available
          zIndex: 1
        },
        {
          name: "Doanh số", // Data for revenue
          color: platformColorsRef.value[platformNamesRef.value[1]] || '#000000', // Default to black if undefined
          stack: "platform_revenue_price_range",
          type: "column",
          yAxis: 1,
          borderRadius: 3,
          data: (props.data?.data_analytic?.by_overview?.lst_revenue_sale_monthly || [])
              .map((item) => item.score || 0) // Using 'score' as a placeholder for revenue
        },
      ]
    }
  ];
});


onMounted(() => {
  hcInstance.value.setOptions({
    lang: {
      numericSymbols: [` Nghìn`, ` Triệu`, ` Tỷ`],
    },
  });
});
</script>



<style lang="scss" scoped>
#chi-tiet-shop {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;

  .main-slide {
    width: 100%;
    height: 600px;

    padding: 18px 20px;

    background-color: #fff;

    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;

      letter-spacing: -0.02em;

      color: #241E46;

      margin-bottom: 36px;

      display: flex;
      align-items: center;
      gap: 12px;

      .shop-index {
        width: 30px;
        height: 30px;

        border-radius: 50%;
        background: #9D97BF;
        color: #fff;

        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 400;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-right: 12px;
      }

      .platform-icon {
        //width: 40px;
        height: 30px;

        //border-radius: 50%;
      }

      span {
        font-weight: 700;
      }
    }

    .statistics {
      display: flex;
      gap: 1em;

      .main-statistic {
        gap: 20px;

        .main-statistic-item {
          flex: 1;

          display: flex;
          align-items: center;
          align-self: stretch;

          gap: 18px;

          padding: 20px 16px;

          border-radius: 16px;

          &:nth-child(1) {
            background: #E3F2E7;

            .statistic-item-value {
              color: #039732;
            }
          }

          &:nth-child(2) {
            background: #EEEBFF;

            .statistic-item-value {
              color: #3F33B5;
            }
          }

          &:nth-child(3) {
            background: #E6F7FF;

            .statistic-item-value {
              color: #096DD9;
            }
          }

          &:nth-child(4) {
            background: #FFFBE6;

            .statistic-item-value {
              color: #FAAD14;
            }
          }

          .main-statistic-icon {
            height: 50px;
          }

          .main-statistic-numbers {
            .redirect-link {
              display: flex;
              align-items: flex-end;

              justify-content: center;

              a {
                color: #ffffff;
                font-weight: 700;
                font-size: 15px;
                text-decoration: underline;
              }
            }

            .statistic-item-name {
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;

              color: #595959;
            }

            .statistic-item-value {
              font-weight: 700;
              font-size: 22px;
              line-height: 1.4;
            }
          }
        }
      }

      .chart-statistic {
        flex: 1;

        .list-products {
          display: flex;
          gap: 8px;

          .product-item {
            width: calc(20% - 8px);
          }
        }
      }
    }
  }
}
.blurred-4{
  filter: blur(4px);
}
.blurred-3{
  filter: blur(3px);
}
</style>
