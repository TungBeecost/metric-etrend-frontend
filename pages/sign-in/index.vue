<script setup>
// definePageMeta({
//   layout: "auth",
// })

const redirectUrl = useState("redirectUrl", () => "");
const closeTab = useState("closeTab", () => true);
const route = useRoute();
redirectUrl.value = route.query.redirectUrl || "";
closeTab.value = route.query.closeTab === "1";

const authStore = useCurrentUser();

onMounted(() => {
  if (authStore.isLogin) {
    if (closeTab.value) {
      window.close();
    } else if (redirectUrl.value) {
      window.location.href = redirectUrl.value;
    }
  }
})
</script>

<template>
  <div class="login-wrapper">
    <div class="content">
      <div class="logo">
        <!--        <logo-slogan />-->
      </div>
      <div class="login-form">
        <google-login-button/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-wrapper {
  height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80%;

    .logo {
      margin-bottom: 20px;
    }

    .login-form {
    }
  }
}
</style>
