<template>
  <Icon class="icon">
    <template #component>
      <img :src="iconMappings[type]">
    </template>
  </Icon>
</template>

<script setup lang="ts">
import Icon from '@ant-design/icons-vue/lib/components/Icon';

type TypeIcon =
  | "Building"
  | "Close"
  | "Envelope"
  | "MapPin"
  | "Menu"
  | "Phone"
  | "Search"
  | "SocialFB"
  | "SocialLinkedIn"
  | "SocialYoutube"
  | "Homepage"
  | "Report"
  | "Store"
  | "ContactUs"


defineProps<{
  type: TypeIcon
}>()

const iconMappings = {
  "Building": "/icons/Buildings.svg",
  "Close": "/icons/Close.svg",
  "Envelope": "/icons/Envelope.svg",
  "MapPin": "/icons/MapPin.svg",
  "Menu": "/icons/Menu.svg",
  "Phone": "/icons/Phone.svg",
  "Search": "/icons/Search.svg",
  "SocialFB": "/icons/Social-FB.svg",
  "SocialLinkedIn": "/icons/Social-Linkedin.svg",
  "SocialYoutube": "/icons/Social-Ytb.svg",
  "Homepage": "/icons/Homepage.svg",
  "Report": "/icons/Report.svg",
  "Store": "/icons/Store.svg",
  "ContactUs": "/icons/Contact-Us.svg",
}
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: start;
}
</style>