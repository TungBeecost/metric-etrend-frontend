<template>
  <div id="khach-hang-tin-tuong-metric">
    <div class="main-slide">
      <div class="title">TIN DÙNG BỞI<br/> HÀNG NGHÌN DOANH NGHIỆP</div>
      <img
          src="https://lh3.googleusercontent.com/pw/AMWts8B4SDXnMFSi27oltRRqMs_OYS8WQrJ-SnHmIzXHy8QDIH84c_VHLZszNsjnEC2aeVIFL53bMs5qLxlZU6bDT3gEVF1LcMyIeShVeRqtxbqr1ftBXhVaJRVYtK9y9cLD7k3J0lAYWeowNOEq7f8Y8Ifg=w3024-h1560-s-no"
      />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
#khach-hang-tin-tuong-metric {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #241E46;

  .main-slide {
    width: 100%;
    height: 600px;
    padding: 41px 40px 18px;
    background-color: #fff;
    position: relative;

    .title {
      font-weight: 800;
      font-size: 24px;
      line-height: 48px;
      letter-spacing: -0.02em;
      color: #EE3324;
      margin-bottom: 36px;
    }

    img {
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: auto;
      max-height: 100%;
      object-fit: cover;
    }
  }
}

</style>
