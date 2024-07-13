<script setup lang="ts">

const emit = defineEmits(['tagClicked']);

// const tags = defineModel<string[]>("tags");

const props = defineProps({
  tags: {
    type: Array as () => string[],
    default: () => [],
  },
});

const onTagClick = (tag: string) => {
  emit('tagClicked', tag);
};
</script>
<template>
  <div class="popular_relate_keywords">
    <div class="title">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="#FDEEE7"/>
        <g clip-path="url(#clip0_2031_74552)">
          <path opacity="0.2"
                d="M9.30781 16.8078C9.19082 16.6907 9.12508 16.5319 9.125 16.3664V9.125H16.3664C16.5319 9.12508 16.6907 9.19082 16.8078 9.30781L24.5672 17.0672C24.6843 17.1844 24.7501 17.3433 24.7501 17.509C24.7501 17.6747 24.6843 17.8336 24.5672 17.9508L17.9531 24.5672C17.8359 24.6843 17.677 24.7501 17.5113 24.7501C17.3456 24.7501 17.1867 24.6843 17.0695 24.5672L9.30781 16.8078Z"
                fill="#E85912"/>
          <path
              d="M9.30781 16.8078C9.19082 16.6907 9.12508 16.5319 9.125 16.3664V9.125H16.3664C16.5319 9.12508 16.6907 9.19082 16.8078 9.30781L24.5672 17.0672C24.6843 17.1844 24.7501 17.3433 24.7501 17.509C24.7501 17.6747 24.6843 17.8336 24.5672 17.9508L17.9531 24.5672C17.8359 24.6843 17.677 24.7501 17.5113 24.7501C17.3456 24.7501 17.1867 24.6843 17.0695 24.5672L9.30781 16.8078Z"
              stroke="#E85912" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path
              d="M12.5625 13.5C13.0803 13.5 13.5 13.0803 13.5 12.5625C13.5 12.0447 13.0803 11.625 12.5625 11.625C12.0447 11.625 11.625 12.0447 11.625 12.5625C11.625 13.0803 12.0447 13.5 12.5625 13.5Z"
              fill="#E85912"/>
        </g>
        <defs>
          <clipPath id="clip0_2031_74552">
            <rect width="20" height="20" fill="white" transform="translate(6 6)"/>
          </clipPath>
        </defs>
      </svg>
      <div style="font-size: 20px" class="title_content">
        Từ khoá phổ biến liên quan
      </div>
    </div>
    <div class="list_keywords">
      <div
          v-for="keyword in tags"
          :key="keyword"
          class="keyword"
          @click="onTagClick(keyword)"
      >
        {{ keyword }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popular_relate_keywords {
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border: 1px solid #EEEBFF;
  background: #FFF;
  border-radius: 16px;

  .title {
    display: flex;
    align-items: center;
    gap: 16px;

    .title_content {
      font-size: 16px;
      font-weight: bold;
      color: #241E46;
      line-height: 24px;
    }
  }

  .list_keywords {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 8px;
    flex-wrap: wrap;

    .keyword {
      display: flex;
      align-items: center;
      padding: 2px 10px;
      border-radius: 4px;
      justify-content: center;
      gap: 8px;
      border: 1px solid #9D97BF;
      font-size: 12px;
      font-weight: 500;
      color: #241E46;
      line-height: 20px;
      cursor: pointer;
      height: 30px;
    }
  }
}
</style>