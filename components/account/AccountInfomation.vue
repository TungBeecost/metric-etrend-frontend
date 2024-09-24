<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue';
import { PLANCARD } from '~/constant/constains';
import moment from 'moment/moment';
import PlanCard from '~/components/account/PlanCard.vue';

interface Plan {
  code: string;
  name: string;
  description: string;
  background: string;
  backgroundButton: string;
  textColor: string;
  textButton: string;
  textColorButton: string;
  svg: string;
}

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const formatDate = (value: string | Date, format: string = 'DD/MM/YYYY', inputFormat: string = "YYYY-MM-DD[T]HH:mm:ss"): string => {
  return moment(value, inputFormat).format(format);
}

const trialPlanDefault = ref<Plan | null>(null);
const defaultPlan: Plan = {
  code: '',
  name: '',
  description: '',
  background: '',
  backgroundButton: '',
  textColor: '',
  textButton: '',
  textColorButton: '',
  svg: ''
};

const plan_card = ref<Plan>(defaultPlan);

watch(() => props.userInfo.current_plan.plan_code, (newPlanCode) => {
  trialPlanDefault.value = PLANCARD.find(plan => plan.code === newPlanCode) || null;
  plan_card.value = trialPlanDefault.value || defaultPlan;
}, { immediate: true });
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
          <img :src="props.userInfo.avatar" alt="user-avatar">
          <div class="basic_info_text">
            <div class="name">{{props.userInfo.first_name}} {{props.userInfo.last_name}}</div>
            <div class="email">{{props.userInfo.email}}</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="account_detail_info">
          <div class="account_detail_item">
            <div class="detail_info_title">Gói dịch vụ</div>
            <div class="detail_info_value">{{ props.userInfo.current_plan.plan_name || 'Community' }}</div>
          </div>
          <div v-if="props.userInfo.current_plan.expired_at && props.userInfo.current_plan.plan_code != 'e_community'" class="account_detail_item">
            <div class="detail_info_title">Ngày hết hạn</div>
            <div class="detail_info_value">{{ formatDate(props.userInfo.current_plan.expired_at)}}</div>
          </div>
          <div class="account_detail_item">
            <div class="detail_info_title">Số lượt xem báo cáo tổng quan</div>
            <div class="detail_info_value">{{ props.userInfo.current_plan.remain_claim || 0 }} lượt</div>
          </div>
          <div class="account_detail_item">
            <div class="detail_info_title">Số lượt xem báo cáo chi tiết</div>
            <div class="detail_info_value">{{ props.userInfo.current_plan.remain_claim_pdf || 0 }} lượt</div>
          </div>
        </div>
        <div class="service_info">
          <plan-card :plan="plan_card" />
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
    gap: 8px;
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
          //background-image: linear-gradient(90.12deg, #FCA14E 1.09%, #FF733F 99.22%);


          .plan-card-info{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;

            .plan-info{
              display: flex;
              width: 100%;
              justify-content: flex-start;
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
              height: 40px;
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


@media (max-width: 767px) {
  #account_info{
    .account_info_header{
      flex-direction: row;
    }
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
</style>