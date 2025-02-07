<script setup lang="ts">
import ItemFeatureReport from './ItemFeatureReport.vue';
// import {type SearchReportPayload} from "~/services/reports";
// import {REPORT_ENDPOINTS} from "~/constant/endpoints";
//
// const config = useRuntimeConfig();


// const fetchReport = async () => {
//   console.log('fetchReport')
//   try {
//     const body: SearchReportPayload = {
//       limit: 10,
//       lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop", "created_at"],
//       lst_query: [],
//       lst_category_report_id: [],
//       offset: 0,
//       sort: "popularity",
//     };
//     const {lst_report}: any = await $fetch(`${config.public.API_ENDPOINT}${REPORT_ENDPOINTS.search.endpoint}`, {
//       method: 'POST',
//       body
//     })
//     return lst_report
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// const {data: lstReport} = await useAsyncData(fetchReport)

const lstReport = [
  {
    "id": 77052,
    "slug": "sua-bot-ensure",
    "name": "sữa bột ensure",
    "introduction": null,
    "url_thumbnail": "https://vn-live-01.slatic.net/p/0045e6c5d19e6449c86458f9707b05f5.jpg",
    "created_at": "2022-10-28T18:34:05.560061",
    "report_type": "report_product_line",
    "revenue_monthly": 50871341451.333336,
    "product": 810,
    "search_volume_shopee": 1705,
    "gr_quarter": -0.43649991812614397,
    "source": "auto",
    "shop": 456,
    "category_report_id": "c1325589749",
    "lst_category": [
      {
        "id": "c1144728673",
        "name": "Bách Hoá - Thực Phẩm",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      },
      {
        "id": "c1325589749",
        "name": "Sữa - trứng",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      }
    ],
    "lst_brand": [
      "ensure",
      "abbott",
      "tops market",
      "ensure gold",
      "deglet nour",
      "glucerna",
      "oem",
      "calvin klein",
      "kokubo",
      "the a2 milk company"
    ],
    "start_date": "20230701",
    "end_date": "20240630"
  },
  {
    "id": 4112,
    "slug": "may-hut-bui-cam-tay",
    "name": "máy hút bụi cầm tay",
    "introduction": null,
    "url_thumbnail": "https://cf.shopee.vn/file/vn-11134207-7r98o-lv1jstgcituic1",
    "created_at": "2024-09-18T14:59:04.441642",
    "report_type": "report_product_line",
    "revenue_monthly": 76492252145.83333,
    "product": 9167,
    "search_volume_shopee": 497286,
    "gr_quarter": -0.060394254659248754,
    "source": "auto",
    "shop": 4904,
    "category_report_id": "c437653355",
    "lst_category": [
      {
        "id": "c945324293",
        "name": "Điện Gia Dụng",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.428724",
        "updated_at": "2024-09-23T02:20:59.428775"
      },
      {
        "id": "c437653355",
        "name": "Thiết bị điện gia dụng nhỏ",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.428724",
        "updated_at": "2024-09-23T02:20:59.428775"
      }
    ],
    "lst_brand": [
      "deerma",
      "jetzt",
      "uniq",
      "dreame",
      "ilife",
      "puppyoo",
      "xiaomi",
      "deladep",
      "shanen",
      "enolux"
    ],
    "start_date": "20230401",
    "end_date": "20240331"
  },
  {
    "id": 37488,
    "slug": "nuoc-tay-trang-simple-micellar",
    "name": "nước tẩy trang simple micellar",
    "introduction": null,
    "url_thumbnail": "https://filebroker-cdn.lazada.vn/kf/S5008a001d935443499997284fd65a721F.png",
    "created_at": "2022-10-28T18:34:05.560061",
    "report_type": "report_product_line",
    "revenue_monthly": 3787918573.8333335,
    "product": 582,
    "search_volume_shopee": 4034,
    "gr_quarter": 0.04994514143013179,
    "source": "auto",
    "shop": 513,
    "category_report_id": "c1926323782",
    "lst_category": [
      {
        "id": "c950887968",
        "name": "Làm Đẹp",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.428724",
        "updated_at": "2024-09-23T02:20:59.428775"
      },
      {
        "id": "c1926323782",
        "name": "Trang điểm",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.428724",
        "updated_at": "2024-09-23T02:20:59.428775"
      }
    ],
    "lst_brand": [
      "simple",
      "unilever",
      "simplee",
      "simple pure",
      "banobagi",
      "hoà xixi",
      "simple solution",
      "norand",
      "simple and simple"
    ],
    "start_date": "20230701",
    "end_date": "20240630"
  },
  {
    "id": 6132,
    "slug": "may-lam-sua-hat",
    "name": "máy làm sữa hạt",
    "introduction": null,
    "url_thumbnail": "https://cf.shopee.vn/file/vn-11134207-7r98o-ln9izhkxc46ra1",
    "created_at": "2022-10-28T11:08:18.434086",
    "report_type": "report_product_line",
    "revenue_monthly": null,
    "product": null,
    "search_volume_shopee": 58398,
    "gr_quarter": null,
    "source": "auto",
    "shop": 1504,
    "category_report_id": "c641426678",
    "lst_category": [
      {
        "id": "c945324293",
        "name": "Điện Gia Dụng",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      },
      {
        "id": "c641426678",
        "name": "Đồ gia dụng nhà bếp",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      }
    ],
    "lst_brand": [
      "seka",
      "gilux",
      "unie",
      "tefal",
      "lazychef",
      "megou",
      "bear",
      "olivo",
      "bluestone",
      "masuto"
    ],
    "start_date": "20230701",
    "end_date": "20240630"
  },
  {
    "id": 5825,
    "slug": "kem-chong-nang-anessa",
    "name": "kem chống nắng anessa",
    "introduction": null,
    "url_thumbnail": "https://vn-live-01.slatic.net/p/068f8936b5a321c84cb5d36ee6fe07fa.png",
    "created_at": "2022-10-28T11:08:18.434086",
    "report_type": "report_product_line",
    "revenue_monthly": null,
    "product": null,
    "search_volume_shopee": 66774,
    "gr_quarter": null,
    "source": "auto",
    "shop": 490,
    "category_report_id": "c157614325",
    "lst_category": [
      {
        "id": "c950887968",
        "name": "Làm Đẹp",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      },
      {
        "id": "c157614325",
        "name": "Chăm sóc da mặt",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      }
    ],
    "lst_brand": [
      "anessa",
      "shiseido",
      "mọi loại da",
      "oem",
      "pekah",
      "cell fusion c",
      "anessa shiseido",
      "thorakao",
      "venagreen",
      "skin1004"
    ],
    "start_date": "20230701",
    "end_date": "20240630"
  },
  {
    "id": 7257,
    "slug": "hat-dinh-duong",
    "name": "hạt dinh dưỡng",
    "introduction": null,
    "url_thumbnail": "https://cf.shopee.vn/file/vn-11134207-7r98o-lphevvnx3zgu4a",
    "created_at": "2022-10-28T13:46:24.084802",
    "report_type": "report_product_line",
    "revenue_monthly": 16495269306.833334,
    "product": 8178,
    "search_volume_shopee": 39306,
    "gr_quarter": 0.03427168421658538,
    "source": "auto",
    "shop": 3202,
    "category_report_id": "c1358123234",
    "lst_category": [
      {
        "id": "c1144728673",
        "name": "Bách Hoá - Thực Phẩm",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      },
      {
        "id": "c1358123234",
        "name": "Ngũ cốc & mứt",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.307756",
        "updated_at": "2024-09-23T02:20:59.307824"
      }
    ],
    "lst_brand": [
      "giọt nắng",
      "tanu nuts",
      "wisefood",
      "calbee",
      "annut",
      "nông sản vàng",
      "whiskas",
      "hebekery",
      "mămmy",
      "dk harvest"
    ],
    "start_date": "20230701",
    "end_date": "20240630"
  },
  {
    "id": 5502,
    "slug": "bim-yiying",
    "name": "bỉm yiying",
    "introduction": null,
    "url_thumbnail": "https://cf.shopee.vn/file/vn-11134207-7qukw-lhsv1f76dfgl9e",
    "created_at": "2024-09-14T13:21:24.242378",
    "report_type": "report_product_line",
    "revenue_monthly": 506040800,
    "product": 106,
    "search_volume_shopee": 79137,
    "gr_quarter": -0.1824771521497748,
    "source": "auto",
    "shop": 64,
    "category_report_id": "c1702644256",
    "lst_category": [
      {
        "id": "c1478997685",
        "name": "Mẹ & Bé",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.522044",
        "updated_at": "2024-09-23T02:20:59.522092"
      },
      {
        "id": "c1702644256",
        "name": "Tã, bỉm, vệ sinh cho bé",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.522044",
        "updated_at": "2024-09-23T02:20:59.522092"
      }
    ],
    "lst_brand": [
      "yiying",
      "yubest",
      "yiying mianhuxi",
      "yi ying",
      "nanu"
    ],
    "start_date": "20230701",
    "end_date": "20240630"
  },
  {
    "id": 10474,
    "slug": "binh-sua-avent",
    "name": "bình sữa avent",
    "introduction": null,
    "url_thumbnail": "https://cf.shopee.vn/file/vn-11134207-7r98o-lsghzao13ont3f",
    "created_at": "2024-09-14T13:47:02.758253",
    "report_type": "report_product_line",
    "revenue_monthly": 1960012168.3333333,
    "product": 1448,
    "search_volume_shopee": 20544,
    "gr_quarter": 0.11815233925309895,
    "source": "auto",
    "shop": 521,
    "category_report_id": "c2092560146",
    "lst_category": [
      {
        "id": "c1478997685",
        "name": "Mẹ & Bé",
        "is_leaf": false,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.522044",
        "updated_at": "2024-09-23T02:20:59.522092"
      },
      {
        "id": "c2092560146",
        "name": "Đồ dùng ăn dặm cho bé",
        "is_leaf": true,
        "category_base_id": null,
        "url_thumbnail": null,
        "parent_id": null,
        "parent_name": null,
        "cat_level": null,
        "is_use_main_cat": null,
        "created_at": "2024-09-23T02:20:59.522044",
        "updated_at": "2024-09-23T02:20:59.522092"
      }
    ],
    "lst_brand": [
      "philips avent",
      "avent",
      "moyuum",
      "hipp",
      "mama's choice",
      "kocikids",
      "mama’s choice",
      "grosmimi",
      "maymom",
      "babyd"
    ],
    "start_date": "20230701",
    "end_date": "20240630"
  }
]
</script>

