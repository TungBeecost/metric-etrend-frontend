<script setup lang="ts">
const user_info={
  "id": 118102,
  "email": "cuongld@metric.vn",
  "username": null,
  "first_name": "Duy Cương",
  "last_name": " Lê",
  "roles": [
    "market_staff"
  ],
  "first_login": "2024-01-16T06:38:28.205769Z",
  "last_login": "2024-06-28T08:39:23.10264Z",
  "end_query_time": "2025-04-09T23:59:59+07:00",
  "link_emails": [],
  "referral_code": "ED7710AB",
  "url_thumbnail": "https://lh3.googleusercontent.com/a/ACg8ocLuT_Lp5-BbPbpx7rXnF7zuJISm2mJkzRS63tBoZ7E5=s96-c",
  "maximum_devices": 3
}
</script>

<template>
  <div id="account_info" >
    <div class="account_info_header default_section">
      <svg data-v-ebf597eb="" width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;"><rect data-v-ebf597eb="" width="16" height="32" rx="4" fill="#EEEBFF"></rect></svg>
      <div class="account_info_header_title">Thông tin tài khoản</div>
    </div>
    <div class="account_info_content default_section">
      <div class="user_info">
        <div class="basic_info">
          <img :src="user_info.url_thumbnail" alt="user-avatar">
          <div class="basic_info_text">
            <div class="name">{{user_info.first_name}} {{user_info.last_name}}</div>
            <div class="email">{{user_info.email}}</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="account_detail_info">
          <div class="account_detail_item">
            <div class="detail_info_title">Gói dịch vụ</div>
            <div class="detail_info_value">Pro</div>
          </div>
          <div class="account_detail_item">
            <div class="detail_info_title">Ngày hết hạn</div>
            <div class="detail_info_value">26/05/2024</div>
          </div>
          <div class="account_detail_item">
            <div class="detail_info_title">Số lượt xem báo cáo chi tiết</div>
            <div class="detail_info_value">100 lượt</div>
          </div>
        </div>
        <div class="service_info">
          <div class="paid-plan plan-card">
            <div class="plan-card-info">
              <div class="plan-info">
                <svg data-v-c76b40c0="" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 68px;"><rect data-v-c76b40c0="" width="48" height="48" rx="24" fill="#FDEEE7"></rect><path data-v-c76b40c0="" opacity="0.2" d="M16.2077 31.5009C16.2077 31.5009 18.9977 29.8341 23.9983 29.8341C28.9989 29.8341 31.7888 31.5009 31.7888 31.5009L35.6435 19.688C35.6716 19.6078 35.6751 19.5209 35.6534 19.4387C35.6318 19.3565 35.586 19.2826 35.5221 19.2266C35.4581 19.1705 35.3788 19.1349 35.2945 19.1243C35.2101 19.1137 35.1245 19.1286 35.0486 19.1671L29.4823 21.9425C29.3859 21.9901 29.2752 21.9998 29.172 21.9697C29.0688 21.9396 28.9806 21.8719 28.9249 21.7799L24.365 14.2071C24.3269 14.1446 24.2733 14.0929 24.2094 14.0571C24.1456 14.0213 24.0736 14.0024 24.0004 14.0024C23.9272 14.0024 23.8552 14.0213 23.7913 14.0571C23.7274 14.0929 23.6739 14.1446 23.6357 14.2071L19.0716 21.7831C19.0161 21.8755 18.9278 21.9435 18.8243 21.9737C18.7207 22.0038 18.6097 21.9938 18.5132 21.9456L12.9552 19.1723C12.8793 19.1341 12.7938 19.1194 12.7095 19.13C12.6252 19.1407 12.5459 19.1763 12.482 19.2322C12.418 19.2881 12.3721 19.3619 12.3503 19.444C12.3284 19.5261 12.3316 19.6129 12.3593 19.6932L16.2077 31.5009Z" fill="#E85912"></path><path data-v-c76b40c0="" d="M16.2077 31.5009C16.2077 31.5009 18.9977 29.8341 23.9983 29.8341C28.9989 29.8341 31.7888 31.5009 31.7888 31.5009L35.6435 19.688C35.6716 19.6078 35.6751 19.5209 35.6534 19.4387C35.6318 19.3565 35.586 19.2826 35.5221 19.2266C35.4581 19.1705 35.3788 19.1349 35.2945 19.1243C35.2101 19.1137 35.1245 19.1286 35.0486 19.1671L29.4823 21.9425C29.3859 21.9901 29.2752 21.9998 29.172 21.9697C29.0688 21.9396 28.9806 21.8719 28.9249 21.7799L24.365 14.2071C24.3269 14.1446 24.2733 14.0929 24.2094 14.0571C24.1456 14.0213 24.0736 14.0024 24.0004 14.0024C23.9272 14.0024 23.8552 14.0213 23.7913 14.0571C23.7274 14.0929 23.6739 14.1446 23.6357 14.2071L19.0716 21.7831C19.0161 21.8755 18.9278 21.9435 18.8243 21.9737C18.7207 22.0038 18.6097 21.9938 18.5132 21.9456L12.9552 19.1723C12.8793 19.1341 12.7938 19.1194 12.7095 19.13C12.6252 19.1407 12.5459 19.1763 12.482 19.2322C12.418 19.2881 12.3721 19.3619 12.3503 19.444C12.3284 19.5261 12.3316 19.6129 12.3593 19.6932L16.2077 31.5009Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div class="plan_info_name">Mua gói dịch vụ</div>
              </div>
              <div class="plan_info_description">Mua gói dịch vụ để truy cập kho dữ liệu với hàng trăm báo cáo mới nhất ngay hôm nay</div>
              <a-button class="button">
                <span>Xem bảng giá</span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#account_info{
  .account_info_header{
    display: flex;
    padding: 24px;
    gap: 16px;
    border-radius: 12px 12px 0  0;
    border: 1px solid #EEEBFF;
    background-color: #FFF;

    .account_info_header_title{
      color: #241E46;
      font-size: 20px;
      font-weight: bold;
      line-height: 28px;
    }
  }
  .account_info_content{
    gap: 4px;
    border-radius: 0 0 16px 16px;
    border-right: 1px solid #EEEBFF;
    border-left: 1px solid #EEEBFF;
    border-bottom: 1px solid #EEEBFF;
    background-color: #FFF;

    .user_info{
      display: flex;
      justify-content: space-between;
      .basic_info{
        flex: 0.2;
        display: flex;
        padding: 24px;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        border-radius: 8px;

        img{
          border-radius: 10000px;
        }

        .basic_info_text{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: var(----spacing-xs, 4px);

          .name{
            color: #241E46;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            line-height: 26px;
          }

          .email{
            font-size: 14px;
            color: #716B95;
            text-align: center;
            line-height: 22px;
          }
        }
      }

      .line{
        width: 1px;
        background-color: #EEEBFF;
        margin-top: 24px;
        margin-bottom: 24px;
      }

      .account_detail_info{
        display: flex;
        flex: 0.4;
        flex-direction: column;
        gap: 16px;
        padding: 36px 16px 24px 16px;
        .account_detail_item{
          display: flex;
          justify-content: space-between;
          gap: 16px;

          .detail_info_title{
            font-size: 14px;
            color: #716B95;
            font-weight: 400;
            line-height: 22px;
          }

          .detail_info_value{
            font-size: 16px;
            color: #241E46;
            font-weight: bold;
            line-height: 24px;
          }
        }
      }

      .service_info{
        display: flex;
        padding: 36px;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        flex: 0.4;

        border-radius: 8px;

        .plan-card{
          display: flex;
          flex-direction: column;
          padding: 24px;
          align-items: flex-start;
          border-radius: 16px;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.07);

          .plan-card-info{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;

            .plan-info{
              display: flex;
              width: 100%;
              justify-content: flex-start;
              align-items: center;
              gap: 16px;

              .plan_info_name{
                font-size: 20px;
                color: #241E46;
                font-weight: bold;
                line-height: 28px;
              }
            }

            .plan_info_description{
              font-size: 16px;
              color: #716B95;
              line-height: 24px;
            }

            .button{
              display: flex;
              padding: 9px 16px;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 10px;
              border-radius: 8px;
              background-color: #E85912;
              width: 100%;

              span{
                text-align: center;
                color: #FFF;
                font-size: 14px;
                line-height: 22px;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 1919px) {
  .default_section {
    width: calc(100% - 600px);
    margin: 0 auto;
  }
}

@media (max-width: 1919px) {
  .default_section {
    width: calc(100% - 500px);
    margin: 0 auto;
  }
}

@media (max-width: 1439px) {
  .default_section {
    width: calc(100% - 300px);
    margin: 0 auto;
  }
}

@media (max-width: 1023px) {
  .default_section {
    width: calc(100% - 200px);
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .default_section {
    width: calc(100% - 100px);
    margin: 0 auto;
  }

  #account_info{

    .account_info_content{
      .user_info{
        flex-direction: column;

        .line{
          display: none;
        }

        .service_info{
          padding: 16px;
        }
      }
    }
  }
}

@media (max-width: 424px) {
  .default_section {
    width: calc(100% - 50px);
    margin: 0 auto;
  }
}
</style>