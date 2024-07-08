<script setup>
import {onMounted, ref} from 'vue';
import {NAVIGATIONS} from "~/constant/constains";
import {useCurrentUser} from "~/stores/current-user.js"

const isDesktop = ref(true);

onMounted(() => {
  isDesktop.value = window.innerWidth >= 768;
});

const emits = defineEmits(["update:showUnlock"]);


const currentUser = useCurrentUser();

const unlockReport = async () => {
  await currentUser.unlockReport('123');

  // if nothing wrong
  reloadNuxtApp();
}

const {showUnlock} = defineProps({
  showUnlock: {
    type: Boolean,
    default: false
  }
});


const toggleUnlock = () => {
  emits('update:showUnlock', false);
}

</script>

<template>
  <a-modal
      :visible="showUnlock"
      :footer="null"
      @cancel="toggleUnlock"
      @ok="toggleUnlock"
  >
    <div class="unlock-report-modal">
      <div v-if="currentUser.remainingUnlock">
        <div style="text-align: center;">
          <NuxtImg src="/images/Unlock-Document.png" class="unlock-icon"/>
        </div>

        <div class="content">
          <div class="remaining-unlock">
            Số lượt xem hiện tại: {{ currentUser.remainingUnlock }}
          </div>
          <div class="header">Xác nhận xem báo cáo</div>
          <div class="description">
            Bạn có chắc chắn muốn sử dụng
            <span class="highlight">01 lượt xem</span>
            trong vòng 24 giờ cho
            <span class="report-name">
              Túi xách nữ - Báo cáo xu hướng thị trường sàn TMĐT
            </span>
            không?
          </div>
        </div>
      </div>
      <div v-else>
        <div style="text-align: center;">
          <NuxtImg src="/images/Unlock-Document-faded.svg" class="unlock-icon"/>
        </div>

        <div class="content">
          <div class="remaining-unlock">
            Số lượt xem hiện tại: {{ currentUser.remainingUnlock }}
          </div>
          <div class="header">Hết lượt xem báo cáo</div>
          <div class="description">
            Mua thêm gói dịch vụ để tiếp tục xem báo cáo chi tiết
          </div>
        </div>
      </div>
      <div class="unlock-report-modal-footer">
        <AButton style="width: 100%;" size="large" class="optionBtn" @click="toggleUnlock">Huỷ</AButton>
        <AButton v-if="currentUser.remainingUnlock" style="width: 100%;" size="large" type="primary" class="optionBtn"
                 @click="unlockReport">
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