<template>
  <div class="featured_report">
    <div class="default_section">
      <div class="title_content">
        <div class="tittle">Báo cáo xu hướng mới nhất</div>
        <div class="content">
          <div>
            Chi tiết tăng trưởng, doanh số, sản lượng, mức giá, thị phần, sản phẩm trending... của mọi nhóm hàng, thương hiệu và nhà bán
          </div>
        </div>
      </div>
      <div class="new_report">
        <item-feature-report :reports="(lstReport || []).slice(0, 10)"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.featured_report {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  padding-top: 60px;
  height: 100%;
  padding-bottom: 60px;
}

.title_content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 64px;
}

.tittle {
  text-align: center;
  font-size: 44px;
  font-weight: bold;
  color: #241E46;

  margin-bottom: 16px;
}

.content {
  div {
    text-align: center;
    font-size: 20px;
    color: #716B95;
    line-height: 32px;
  }
}

@media (max-width: 1023px) {
  .featured_report {
    padding-top: 40px;
    gap: 32px;
  }

  .title_content {
    gap: 8px;
    margin-bottom: 40px;
  }

  .tittle {
    font-size: 24px;
  }

  .content {
    font-size: 16px;
    line-height: 24px;

    .desktop-break {
      display: none;
    }
  }
}

@media (min-width: 1024px) {
  .featured_report {
    .title_content {
      .content {
        .desktop-break {
          display: inline;
        }
      }
    }
  }
}

@media (max-width: 1919px) {
  .featured_report {
    padding-top: 0;
    gap: 50px;
  }

  .title_content {
    gap: 12px;
    margin-bottom: 50px;
  }

  .tittle {
    font-size: 32px;
  }

  .content {
    font-size: 18px;
    line-height: 28px;
  }
}

@media (max-width: 1550px) {
  .featured_report {
    padding-top: 0;
    gap: 45px;
  }

  .title_content {
    gap: 10px;
    margin-bottom: 45px;
  }

  .tittle {
    font-size: 30px;
  }

  .content {
    font-size: 18px;
    line-height: 28px;
  }
}


</style>
