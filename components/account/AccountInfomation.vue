<script setup lang="ts">
import { ref, watch } from 'vue';
import { PLANCARD } from '~/constant/constains';
import moment from 'moment/moment';
import PlanCard from '~/components/account/PlanCard.vue';
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";

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
  loading: {
    type: Boolean,
    default: true,
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

const remainClaimText = computed(() => {
  return props.userInfo.current_plan.remain_claim > 5000 ? 'Không giới hạn' : `${props.userInfo.current_plan.remain_claim || 0} lượt`;
});

const showPersonalDiscount = computed(() => {
  return props.userInfo.list_personal_discount.length > 0;
});

const handdleCoppy = () => {
  trackEventCommon(EVENT_TYPE.COPY_REFERRAL_CODE, 'copy_referral_code', '');
  const el = document.createElement('textarea');
  el.value = props.userInfo.list_personal_discount.join(', ');
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  message.success('Đã sao chép mã giới thiệu');
}
</script>

<template>
  <div id="account_info" >
    <div class="account_info_header default_section">
      <svg data-v-ebf597eb="" width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;"><rect data-v-ebf597eb="" width="16" height="32" rx="4" fill="#EEEBFF"></rect></svg>
      <div class="account_info_header_title">Thông tin tài khoản</div>
    </div>
    <a-skeleton v-if="loading" class="default_section" :paragraph="{ rows: 7 }"/>
    <div v-else class="account_info_content default_section">
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
            <div class="detail_info_title">
              Số lượt xem báo cáo tổng quan
              <a-tooltip color=#FFF>
                <template #title>
                  <div style="color: black">Lưu ý</div>
                  <div style="color: #716B95; border-top: 1px solid #EEEBFF; padding-top: 6px; margin-top: 6px"> Mỗi lượt xem báo cáo có hiệu lực 24h
                  </div>
                </template>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.875 0C3.91082 0 2.96829 0.285914 2.1666 0.821586C1.36491 1.35726 0.740067 2.11863 0.371089 3.00942C0.00211226 3.90021 -0.094429 4.88041 0.093674 5.82607C0.281777 6.77172 0.746076 7.64036 1.42786 8.32215C2.10964 9.00393 2.97828 9.46823 3.92394 9.65633C4.86959 9.84443 5.84979 9.74789 6.74058 9.37891C7.63137 9.00994 8.39275 8.38509 8.92842 7.5834C9.46409 6.78171 9.75 5.83918 9.75 4.875C9.74864 3.58249 9.23458 2.34331 8.32064 1.42936C7.4067 0.515418 6.16751 0.00136492 4.875 0ZM4.6875 2.25C4.79875 2.25 4.90751 2.28299 5.00001 2.3448C5.09251 2.40661 5.16461 2.49446 5.20718 2.59724C5.24976 2.70002 5.2609 2.81312 5.23919 2.92224C5.21749 3.03135 5.16392 3.13158 5.08525 3.21025C5.00658 3.28891 4.90635 3.34249 4.79724 3.36419C4.68813 3.3859 4.57503 3.37476 4.47224 3.33218C4.36946 3.28961 4.28161 3.21751 4.2198 3.12501C4.15799 3.03251 4.125 2.92375 4.125 2.8125C4.125 2.66332 4.18427 2.52024 4.28975 2.41475C4.39524 2.30926 4.53832 2.25 4.6875 2.25ZM5.25 7.5C5.05109 7.5 4.86032 7.42098 4.71967 7.28033C4.57902 7.13968 4.5 6.94891 4.5 6.75V4.875C4.40055 4.875 4.30516 4.83549 4.23484 4.76516C4.16451 4.69484 4.125 4.59946 4.125 4.5C4.125 4.40054 4.16451 4.30516 4.23484 4.23484C4.30516 4.16451 4.40055 4.125 4.5 4.125C4.69891 4.125 4.88968 4.20402 5.03033 4.34467C5.17098 4.48532 5.25 4.67609 5.25 4.875V6.75C5.34946 6.75 5.44484 6.78951 5.51517 6.85983C5.58549 6.93016 5.625 7.02554 5.625 7.125C5.625 7.22446 5.58549 7.31984 5.51517 7.39017C5.44484 7.46049 5.34946 7.5 5.25 7.5Z" fill="#9D97BF"/>
                </svg>
              </a-tooltip>
            </div>
            <div class="detail_info_value">{{ remainClaimText }}</div>
          </div>
          <div v-if="props.userInfo.current_plan.remain_claim_pdf != 0" class="account_detail_item">
            <div class="detail_info_title">Số lượt xem báo cáo chi tiết</div>
            <div class="detail_info_value">{{ props.userInfo.current_plan.remain_claim_pdf || 0 }} lượt</div>
          </div>
          <div v-if="showPersonalDiscount" class="account_detail_item">
            <div class="detail_info_title">
              Mã giới thiệu
            </div>
            <div class="detail_info_value">
              <template v-if="props.userInfo.list_personal_discount.length <= 3">
                {{ props.userInfo.list_personal_discount.join(', ') }}
              </template>
              <template v-else>
                {{ props.userInfo.list_personal_discount.slice(0, 3).join(', ') + '...' }}
              </template>
              <span style="padding-left: 4px; cursor: pointer" @click="handdleCoppy">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_8829_53923)">
                    <path d="M10.5 10.5H13.5V2.5H5.5V5.5" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.5 5.5H2.5V13.5H10.5V5.5Z" stroke="#716B95" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_8829_53923">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
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
            display: flex;
            line-height: 22px;
            align-items: center;
            gap: 4px;
          }

          .detail_info_value{
            font-size: 16px;
            display: flex;
            color: #241E46;
            font-weight: bold;
            line-height: 24px;
            align-items: center;
            gap: 4px;
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
