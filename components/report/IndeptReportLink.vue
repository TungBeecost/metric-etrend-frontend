<script setup lang="ts">
import { NAVIGATIONS } from "~/constant/constains";
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

const handleClick = () => {
  router.push(`${NAVIGATIONS.home}view_pdf/${props.slug}`);
}
</script>

<template>
  <div class="dept_report_link">
    <div class="thumnail">
      <img class="img_1" src="/images/dept_report_thumbnail/image 619.png" alt="thumnail">
      <img class="img_2" src="/images/dept_report_thumbnail/image 620.png" alt="thumnail">
    </div>
    <a-button style="width: 100%; height: 40px" type="primary" class="btn" @click="handleClick">Báo cáo chuyên sâu</a-button>
  </div>
</template>

<style scoped lang="scss">
.dept_report_link {
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 400px;

  .thumnail {
    position: relative;
    width: 100%;

    .img_1 {
      width: 80%;
      border-radius: 8px;
      top: 0;
      left: 0;
      position: absolute;
    }

    .img_2 {
      width: 80%;
      border-radius: 8px;
      right: 0;
      top: 60px;
      position: absolute;
    }
  }
}
</style>