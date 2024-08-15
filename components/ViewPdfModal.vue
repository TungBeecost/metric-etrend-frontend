<script setup>
import {onMounted, ref} from 'vue';
import {NAVIGATIONS} from "~/constant/constains";
import {useCurrentUser} from "~/stores/current-user.js"
import {useRoute} from "vue-router";

const isDesktop = ref(true);
const route = useRoute();
const {showAlert, isReportPdfValid} = defineProps({
  showAlert: {
    type: Boolean,
    default: false
  },
  isReportPdfValid: {
    type: Boolean,
    default: false
  }
});
onMounted(() => {
  isDesktop.value = window?.innerWidth >= 768;
});

const emits = defineEmits(["update:showAlert"]);


const currentUser = useCurrentUser();

const loading = ref(false);

message.config({
  top: '100px',
  duration: 2,
  maxCount: 3,
});

const handleView = async () => {
  try {
    loading.value = true;
    await currentUser.viewPdfReport(route.params.slug);
    loading.value = false;
    if(isReportPdfValid) {
      navigateTo(`${NAVIGATIONS.home}view_pdf/${route.params.slug}`);
    }
    else{
      emits('update:showAlert', false);
      message.success('Link báo cáo sẽ được gửi qua email trong 5 phút');
    }
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};

const toggleUnlock = () => {
  emits('update:showAlert', false);
}

</script>

<template>
  <a-modal
      :visible="showAlert"
      :footer="null"
      @cancel="toggleUnlock"
      @ok="toggleUnlock"
  >
    <div class="unlock-report-modal">
      <div v-if="currentUser.remainingUnlock">
        <div style="text-align: center;">
          <NuxtImg src="/icons/DeptReportAlert.svg" class="unlock-icon"/>
        </div>

        <div class="content">
          <div class="header">Xác nhận xem báo cáo</div>
          <div class="description">
            Bạn có chắc chắn muốn sử dụng xem Báo cáo chuyên sâu <b>trong vòng 7 ngày </b> không?
          </div>
        </div>
      </div>
      <div class="unlock-report-modal-footer">
        <AButton style="width: 100%;" size="large" class="optionBtn" @click="toggleUnlock">Huỷ</AButton>
        <AButton v-if="currentUser.remainingUnlock" style="width: 100%;" size="large" type="primary" class="optionBtn"
                 @click="handleView">
          Xem báo cáo
        </AButton>
        <AButton v-else style="width: 100%;" size="large" type="primary" class="optionBtn"
                 @click="navigateTo(NAVIGATIONS.pricing)">
          Mua ngay
        </AButton>
      </div>
    </div>
  </a-modal>

</template>

<style scoped lang="scss">

.unlock-report-modal {
  font-family: Inter, Montserrat, sans-serif;

  .unlock-icon {
    width: 212px;

    margin: 0 auto 32px;
  }

  .content {
    text-align: center;

    margin-bottom: 24px;

    display: flex;
    flex-direction: column;

    gap: 12px;

    .remaining-unlock {
      color: #241E46;
      text-align: center;

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }

    .header {
      color: var(--Dark-blue-dark-blue-8, #241E46);
      text-align: center;

      font-size: 24px;
      font-weight: 700;
      line-height: 38px;
    }

    .description {
      color: #716B95;
      text-align: center;

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;

      .highlight {
        color: #E85912;

        font-weight: 500;
      }

      .report-name {
        color: var(--Dark-blue-dark-blue-8, #241E46);

        font-weight: 500;
      }
    }
  }

  .unlock-report-modal-footer {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}

@media (min-width: 768px) {
  .chart-mask {
    padding: 5% 10%;

    .chart-mask-content {
      .title {
        font-size: 24px;
        line-height: 28px;
      }
    }
  }
}
</style>