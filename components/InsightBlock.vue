<template>
  <div class="insight-block">

    <div class="insight-content">
      <div class="insight-title" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 9.75C0 4.365 4.365 0 9.75 0C15.135 0 19.5 4.365 19.5 9.75C19.5 15.135 15.135 19.5 9.75 19.5C4.365 19.5 0 15.135 0 9.75ZM8.706 8.308C9.852 7.735 11.143 8.771 10.832 10.014L10.123 12.85L10.165 12.83C10.3412 12.7525 10.5405 12.7458 10.7215 12.8112C10.9026 12.8765 11.0516 13.009 11.1377 13.1812C11.2237 13.3533 11.2403 13.552 11.184 13.7361C11.1277 13.9202 11.0027 14.0755 10.835 14.17L10.795 14.192C9.648 14.765 8.357 13.729 8.668 12.486L9.378 9.65L9.336 9.67C9.24754 9.71916 9.15004 9.74991 9.04938 9.7604C8.94872 9.77089 8.84697 9.76089 8.75028 9.73102C8.65358 9.70114 8.56393 9.65201 8.48673 9.58657C8.40952 9.52113 8.34636 9.44074 8.30105 9.35025C8.25573 9.25975 8.2292 9.16102 8.22305 9.06001C8.2169 8.95899 8.23126 8.85777 8.26527 8.76244C8.29927 8.66712 8.35222 8.57967 8.42092 8.50535C8.48961 8.43103 8.57264 8.37138 8.665 8.33L8.706 8.308ZM9.75 6.75C9.94891 6.75 10.1397 6.67098 10.2803 6.53033C10.421 6.38968 10.5 6.19891 10.5 6C10.5 5.80109 10.421 5.61032 10.2803 5.46967C10.1397 5.32902 9.94891 5.25 9.75 5.25C9.55109 5.25 9.36032 5.32902 9.21967 5.46967C9.07902 5.61032 9 5.80109 9 6C9 6.19891 9.07902 6.38968 9.21967 6.53033C9.36032 6.67098 9.55109 6.75 9.75 6.75Z"
            fill="#70A3F3"
          />
        </svg>
        Kết luận
      </div>
      <ul>
        <slot/>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.insight-block {
  padding: 12px 16px;

  border-radius: 8px;
  border: 1px solid var(--blue-blue-3, #9CCFFF);
  background: var(--blue-blue-1, #E8F4FF);

  .insight-content {
    .insight-title {
      color: var(--gray-900, #101828);

      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;

    }

    ul {
      list-style: inside;
      padding-left: 16px;

      margin-bottom: 0;

      li {
        font-family: 'Inter', sans-serif;

        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;

        color: #332D59;

        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }

        span.text-bold {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
