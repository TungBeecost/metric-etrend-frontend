<script setup lang="ts">
import {INFORMATION_PRICING} from "~/constant/constains";
const config = useRuntimeConfig();
const prefixResource = config.public.BASE_PATH !== '/' ? config.public.BASE_PATH : '';
</script>

<template>
  <div id="information_pricing">
    <div class="information_pricing_container default_section">
      <div v-for="(item, index) in INFORMATION_PRICING" :key="index" class="pricing-item">
        <img loading="lazy" style="width: 64px; height: 64px" :src="item.thumbnail" alt="icon" class="thumbnail" />
        <div class="container_content">
          <h3 class="title">{{ item.title }}</h3>
          <p class="content">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#information_pricing{
  padding: 80px 0;
  background: #FBFAFC;

  .information_pricing_container{
    display: flex;
    gap: 40px;

    .pricing-item{
      display: flex;
      flex-direction: column;
      padding: 0 24px;
      justify-content: center;
      align-items: center;
      gap: 40px;

      .container_content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;

        .title{
          color: #241E46;
          font-size: 24px;
          font-weight: 700;
          line-height: 32px;
        }

        .content{
          color: #716B95;
          text-align: center;
          line-height: 24px;
          font-size: 16px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  #information_pricing{
    .information_pricing_container{
      flex-direction: column;
      gap: 40px;

      .pricing-item{
        padding: 16px 40px;
        gap: 24px;

        .container_content{
          gap: 12px;
          .title{
            font-size: 20px;
            line-height: 28px;
          }

          .content{
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>