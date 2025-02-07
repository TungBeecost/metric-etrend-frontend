<template>
  <div>
    <div class="section sectionPricing">
      <div class="bg">
        <img src="/images/background-search.png" class="background">
      </div>
      <Plans />
    </div>
    <div class="section sectionPartner">
      <Parters />
    </div>
    <div class="compareFeature default_section">
      <CompareFeature />
    </div>
    <ContactUs />
<!--    <affiliate-component/>-->
  </div>
</template>

<script setup lang="ts">
import { PAGE_TITLES } from '~/constant/constains';
import {onMounted} from "vue";
import {trackEventCommon} from "~/services/tracking/TrackingEventService";
import {EVENT_TYPE} from "~/constant/general/EventConstant";
import CompareFeature from "~/components/pricing/CompareFeature.vue";

useSeoMeta({
  title: PAGE_TITLES.pricing
})

onMounted(() => {
  trackEventCommon(EVENT_TYPE.VIEW_PRICING, 'view_pricing', '');
});
</script>

<style lang="scss" scoped>
@import url("pricing.scss");
</style>
