<script setup lang="ts">
import {useCurrentUser} from "~/stores/current-user"
import {ref} from "vue";
import {WALLET} from "~/constant/constains";

const currentUserStore = useCurrentUser();
const open = ref<boolean>(false);
const showUnlock = ref(false);

const reports = [
  {
    name: 'Báo cáo 1',
    url_thumbnail: '/images/dept_report_thumbnail/image 6.png',
  },
  // {
  //   name: 'Báo cáo 2',
  //   url_thumbnail: 'https://via.placeholder.com/150',
  // },
  // {
  //   name: 'Báo cáo 3',
  //   url_thumbnail: 'https://via.placeholder.com/150',
  // },
  // {
  //   name: 'Báo cáo 4',
  //   url_thumbnail: 'https://via.placeholder.com/150',
  // },
  // {
  //   name: 'Báo cáo 5',
  //   url_thumbnail: 'https://via.placeholder.com/150',
  // },
  // {
  //   name: 'Báo cáo 6',
  //   url_thumbnail: 'https://via.placeholder.com/150',
  // },
];

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

const showModal = () => {
  open.value = true;
};

</script>

<template>
  <div class="unlock-report">
    <div class="unlock-report-title">
      Truy cập kho dữ liệu với hàng trăm báo cáo mới nhất
    </div>
    <div class="advantages">
      <div class="advantage-item">
        <div class="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g id="Icon/Outline" clip-path="url(#clip0_2078_225208)">
              <path id="Vector" d="M2.5 9L6 12.5L14 4.5" stroke="#2EB553" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2078_225208">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        Số liệu chính xác, khách quan, cập nhật bằng công nghệ Big Data
      </div>
      <div class="advantage-item">
        <div class="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g id="Icon/Outline" clip-path="url(#clip0_2078_225208)">
              <path id="Vector" d="M2.5 9L6 12.5L14 4.5" stroke="#2EB553" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2078_225208">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        Thông tin trực quan, dễ theo dõi
      </div>
      <div class="advantage-item">
        <div class="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g id="Icon/Outline" clip-path="url(#clip0_2078_225208)">
              <path id="Vector" d="M2.5 9L6 12.5L14 4.5" stroke="#2EB553" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2078_225208">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        Dễ dàng lưu trữ
      </div>
    </div>
    <div class="action-btns">
      <div class="button" style="display: flex; gap: 12px; width: 100%">
        <NuxtLink to="/pricing" style="width: 100%;">
          <a-button style="width: 100%;" type="primary" size="large">Xem báo cáo</a-button>
        </NuxtLink>
          <a-button style="width: 100%;" size="large" @click="showModal">Báo cáo chuyên sâu</a-button>
      </div>
      <div>
        Đã có tài khoản?
        <a @click="currentUserStore.setShowPopupLogin(true)">
          Đăng nhập ngay
        </a>
      </div>
    </div>
  </div>
  <a-modal v-model:open="open" title="Basic Modal" width="1000px" @ok="handleOk">
    <div class="noti_view_dept_report">
      <div class="slide_thumbnail">
        <Carousel :items-to-show="1" :items-to-scroll="1" :wrap-around="true"
                  style="width: 100%;" :snap-align="'start'">
          <Slide v-for="report in reports" v-bind="report" :key="report.name">
            <div class="slide-item">
              <div class="thumbnail">
                <img :src="report.url_thumbnail" alt="" style="width: 100%; object-fit: cover">
              </div>
            </div>
          </Slide>
          <template #addons>
            <navigation/>
            <pagination/>
          </template>
        </Carousel>
      </div>
      <div class="summary">
        <div class="title_container">
          <div class="title_report">Báo cáo chuyên sâu</div>
          <div>
            <p>Nhóm hàng Dép Nam</p>
            <ul>
              <li>Số liệu sàn: Shopee, Tiki, Lazada</li>
              <li>Từ 01-07-2023 đến 30-06-2024</li>
            </ul>
          </div>
        </div>
        <div class="payment_container">
          <div class="price">
            <p class="price_real">1600000đ</p>
            <p class="price_discount">2500000đ</p>
          </div>
          <div class="note">
            Nhận báo cáo qua email trong vòng 05 phút
          </div>
          <a-button type="primary" style="width: 100%; height: 40px" class="download_report_button">Tải báo cáo</a-button>
          <div class="wallet_info">
            <p>Hỗ trợ thanh toán trực tuyến</p>
            <div v-for="wallet in WALLET" :key="wallet.code">
              <img style="width: 100px; height: 100px" :src="wallet.thumbnail" alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>

  <ModalUnlock v-model:showUnlock="showUnlock"/>
</template>

<style scoped lang="scss">
.unlock-report {
  display: flex;
  padding: var(----spacing-3xl, 24px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(----spacing-3xl, 24px);
  align-self: stretch;

  border-radius: 16px;
  background: var(--Neutral-neutral-1, #FFF);

  box-shadow: 0px 4px 24px 0px rgba(157, 151, 191, 0.35);

  .unlock-report-title {
    color: var(--Dark-blue-dark-blue-8, #241E46);

    font-family: Inter, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }

  .advantages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(----spacing-lg, 12px);

    .advantage-item {
      display: flex;
      padding: var(----spacing-xxs, 2px) 0px 8px 0px;
      align-items: flex-start;
      gap: 8px;
    }
  }

  .action-btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(----spacing-lg, 12px);
    align-self: stretch;


    font-family: Inter, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    a {
      color: var(--Volcano-volcano-6, #E85912);
    }
  }
}

.noti_view_dept_report{
  display: flex;

  .slide_thumbnail{
    padding: 0 40px;
    flex: 0.6;
  }

  .summary{
    display: flex;
    flex: 0.4;
    flex-direction: column;
    justify-content: space-between;
    gap: 64px;

    .title_container{
      display: flex;
      flex-direction: column;
      gap: 20px;

      .title_report{
        color: #E85912;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
      }

      div{
        display: flex;
        flex-direction: column;
        gap: 8px;

        p{
          color: #241E46;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
        }

        ul{
          li{
            text-align: center;
            color: #716B95;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }

        }
      }

    }

    .payment_container{
      display: flex;
      flex-direction: column;
      gap: 16px;

      .price{
        .price_real{
          color: #E85912;
          font-size: 36px;
          font-weight: 700;
          text-align: center;
        }

        .price_discount{
          color: #716B95;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          text-decoration-line: line-through;
        }
      }
    }

  }
}

@media (max-width: 768px) {
  .unlock-report {
    .unlock-report-title {
      font-size: 20px;
    }
  }
}
</style>
