<template>
  <component :is="iconMappings[type]" :class="{ 'size-24': !isCustomSize }" :filled="true" />
</template>

<script setup lang="ts">
import Building from "~/public/icons/Buildings.svg";
import Close from "~/public/icons/Close.svg";
import Envelope from "~/public/icons/Envelope.svg";
import MapPin from "~/public/icons/MapPin.svg";
import Menu from "~/public/icons/Menu.svg";
import MenuBlack from "~/public/icons/Menu-Black.svg";
import Phone from "~/public/icons/Phone.svg";
import Search from "~/public/icons/Search.svg";
import SocialFB from "~/public/icons/Social-FB.svg";
import SocialLinkedIn from "~/public/icons/Social-Linkedin.svg";
import SocialYoutube from "~/public/icons/Social-Ytb.svg";
import Homepage from "~/public/icons/Homepage.svg";
import Report from "~/public/icons/Report.svg";
import Store from "~/public/icons/Store.svg";
import ContactUs from "~/public/icons/Contact-Us.svg";

type TypeIcon =
  | "Building"
  | "Close"
  | "Envelope"
  | "MapPin"
  | "Menu"
  | "MenuBlack"
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
  type: TypeIcon,
  isCustomSize?: boolean
}>()

const iconMappings = {
  "Building": Building,
  "Close": Close,
  "Envelope": Envelope,
  "MapPin": MapPin,
  "Menu": Menu,
  "MenuBlack": MenuBlack,
  "Phone": Phone,
  "Search": Search,
  "SocialFB": SocialFB,
  "SocialLinkedIn": SocialLinkedIn,
  "SocialYoutube": SocialYoutube,
  "Homepage": Homepage,
  "Report": Report,
  "Store": Store,
  "ContactUs": ContactUs,
}

// Something wrong with lazy import in Nuxt, this below code made page unable to re-load when redirect
// const test = defineAsyncComponent(() => import(iconMappings[props.type]))

</script>

<style lang="scss" scoped>
/* .icon {
  display: flex;
  justify-content: center;
  align-items: start;
} */

.size-24 {
  width: 24px;
  height: 24px;
}
</style>