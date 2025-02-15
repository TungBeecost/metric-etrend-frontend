<template>
  <div>
    <div class="section sectionPricing">
      <div class="bg">
        <img loading="lazy" src="/images/background-search.png" class="background"/>
      </div>
      <Plans />
    </div>
    <div class="section sectionPartner">
      <Parters />
    </div>
    <div class="compare_feature default_section">
      <CompareFeature />
    </div>
    <div class="information_pricing">
      <InformationPricing />
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
import InformationPricing from "~/components/pricing/InformationPricing.vue";

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
