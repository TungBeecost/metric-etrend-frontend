<script setup>

const props = defineProps({
  currentState: {
    type: String,
    required: true,
  },
  POPUP_STATES: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <svg id="background"
       v-if="currentState !== POPUP_STATES.SUCCESSFULLY && currentState !== POPUP_STATES.VERIFICATION_SUCCESS && currentState !== POPUP_STATES.CONFIRMATION_FAILURE"
       :width="currentState !== POPUP_STATES.FORM ? '528' : '950'"
       :height="currentState !== POPUP_STATES.FORM ? '230' : '414'"
       viewBox="0 0 950 414"
       fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M-6.5183e-06 210V414H949.966L950 284.475L541.277 325.408L2.90002 210H-6.5183e-06Z" fill="url(#paint0_linear_1517_90944)"/>
    <g clip-path="url(#clip0_1517_90944)">
      <g opacity="0.06">
        <mask id="mask0_1517_90944" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-467" y="0" width="1415" height="414">
          <path d="M947.632 -7.55523e-06L947.632 413.771L-466.367 413.771" fill="white"/>
        </mask>
        <g mask="url(#mask0_1517_90944)">
          <path d="M966.637 51.3586L966.637 559.104L-768.516 559.104" fill="url(#paint1_linear_1517_90944)"/>
          <path d="M947.629 224.386L947.629 186.408L-787.523 694.162L-657.77 694.162L947.629 224.386Z" fill="url(#paint2_linear_1517_90944)"/>
          <path d="M947.631 331.171L947.631 231.412L-633.773 694.162L-292.837 694.162L947.631 331.171Z" fill="url(#paint3_linear_1517_90944)"/>
          <path d="M947.632 694.162L947.632 331.171L-292.836 694.162L947.632 694.162Z" fill="url(#paint4_linear_1517_90944)"/>
        </g>
      </g>
      <mask id="mask1_1517_90944" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="43" y="149" width="907" height="266">
        <path d="M43.0078 414.786L949.997 149.38L949.997 414.786L43.0078 414.786Z" fill="white"/>
      </mask>
      <g mask="url(#mask1_1517_90944)">
        <path d="M43.0078 414.786L949.997 149.381L949.997 414.786L43.0078 414.786Z" fill="url(#paint5_linear_1517_90944)"/>
        <path d="M949.997 189.784L949.997 149.381L43.0078 414.786L181.096 414.786L949.997 189.784Z" fill="url(#paint6_linear_1517_90944)"/>
        <path d="M949.997 266.672L949.997 246.82L43.0078 512.225L110.838 512.225L949.997 266.672Z" fill="url(#paint7_linear_1517_90944)"/>
        <path d="M949.606 322.152L949.606 270L122.992 511.886L301.202 511.886L949.606 322.152Z" fill="url(#paint8_linear_1517_90944)"/>
        <path d="M949.997 512.225L949.997 322.491L301.594 512.225L949.997 512.225Z" fill="url(#paint9_linear_1517_90944)"/>
      </g>
    </g>
    <defs>
      <linearGradient id="paint0_linear_1517_90944" x1="711.162" y1="302.933" x2="375.893" y2="303.986" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF733F"/>
        <stop offset="1" stop-color="#FCA14E"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1517_90944" x1="-768.516" y1="305.235" x2="966.637" y2="305.235" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF9E3E"/>
        <stop offset="1" stop-color="#F5712D"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1517_90944" x1="-787.524" y1="440.285" x2="947.629" y2="440.284" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFFF00" stop-opacity="0.2"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint3_linear_1517_90944" x1="-633.774" y1="462.783" x2="947.631" y2="462.782" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFFF00" stop-opacity="0.2"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint4_linear_1517_90944" x1="520.428" y1="587.052" x2="652.201" y2="349.565" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0"/>
        <stop offset="1" stop-color="white" stop-opacity="0.1"/>
      </linearGradient>
      <linearGradient id="paint5_linear_1517_90944" x1="43.0078" y1="282.087" x2="949.997" y2="282.087" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF9E3E"/>
        <stop offset="1" stop-color="#F5712D"/>
      </linearGradient>
      <linearGradient id="paint6_linear_1517_90944" x1="43.0078" y1="282.087" x2="949.997" y2="282.087" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0"/>
        <stop offset="1" stop-color="white" stop-opacity="0.1"/>
      </linearGradient>
      <linearGradient id="paint7_linear_1517_90944" x1="43.0078" y1="379.526" x2="949.997" y2="379.526" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFFF00" stop-opacity="0.2"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint8_linear_1517_90944" x1="122.992" y1="390.943" x2="949.606" y2="390.943" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFFF00" stop-opacity="0.2"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint9_linear_1517_90944" x1="726.693" y1="456.236" x2="795.578" y2="332.102" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0"/>
        <stop offset="1" stop-color="white" stop-opacity="0.1"/>
      </linearGradient>
      <clipPath id="clip0_1517_90944">
        <rect width="901" height="414" fill="white" transform="matrix(-1 0 0 1 950 0)"/>
      </clipPath>
    </defs>
  </svg>
</template>

<style scoped lang="scss">

</style>
