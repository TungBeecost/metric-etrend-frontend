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
import SearchFilled from "~/public/icons/Search-Filled.svg";
import SocialFB from "~/public/icons/Social-FB.svg";
import SocialLinkedIn from "~/public/icons/Social-Linkedin.svg";
import SocialYoutube from "~/public/icons/Social-Ytb.svg";
import Homepage from "~/public/icons/Homepage.svg";
import Report from "~/public/icons/Report.svg";
import Store from "~/public/icons/Store.svg";
import ContactUs from "~/public/icons/Contact-Us.svg";
import SuccessTick from "~/public/icons/Success-Tick.svg";
import Chart from "~/public/icons/Chart.svg";
import Docs from "~/public/icons/Docs.svg";
import Tick from "~/public/icons/Tick.svg";
import Unlock from "~/public/icons/Unlock.svg";
import UnlockDocumentFailure from "~/public/icons/Unlock-Document-Failure.svg";

type TypeIcon =
  | "Building"
  | "Close"
  | "Envelope"
  | "MapPin"
  | "Menu"
  | "MenuBlack"
  | "Phone"
  | "Search"
  | "SearchFilled"
  | "SocialFB"
  | "SocialLinkedIn"
  | "SocialYoutube"
  | "Homepage"
  | "Report"
  | "Store"
  | "ContactUs"
  | "SuccessTick"
  | "Chart"
  | "Docs"
  | "Tick"
  | "Unlock"
  | "UnlockDocumentFailure"


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
  "SearchFilled": SearchFilled,
  "SocialFB": SocialFB,
  "SocialLinkedIn": SocialLinkedIn,
  "SocialYoutube": SocialYoutube,
  "Homepage": Homepage,
  "Report": Report,
  "Store": Store,
  "ContactUs": ContactUs,
  "SuccessTick": SuccessTick,
  "Chart": Chart,
  "Docs": Docs,
  "Tick": Tick,
  "Unlock": Unlock,
  "UnlockDocumentFailure": UnlockDocumentFailure,
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
  min-width: 24px;
  height: 24px;
  min-height: 24px;
}
</style>