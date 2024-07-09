<script setup>
import { useAuthStore } from '~/helpers/auth.js';

const authStore = useAuthStore()
const runtimeConfig = useRuntimeConfig();

onMounted(() => {
  google.accounts.id.initialize({
    client_id: '426000576581-0o4c24jbbcmi9mkiqs1kh87p50ki5f7n.apps.googleusercontent.com',
    callback: authStore.handleGoogleCredentialResponse,
  })
  google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      {
        type: 'standard',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'center',
        // width: 250
      }
  )
})
</script>

<template>
  <div class="login_container">
    <div class="logo">
      <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_117643)">
          <rect x="0.5" width="56" height="56" rx="8" fill="white"/>
          <path d="M14.9005 26.8031V50.3741H2.59192C2.22371 50.3741 1.90811 50.0686 1.90811 49.7122V18.7086L14.9005 26.8031Z" fill="#E48525"/>
          <path d="M20.683 22.6778V49.456C20.683 49.9651 21.1038 50.3214 21.5772 50.3214H32.8864C33.0442 50.3214 33.1494 50.2196 33.1494 50.0669V16.2123C33.1494 16.0087 32.939 15.9069 32.7812 16.0087L20.7882 22.4742C20.7356 22.5251 20.683 22.576 20.683 22.6778Z" fill="#F15D25"/>
          <path d="M39.4665 12.2436V49.6618C39.4665 50.0182 39.7821 50.3236 40.1503 50.3236H52.038V5.72726C52.038 5.62545 51.9328 5.57454 51.8276 5.62545L39.4665 12.2436Z" fill="#EE3324"/>
          <path d="M14.906 50.3734C14.8534 50.3734 14.7482 50.3734 14.6956 50.3225C14.5378 50.2206 14.4326 50.0679 14.4326 49.9152V26.9552L2.12399 19.1152C1.96619 19.0134 1.86098 18.8097 1.91359 18.6061C1.96619 18.4025 2.12399 18.2497 2.33439 18.2497L7.27886 17.7406C7.54187 17.7406 7.80487 17.7915 8.01527 17.8934L18.2198 24.3588C18.2724 24.4097 18.325 24.4097 18.3776 24.4606C18.4302 24.5625 18.4302 24.6134 18.4302 24.7152V47.3697C18.4302 47.7261 18.2724 48.0315 17.9568 48.2861L15.169 50.2715C15.1164 50.3225 15.0112 50.3734 14.906 50.3734ZM15.3794 26.9552V48.9988L17.4308 47.5225C17.4834 47.4715 17.4834 47.4206 17.4834 47.3697V25.5806L15.3794 26.9552ZM3.80721 19.0134L14.906 26.1406L17.1152 24.7152L7.48927 18.7079C7.43667 18.7079 7.43667 18.657 7.38406 18.657L3.80721 19.0134Z" fill="#E48525"/>
          <path d="M33.0482 50.2758C32.9956 50.2758 32.8904 50.2758 32.8378 50.2249C32.68 50.1231 32.5748 49.9704 32.5748 49.8176L32.6274 16.3704C32.6274 16.2176 32.7326 16.0649 32.8904 15.9631C33.0482 15.8613 33.206 15.8613 33.3638 15.9631L36.2569 17.5413C36.6251 17.7449 36.8355 18.1013 36.8355 18.5085V47.1704C36.8355 47.5267 36.6777 47.8322 36.3621 48.0867L33.3638 50.174C33.2586 50.2249 33.1534 50.2758 33.0482 50.2758ZM33.5742 17.1849L33.5216 48.9013L35.7309 47.374C35.7835 47.3231 35.7835 47.2722 35.7835 47.2213V18.5085C35.7835 18.4576 35.7308 18.4067 35.6782 18.3558L33.5742 17.1849Z" fill="#F15D25"/>
          <path d="M52.0897 50.3286C52.0371 50.3286 51.9319 50.3286 51.8793 50.2777C51.7215 50.1759 51.6163 50.0232 51.6163 49.8705V6.03773C51.6163 5.83409 51.7215 5.68136 51.9319 5.63045C52.0897 5.57954 52.3001 5.57954 52.4579 5.73227L55.7192 8.78682C55.9296 8.99045 56.0874 9.29591 56.0874 9.60136V47.2741C56.0874 47.6305 55.877 47.9868 55.5614 48.1905L52.3527 50.2777C52.2475 50.3286 52.1423 50.3286 52.0897 50.3286ZM52.5631 7.15773V49.005L54.9828 47.4268C55.0354 47.3759 55.088 47.325 55.088 47.2741V9.60136C55.088 9.55045 55.088 9.49954 55.0354 9.44864L52.5631 7.15773Z" fill="#EE3324"/>
        </g>
        <defs>
          <clipPath id="clip0_1_117643">
            <rect x="0.5" width="56" height="56" rx="8" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="container">
      <div class="title_login">
        <div class="title">
          Đăng nhập
        </div>
        <div class="description">
          Đăng nhập nhanh bằng tài khoản Google của bạn
        </div>
      </div>
      <div class="button_login">
        <div id="googleButton" style="display: flex;"></div>
        <div>
          <div class="conent_login">
            Bằng việc <b>Đăng nhập/đăng ký</b>, bạn đồng ý với
          </div>
          <div class="title_rules">
            <a href="#">Điều khoản sử dụng</a> của Metric eReport
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
#googleButton {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .google-logo {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .google-text {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

}

.login_container{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .title_login{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .title {
        color: #241E46;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        line-height: 38px;
      }

      .description {
        color: #241E46;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }
    }

    .button_login{
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 16px;
      color: #241E46;
    }
  }
}
</style>
