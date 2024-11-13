<template>
  <component :is="iconMappings[type]" :class="isCustomSize ? 'size-24' : 'size-60'" :filled="true" />
</template>

<script setup lang="ts">
import Building from "~/public/icons/Buildings.svg";
import Close from "~/public/icons/Close.svg";
import Envelope from "~/public/icons/Envelope.svg";
import MapPin from "~/public/icons/MapPin.svg";
import House from "~/public/icons/House.svg";
import Menu from "~/public/icons/Menu.svg";
import MenuBlack from "~/public/icons/Menu-Black.svg";
import Phone from "~/public/icons/Phone.svg";
import Search from "~/public/icons/Search.svg";
import SearchFilled from "~/public/icons/Search-Filled.svg";
import Download from "~/public/icons/Download.svg";
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
import ProjectorScreenChart from "~/public/icons/ProjectorScreenChart.svg";
import ViewCount from "~/public/icons/ViewCount.svg";
import Tick from "~/public/icons/Tick.svg";
import Unlock from "~/public/icons/Unlock.svg";
import UnlockDocumentFailure from "~/public/icons/Unlock-Document-Failure.svg";
import BuyDocument from "~/public/icons/Buy-Document.svg";
import GuardDocument from "~/public/icons/Guard-Document.svg";
import PaymentMethod from "~/public/icons/Payment-Method.svg";
import RefundDocument from "~/public/icons/Refund-Document.svg";
import TransactionDocument from "~/public/icons/Transaction-Document.svg";
import Logout from "~/public/icons/Logout.svg";
import Industry from "~/public/icons/Industry.svg";
import Commodity from "~/public/icons/Commodity.svg";
import Other from "~/public/icons/Other.svg";
import Ticket from "~/public/icons/Ticket.svg";
import InternalTicket from "~/public/icons/InternalTicket.svg";
import Bell from "public/icons/Bell.svg";


export type TypeIcon =
    | "Building"
    | "Close"
    | "Envelope"
    | "MapPin"
    | "Menu"
    | "MenuBlack"
    | "Phone"
    | "Search"
    | "SearchFilled"
    | "Download"
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
    | "ProjectorScreenChart"
    | "ViewCount"
    | "House"
    | "Tick"
    | "Unlock"
    | "UnlockDocumentFailure"
    | "BuyDocument"
    | "GuardDocument"
    | "PaymentMethod"
    | "RefundDocument"
    | "TransactionDocument"
    | "Logout"
    | "Industry"
    | "Commodity"
    | "Other"
    | "Ticket"
    | "InternalTicket"
    | "Bell";
defineProps<{
  type: TypeIcon,
  isCustomSize?: boolean
}>()

const iconMappings = {
  "Building": Building,
  "Close": Close,
  "Envelope": Envelope,
  "MapPin": MapPin,
  "House": House,
  "Menu": Menu,
  "MenuBlack": MenuBlack,
  "Phone": Phone,
  "Search": Search,
  "SearchFilled": SearchFilled,
  "Download": Download,
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
  "ProjectorScreenChart": ProjectorScreenChart,
  "ViewCount": ViewCount,
  "Tick": Tick,
  "Unlock": Unlock,
  "UnlockDocumentFailure": UnlockDocumentFailure,
  "BuyDocument": BuyDocument,
  "GuardDocument": GuardDocument,
  "PaymentMethod": PaymentMethod,
  "RefundDocument": RefundDocument,
  "TransactionDocument": TransactionDocument,
  "Logout": Logout,
  "Industry": Industry,
  "Commodity": Commodity,
  "Other": Other,
  "Ticket": Ticket,
  "InternalTicket": InternalTicket,
  "Bell": Bell,
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

.size-60 {
  width: 60px;
  min-width: 60px;
  height: 60px;
  min-height: 60px;
}
</style>