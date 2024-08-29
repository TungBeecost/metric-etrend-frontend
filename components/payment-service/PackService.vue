<script setup lang="ts">
import { ref, computed } from 'vue';
import {CaretDownOutlined, CaretUpOutlined} from "#components";

const { plan } = defineProps({
  plan: {
    type: Object,
    required: true
  }
});

const showMore = ref(false);

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const toggleIcon = computed(() => showMore.value ? CaretUpOutlined : CaretDownOutlined);
</script>

<template>
  <div
      id="pack_service"
      class="border statistic-block"
  >
    <div class="statistic-item__title">
      <div class="title">
        <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="32" rx="4" fill="#EEEBFF"/>
        </svg>
        <div>
          <div class="title_content">Dịch vụ</div>
        </div>
      </div>
      <div class="title_link">
        <a href="/pricing">Đổi gói dịch vụ</a>
      </div>
    </div>
    <div class="statistic-item__content">
      <div class="content">
        <div class="summary">
          <div class="planType"> Gói {{ plan.type }}</div>
          <div class="planDesc">{{ plan.description }}</div>
        </div>

        <div class="divider"/>

        <div class="permission">
          <p class="includeLabel">Bao gồm:</p>
          <div v-show="showMore" class="permissionList">
            <div v-for="(permission, index) in plan.permissions" :key="index" class="permissionItem">
              <div class="perm">
                <CustomIcon :type="permission.icon as any" :is-custom-size="true" class="permissionIcon"/>
                <div>{{ permission.label }}</div>
              </div>
              <div v-for="(subPerm, subIndex) in permission.sub" :key="subIndex" class="perm subPerm">
                <CustomIcon type="Tick" :is-custom-size="true" class="permissionIcon"/>
                <div>{{ subPerm }}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: center">
          <a-button style="width: fit-content" @click="toggleShowMore">
            {{ showMore ? 'Ẩn bớt' : 'Xem thêm' }}
            <component :is="toggleIcon" />
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#pack_service {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid #EEEBFF;
  background-color: #FFF;

  .statistic-item__title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EEEBFF;
    padding: 24px;

    .title {
      display: flex;
      align-items: center;
      gap: 16px;

      .title_content {
        font-size: 24px;
        color: #241E46;
        font-weight: bold;
        line-height: 38px;
      }
    }

    .title_link {
      display: flex;
      align-items: center;

      a {
        font-size: 16px;
        color: #1890FF;
        font-weight: 400;
        line-height: 22px;
        text-decoration: none;
      }
    }
  }

  .statistic-item__content {
    padding: 24px;
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 24px;
      flex: 1 0 0;

      .summary {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .planType {
          font-size: 20px;
          font-weight: 700;
          line-height: 28px;
          margin-bottom: 8px;
        }

        .planDesc {
          color: $lighter_text_color;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }

      .divider {
        height: 1px;
        background: $divider;
      }

      .permission {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        flex: 1 0 0;

        .includeLabel {
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
        }

        .permissionList {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;

          .permissionItem {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;

            font-size: 14px;
            font-weight: 400;
            line-height: 22px;

            .permissionIcon {
              width: 16px;
              height: 16px;
            }

            .perm {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .subPerm {
              margin-left: 16px;
            }
          }
        }
      }
    }
  }
}
</style>