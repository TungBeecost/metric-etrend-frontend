<script setup lang="ts">
</script>

<template>
<div class="highlight_container">
  <div class="highlight_format default_section">
    <div class="highlight_image">
      <img loading="lazy" src="~/public/images/image_highlight.png" alt="highlight_image">
    </div>
    <div class="highlight_content">
      <p class="title">Các số liệu nổi bật của eReport</p>
      <div class="content">
        <p>
          <span class="data_content">4 sàn </span>
          <span>TMĐT lớn nhất VN</span>
        </p>
        <p>
          <span class="data_content">3 triệu + </span>
          <span>Nhà bán hoạt động</span>
        </p>
        <p>
          <span class="data_content">150 nghìn + </span>
          <span>Thương hiệu</span>
        </p>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.highlight_container{
  background: linear-gradient(73deg, #FFF4EF 0%, rgba(255, 244, 239, 0.00) 100%);

  .highlight_format{
    display: flex;
    padding: 80px 80px 80px 0px;
    gap: 100px;
    align-items: center;

    .highlight_content{
      display: flex;
      flex-direction: column;
      gap: 60px;

      .title{
        color: var(--Dark-blue-dark-blue-8, #241E46);
        font-size: 44px;
        font-weight: 700;
        line-height: 56px;
      }

      .content{
        display: flex;
        flex-direction: column;
        gap: 40px;
      }
    }
  }

}

.data_content{
  font-size: 44px;
  font-weight: 700;
  line-height: 56px;
  background: var(--Gradient-2, linear-gradient(90deg, #FF6931 1.09%, #FF9839 99.23%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 767px) {
  .highlight_container{
    display: none;
  }
}
</style>