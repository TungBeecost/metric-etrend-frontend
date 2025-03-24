import type { CommonOptionItem } from "~/helpers/types";

export const NAVIGATIONS = {
  search: "/search",
  home: "/",
  report: "/reports",
  account: "/account",
  pricing: "/pricing",
  contactUs: "/contact-us",
  payment: "/payment",
  smart_analytic: "/smart_analytic",
  signIn: "/sign-in",
  category: "/c",
  informationPolicy: "/chinh-sach-bao-mat-thong-tin",
  paymentMethod: "/hinh-thuc-thanh-toan",
  placeOrderPolicy: "/chinh-sach-dat-hang",
  commonTerm: "/dieu-kien-giao-dich-chung",
  requestSupport: "/ticket/my-ticket",
  handingrequestSupport: "/ticket/internal",
};

export const MENUS = [
  {
    label: "Báo cáo",
    icon: "Report",
    to: NAVIGATIONS.report
  },
  {
    label: "Bảng giá dịch vụ",
    icon: "Store",
    to: NAVIGATIONS.pricing
  },
  {
    label: "Hướng dẫn sử dụng",
    icon: "Store",
    to: 'https://hotro.metric.vn/ereport'
  },
];

export const CATEGORIES: Array<CommonOptionItem> = [
  { label: "Điện Thoại & Máy Tính Bảng", value: "Điện Thoại & Máy Tính Bảng" },
  { label: "Nhà Cửa - Đời Sống", value: "Nhà Cửa - Đời Sống" },
  { label: "Máy Tính, Laptop & Thiết Bị Văn Phòng", value: "Máy Tính, Laptop & Thiết Bị Văn Phòng" },
  { label: "Bách Hóa - Thực Phẩm", value: "Bách Hóa - Thực Phẩm" },
  { label: "Làm Đẹp", value: "Làm Đẹp" },
  { label: "Sức Khoẻ", value: "Sức Khoẻ" },
  { label: "Thời Trang Nam", value: "Thời Trang Nam" },
  { label: "Thời Trang Nữ", value: "Thời Trang Nữ" },
  { label: "Giày Dép Nam", value: "Giày Dép Nam" },
  { label: "Giày Dép Nữ", value: "Giày Dép Nữ" },
  { label: "Túi Ví Nữ", value: "Túi Ví Nữ" },
  { label: "Mẹ & Bé", value: "Mẹ & Bé" },
  { label: "Phụ Kiện Thời Trang", value: "Phụ Kiện Thời Trang" },
  { label: "Đồng Hồ & Trang Sức", value: "Đồng Hồ & Trang Sức" },
  { label: "Voucher - Dịch Vụ", value: "Voucher - Dịch Vụ" },
  { label: "Văn Phòng Phẩm", value: "Văn Phòng Phẩm" },
  { label: "Chăm Sóc Thú Cưng", value: "Chăm Sóc Thú Cưng" },
  { label: "Máy Ảnh & Máy Quay Phim", value: "Máy Ảnh & Máy Quay Phim" },
  { label: "Nhạc & Phim", value: "Nhạc & Phim" },
  { label: "Sách & Tạp Chí", value: "Sách & Tạp Chí" },
  { label: "Thiết Bị Số & Gaming", value: "Thiết Bị Số & Gaming" },
  { label: "Thiết Bị Âm Thanh", value: "Thiết Bị Âm Thanh" },
  { label: "Thể Thao & Du Lịch", value: "Thể Thao & Du Lịch" },
  { label: "Thời Trang Trẻ Em", value: "Thời Trang Trẻ Em" },
  { label: "Túi Ví Nam", value: "Túi Ví Nam" },
  { label: "Ô Tô - Xe Máy", value: "Ô Tô - Xe Máy" },
  { label: "Điện Gia Dụng", value: "Điện Gia Dụng" },
  { label: "Đồ Chơi", value: "Đồ Chơi" }
];

export const COMPANY_TYPES: Array<CommonOptionItem> = [
  {
    label: "Doanh nghiệp",
    value: "Doanh nghiệp"
  },
  {
    label: "Cá nhân",
    value: "Cá nhân"
  },
  {
    label: "Khác",
    value: "Khác"
  }
];

export const SOCIAL_MEDIA_TYPES: Array<CommonOptionItem> = [
  {
    label: "Chưa từng biết",
    value: "Chưa từng biết"
  },
  {
    label: "Báo cáo thị trường",
    value: "Báo cáo thị trường"
  },
  {
    label: "Sự kiện event",
    value: "Sự kiện event"
  },
  {
    label: "Social media, MXH",
    value: "Social media, MXH"
  },
  {
    label: "Báo chí",
    value: "Báo chí"
  },
  {
    label: "Google",
    value: "Google"
  }
];

export const LABEL_PERMISSION_PLAN = {
  viewReportDetailFree: {
    label: "Truy cập kho báo cáo miễn phí không giới hạn",
    icon: "ProjectorScreenChart"
  },
  downloadDeptReport: {
    label: "Tải báo cáo chi tiết (Tính phí theo lượt tải)",
    icon: "Download"
  },
  viewCountTrial: {
    label: "3 lượt xem báo cáo chi tiết",
    icon: "ViewCount"
  },
  viewCountBasic: {
    label: "10 lượt xem báo cáo chi tiết",
    icon: "ViewCount"
  },
  viewCountPro: {
    label: "15 lượt xem báo cáo chi tiết",
    icon: "ViewCount"
  },
  rightToParticipate: {
    label: "Quyền tham gia chương trình Tiếp thị liên kết\n" +
        "<a href='https://kiem1ty.metric.vn/' style='color: #E85912'>“Kiếm 1 tỷ ngay trong Tháng 12”</a>",
    icon: "Coin"
  },
  analysis: {
    label: "Mở xem và phân tích nhiều báo cáo:",
    icon: "Unlock",
    sub: {
      unlimitedView: "Không giới hạn xem lại báo cáo trong 24h",
      expiry: "Truy cập báo cáo Community trong thời gian sử dụng",
      expiry1: "Thời hạn sử dụng: 1 năm",
      smartAnalysis: "Tính năng phân tích thông minh"

    }
  },
  incentive: {
    label: "Mở xem báo cáo không giới hạn:",
    icon: "Unlock",
    sub: {
      unlimitedView: "Truy cập kho báo cáo Community",
      expiry: "Thời hạn sử dụng: 01/01/2026",
      expiry1: "Metric GPT: Hỏi đáp chuyên sâu trên báo cáo",
    }
  },
  smartReporting: {
    label: "Báo cáo thông minh:",
    icon: "Unlock",
    sub: {
      unlimitedView: "Không giới hạn xem Báo cáo Community",
      free5TimeOpen: "Miễn phí 5 lượt mở xem báo cáo khác",
      expiry: "Thời gian sử dụng: 6 tháng",
    }
  },
  pdfReporting: {
    label: "Báo cáo định dạng PDF:",
    icon: "Download",
    sub: {
      fieldReport: "Báo cáo thị trường và tăng trưởng quý, năm",
      top: "Top nhà bán, thương hiệu, thị phần, mức giá",
      detail: "Chi tiết shop, sản phẩm bán chạy",
      review: "Đánh giá shop, sản phẩm từ người mua",
    }
  },
  updatedWeekly: {
    label: `Cập nhật hàng tuần số liệu thị trường, đối thủ, trending bán chạy, cách bán hàng hiệu quả`,
    icon: "Bell"
  },
  openViewReport: {
    label: "Mở xem và phân tích nhiều báo cáo",
    icon: "Unlock"
  },
  customFilterAnalysis: {
    label: "Phân tích với bộ lọc tùy chỉnh",
    icon: "Chart"
  },
  ReportOnECommerceMarketPlatforms: {
    label: "Báo cáo toàn diện thị trường các sàn Shopee, Lazada, Tiki",
    icon: "Tick"
  },
  ReportOnECommercePlatforms: {
    label: "Báo cáo toàn diện trên sàn Shopee, Lazada, Tiki",
    icon: "Tick"
  },
  FiftyPageIndepthdata: {
    label: "Bao gồm hơn 50 trang dữ liệu chuyên sâu",
    icon: "Tick"
  },
  GetPdfReportByEmail5Minutes: {
    label: "Nhận ngay báo cáo <b>PDF</b> qua email trong vòng 5 phút",
    icon: "Tick"
  },
  QuickView50OnlineReport:{
    label: "Xem nhanh <b>50 báo cáo online</b> đa dạng ngành hàng",
    icon: "Tick"
  },
  UnlimitedReviewOfReports:{
    label: "Không giới hạn xem lại báo cáo trong vòng 24h",
    icon: "Tick"
  },
  SmartAnalyticsFeature:{
    label: "Tính năng phân tích thông minh",
    icon: "Tick"
  },
  ExpiryDate:{
    label: "Thời hạn sử dụng: <b>1 năm</b>",
    icon: "Tick"
  },
  DownloadDetailedPdfReport:{
    label: "Tải báo cáo PDF chi tiết",
    icon: "Close"
  },
  CustomizeDataRange:{
    label: "Tuỳ chỉnh phạm vi dữ liệu theo yêu cầu",
    icon: "Tick"
  },
  AnalysisByProduct:{
    label: "Phân tích chuyên sâu theo từng nhóm hàng, ngành hàng, gian hàng",
    icon: "Tick"
  },
  GetPdfReportByEmail: {
    label: "Nhận ngay báo cáo <b>PDF</b> qua email",
    icon: "Tick"
  },
}

interface IPLAN {
  type: string;
  description: string;
  plan_code: string;
  type_package: string;
  price: string;
  priceValue?: string;
  priceDiscount?: string;
  discountPercent?: string;
  unit?: string;
  isHighlight?: boolean;
  isHide?: boolean;
  autoShowDetail?: boolean;
  permissions: Array<{
    label: string;
    icon: string;
    sub?: Array<string>;
  }>;
}

interface IVIDEO {
    title: string;
    url: string;
}

// constants/plans.js
export const PLANCARD = [
  {
    code: 'e_trial',
    name: 'Gói Trial',
    description: 'Nâng cấp gói ngay để khám phá số liệu thị trường với hàng trăm báo cáo mới nhất ngay hôm nay',
    background: '#FFF',
    textColor: '#000',
    textColorButton: '#FFF',
    backgroundButton: '#E85912',
    textButton: 'Nâng cấp gói',
    svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="24" fill="#FDEEE7"/><path opacity="0.2" d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" fill="#E85912"/><path d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.9988 33.1678C16.0167 29.6809 19.6818 27.3337 24 27.3337C28.3183 27.3337 31.9833 29.6809 34.0013 33.1678" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  {
    code: 'e_free',
    name: 'Gói Miễn Phí',
    description: 'Nâng cấp gói ngay để khám phá số liệu thị trường với hàng trăm báo cáo mới nhất ngay hôm nay',
    background: '#FFF',
    textColor: '#000',
    textColorButton: '#FFF',
    backgroundButton: '#E85912',
    textButton: 'Nâng cấp gói',
    svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="24" fill="#FDEEE7"/><path opacity="0.2" d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" fill="#E85912"/><path d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.9988 33.1678C16.0167 29.6809 19.6818 27.3337 24 27.3337C28.3183 27.3337 31.9833 29.6809 34.0013 33.1678" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  {
    code: 'e_community',
    name: 'Community',
    description: 'Nâng cấp gói ngay để khám phá số liệu thị trường với hàng trăm báo cáo mới nhất ngay hôm nay',
    background: '#FFF',
    textColor: '#000',
    textColorButton: '#FFF',
    backgroundButton: '#E85912',
    textButton: 'Nâng cấp gói',
    svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="24" fill="#FDEEE7"/><path opacity="0.2" d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" fill="#E85912"/><path d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.9988 33.1678C16.0167 29.6809 19.6818 27.3337 24 27.3337C28.3183 27.3337 31.9833 29.6809 34.0013 33.1678" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  {
    code: 'e_basic',
    name: 'Gói Basic',
    description: 'Bạn đang sử dụng gói Basic và bị giới hạn hiển thị một số dữ liệu của báo cáo',
    background: 'linear-gradient(90deg, #4745A5 0%, #241E46 100%)',
    textColor: '#FFF',
    backgroundButton: '#FFF',
    textColorButton: '#000',
    textButton: 'Nâng cấp gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'e_basic',
    name: 'Gói Basic',
    description: 'Bạn đang sử dụng gói Basic và bị giới hạn hiển thị một số dữ liệu của báo cáo',
    background: 'linear-gradient(90deg, #4745A5 0%, #241E46 100%)',
    textColor: '#FFF',
    backgroundButton: '#FFF',
    textColorButton: '#000',
    textButton: 'Nâng cấp gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'e_basic_lite',
    name: 'Gói Basic Lite',
    description: 'Bạn đang sử dụng gói Basic và bị giới hạn hiển thị một số dữ liệu của báo cáo',
    background: 'linear-gradient(90deg, #4745A5 0%, #241E46 100%)',
    textColor: '#FFF',
    backgroundButton: '#FFF',
    textColorButton: '#000',
    textButton: 'Nâng cấp gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'e_pro',
    name: 'Gói Pro',
    description: 'Bạn đang sử dụng gói Pro và không bị giới hạn hiển thị dữ liệu của báo cáo',
    background: 'linear-gradient(90.12deg, #FCA14E 1.09%, #FF733F 99.22%)',
    textColor: '#FFFFFF',
    textColorButton: '#E85912',
    backgroundButton: '#FFFFFF',
    textButton: 'Danh sách gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'e_pro_lite',
    name: 'Gói Pro Lite',
    description: 'Bạn đang sử dụng gói Pro và không bị giới hạn hiển thị dữ liệu của báo cáo',
    background: 'linear-gradient(90.12deg, #FCA14E 1.09%, #FF733F 99.22%)',
    textColor: '#FFFFFF',
    textColorButton: '#E85912',
    backgroundButton: '#FFFFFF',
    textButton: 'Danh sách gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'e_starter',
    name: 'Gói Starter',
    description: 'Nâng cấp gói ngay để khám phá số liệu thị trường với hàng trăm báo cáo mới nhất ngay hôm nay',
    background: '#FFF',
    textColor: '#000',
    textColorButton: '#FFF',
    backgroundButton: '#E85912',
    textButton: 'Nâng cấp gói',
    svg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="24" fill="#FDEEE7"/><path opacity="0.2" d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" fill="#E85912"/><path d="M24 27.3338C27.6824 27.3338 30.6675 24.3486 30.6675 20.6663C30.6675 16.9839 27.6824 13.9988 24 13.9988C20.3177 13.9988 17.3325 16.9839 17.3325 20.6663C17.3325 24.3486 20.3177 27.3338 24 27.3338Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.9988 33.1678C16.0167 29.6809 19.6818 27.3337 24 27.3337C28.3183 27.3337 31.9833 29.6809 34.0013 33.1678" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  {
    code: 'pt50',
    name: 'Gói xem nhanh',
    description: 'Bạn đang sử dụng gói xem nhanh và không bị giới hạn hiển thị dữ liệu của báo cáo',
    background: 'linear-gradient(90.12deg, #FCA14E 1.09%, #FF733F 99.22%)',
    textColor: '#FFFFFF',
    textColorButton: '#E85912',
    backgroundButton: '#FFFFFF',
    textButton: 'Danh sách gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'pt100',
    name: 'Gói xem nhanh',
    description: 'Bạn đang sử dụng gói xem nhanh và không bị giới hạn hiển thị dữ liệu của báo cáo',
    background: 'linear-gradient(90.12deg, #FCA14E 1.09%, #FF733F 99.22%)',
    textColor: '#FFFFFF',
    textColorButton: '#E85912',
    backgroundButton: '#FFFFFF',
    textButton: 'Danh sách gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'eReport12',
    name: 'Gói ra mắt',
    description: 'Bạn đang sử dụng gói Gói ra mắt và không bị giới hạn báo cáo',
    background: 'linear-gradient(90.12deg, #FCA14E 1.09%, #FF733F 99.22%)',
    textColor: '#FFFFFF',
    textColorButton: '#E85912',
    backgroundButton: '#FFFFFF',
    textButton: 'Danh sách gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
  {
    code: 'eReport12_partner',
    name: 'eReport T12 Partner',
    description: 'Bạn đang sử dụng gói eReport T12 Partner và không bị giới hạn báo cáo',
    background: 'linear-gradient(90.12deg, #FCA14E 1.09%, #FF733F 99.22%)',
    textColor: '#FFFFFF',
    textColorButton: '#E85912',
    backgroundButton: '#FFFFFF',
    textButton: 'Danh sách gói',
    svg: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_7028_11121)"> <rect x="16" y="10" width="48" height="48" rx="24" fill="white" shape-rendering="crispEdges"/> <rect x="16.5" y="10.5" width="47" height="47" rx="23.5" stroke="#F9D7C6" shape-rendering="crispEdges"/> <g clip-path="url(#clip0_7028_11121)"> <path opacity="0.2" d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" fill="#E85912"/> <path d="M32.2104 41.5C32.2104 41.5 35 39.8333 40 39.8333C45 39.8333 47.7896 41.5 47.7896 41.5L51.6438 29.6885C51.6719 29.6083 51.6753 29.5215 51.6537 29.4392C51.6321 29.357 51.5863 29.2831 51.5223 29.2271C51.4584 29.1711 51.3791 29.1355 51.2948 29.1249C51.2104 29.1143 51.1248 29.1292 51.049 29.1677L45.4833 31.9427C45.387 31.9903 45.2762 32 45.1731 31.9699C45.0699 31.9399 44.9817 31.8721 44.926 31.7802L40.3667 24.2083C40.3285 24.1458 40.275 24.0942 40.2111 24.0583C40.1473 24.0225 40.0753 24.0037 40.0021 24.0037C39.9289 24.0037 39.8569 24.0225 39.793 24.0583C39.7292 24.0942 39.6756 24.1458 39.6375 24.2083L35.074 31.7833C35.0185 31.8757 34.9301 31.9438 34.8266 31.9739C34.7231 32.004 34.6121 31.994 34.5156 31.9458L28.9583 29.1729C28.8825 29.1347 28.7969 29.1199 28.7126 29.1306C28.6283 29.1413 28.5491 29.1768 28.4851 29.2328C28.4211 29.2887 28.3753 29.3624 28.3535 29.4445C28.3316 29.5266 28.3348 29.6134 28.3625 29.6937L32.2104 41.5Z" stroke="#E85912" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g> <defs> <filter id="filter0_d_7028_11121" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="6"/> <feGaussianBlur stdDeviation="8"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.211765 0 0 0 0.16 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7028_11121"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7028_11121" result="shape"/> </filter> <clipPath id="clip0_7028_11121"> <rect width="26.6667" height="26.6667" fill="white" transform="translate(26.6667 20.6666)"/> </clipPath> </defs> </svg>'
  },
];


export const VIDEO: Array<IVIDEO> = [
    {
        title: "X5 hiệu quả: Tìm sản phẩm HOT kinh doanh cực nhanh với Metric eReport!",
        url: "https://www.youtube.com/watch?v=bXQXqZidFg0",
    },
    {
        title: "X3 Tốc Độ Viết Content Marketing Chuẩn Đỉnh Nhờ Metric eReport!",
        url: "https://www.youtube.com/watch?v=dMw-5cmnqug",
    },
    {
        title: "Bí kíp x5 tốc độ họp nhóm & lập kế hoạch Marketing siêu nhanh với Metric eReport!",
        url: "https://www.youtube.com/watch?v=bkYO_uLc3Ew",
    },
    {
        title: "Thông minh & hiệu quả hơn khi gặp khách hàng và đối tác - Trợ lý số liệu Metric eReport.",
        url: "https://www.youtube.com/watch?v=sJvTpijYR_I",
    },
    {
      title: "Tăng tốc x10 lần: Bí quyết duyệt kế hoạch & báo cáo kinh doanh từ Metric eReport",
      url: "https://www.youtube.com/watch?v=hRjIFmREmic",
    },
    ];



export const PLANS: Array<IPLAN> = [
  {
    type: "Báo cáo PDF chi tiết",
    plan_code: "PDF_report",
    type_package: "pdf_report",
    description: "Dành cho nhu cầu tải báo cáo PDF phân tích chi tiết 1 nhóm hàng",
    price: '250,000đ',
    priceValue: "",
    priceDiscount: "",
    // discountPercent: "-50%",
    unit: " báo cáo",
    isHighlight: true,
    permissions: [
      {
        ...LABEL_PERMISSION_PLAN.ReportOnECommerceMarketPlatforms,
        // sub: Object.values(LABEL_PERMISSION_PLAN.analysis.sub)
      },
      {
        ...LABEL_PERMISSION_PLAN.ReportOnECommercePlatforms,
      },
      {
        ...LABEL_PERMISSION_PLAN.FiftyPageIndepthdata,
      },
      {
        ...LABEL_PERMISSION_PLAN.GetPdfReportByEmail5Minutes,
      }
    ]
  },
  {
    type: "Tài khoản Xem nhanh",
    plan_code: "pt50",
    type_package: "analysis",
    description: "Dành cho nhu cầu khảo sát thị trường TMĐT thường xuyên và đa dạng nhóm hàng",
    price: '1,990,000đ',
    priceValue: "1990000",
    priceDiscount: "3000000",
    // discountPercent: "-50%",
    unit: " 50 lượt xem online",
    isHighlight: true,
    permissions: [
      {
        ...LABEL_PERMISSION_PLAN.ReportOnECommercePlatforms,
      },
      {
        ...LABEL_PERMISSION_PLAN.QuickView50OnlineReport,
      },
      {
        ...LABEL_PERMISSION_PLAN.UnlimitedReviewOfReports,
      },
      {
          ...LABEL_PERMISSION_PLAN.SmartAnalyticsFeature,
      },
      {
          ...LABEL_PERMISSION_PLAN.ExpiryDate,
      },
      {
          ...LABEL_PERMISSION_PLAN.DownloadDetailedPdfReport,
      }
    ]
  },
  {
    type: "Tài khoản Xem nhanh",
    plan_code: "pt100",
    type_package: "analysis",
    description: "Dành cho nhu cầu khảo sát thị trường TMĐT thường xuyên và đa dạng nhóm hàng",
    price: '2,990,000đ',
    priceValue: "2990000",
    priceDiscount: "5000000",
    unit: " 50 lượt xem online",
    isHighlight: true,
    permissions: [
      {
        ...LABEL_PERMISSION_PLAN.ReportOnECommercePlatforms,
      },
      {
        ...LABEL_PERMISSION_PLAN.QuickView50OnlineReport,
      },
      {
        ...LABEL_PERMISSION_PLAN.UnlimitedReviewOfReports,
      },
      {
        ...LABEL_PERMISSION_PLAN.SmartAnalyticsFeature,
      },
      {
        ...LABEL_PERMISSION_PLAN.ExpiryDate,
      },
      {
        ...LABEL_PERMISSION_PLAN.DownloadDetailedPdfReport,
      }
    ]
  },
  {
    type: "Tuỳ chỉnh báo cáo PDF",
    plan_code: "custom_pdf_report",
    type_package: "custom_pdf_report",
    description: "Dành cho nhu cầu báo cáo theo yêu cầu riêng, phù hợp với chiến lược kinh doanh cụ thể",
    price: 'Liên hệ báo giá',
    priceValue: "",
    priceDiscount: "",
    // discountPercent: "-50%",
    unit: "",
    isHighlight: true,
    permissions: [
      {
        ...LABEL_PERMISSION_PLAN.CustomizeDataRange,
      },
      {
        ...LABEL_PERMISSION_PLAN.ReportOnECommercePlatforms,
      },
      {
        ...LABEL_PERMISSION_PLAN.AnalysisByProduct,
      },
      {
        ...LABEL_PERMISSION_PLAN.FiftyPageIndepthdata,
      },
      {
        ...LABEL_PERMISSION_PLAN.GetPdfReportByEmail,
      }
    ]
  },
];


interface IWALLET {
  code: string;
  label: string;
  name: string;
  thumbnail: string;
}
export const WALLET: Array<IWALLET> = [
  {
    code: "momo",
    label: "Momo",
    name: "Ví Momo",
    thumbnail: "/images/wallet/momo.png"
  },
  {
    code: "vnpay",
    label: "VnPay",
    name: "VNPay QR",
    thumbnail: "/images/wallet/vnpay.png"
  }
];

export const TESTIMONIAL_BRANDS = [
  "/images/brand_news/Cafef.png",
  "/images/brand_news/Dan-tri.png",
  "/images/brand_news/Dau-tu-online.png",
  "/images/brand_news/Deal-Street-ASIA.png",
  "/images/brand_news/Dien-dan-doanh-nghiep.png",
  "/images/brand_news/Kinh-te-SG-online.png",
  "/images/brand_news/Phap-luat-07.png",
  "/images/brand_news/Thanh-nien.png",
  "/images/brand_news/Thoi-bao-tai-chinh.png",
  "/images/brand_news/Tien-phong.png",
  "/images/brand_news/Truyen-hinh-quoc-hoi-vn.png",
  "/images/brand_news/Vietnam-net.png",
  "/images/brand_news/Vn-Economy.png",
  "/images/brand_news/Vn-Express.png",
  "/images/brand_news/VTC-2.png",
  "/images/brand_news/VTV.png"
];

export const PARTERS = [
  "/images/brand/1.Logo_Bộ_Thông_tin_và_Truyền_thông.svg.png",
  "/images/brand/2.Idea.png",
  "/images/brand/3.Ecomviet.png",
  "/images/brand/4vecom.png",
  "/images/brand/5.Shopee.png",
  "/images/brand/6.logo-lazada-1.png",
  "/images/brand/7.Tiktok.png",
  "/images/brand/8.tiki.png",
  "/images/brand/9.unilever.png",
  "/images/brand/10.AMOREPACIFIC_logo.svg.png",
  "/images/brand/11.Coway.png",
  "/images/brand/12.Novaon.png",
  "/images/brand/13.DKSH.png",
  "/images/brand/14.Thegioididong.png",
  "/images/brand/15.Guardian.png",
  "/images/brand/16.Shisedo.png",
  "/images/brand/17.Canifa.png",
  "/images/brand/18.Thiênlong.png",
];

export const TERM_AND_POLICIES = [
  {
    label: "Chính sách bảo mật thông tin",
    link: NAVIGATIONS.informationPolicy
  },
  {
    label: "Chính sách đặt hàng",
    link: NAVIGATIONS.placeOrderPolicy
  },
  {
    label: "Điều kiện giao dịch chung",
    link: NAVIGATIONS.commonTerm
  },
  {
    label: "Liên hệ",
    link: NAVIGATIONS.contactUs
  },
];

export const COMPANY_INFOS = {
  name: "CÔNG TY CỔ PHẦN KHOA HỌC DỮ LIỆU",
  address: "Địa điểm kinh doanh: Tầng 4 Tòa nhà HH2, Dương Đình Nghệ, phường Yên Hoà, quận Cầu Giấy, thành phố Hà Nội",
  phoneNumber: "033.806.2221",
  email: "info@metric.vn"
};

export const CONTACTS = [
  {
    label: COMPANY_INFOS.name,
    icon: "Building"
  },
  {
    label: COMPANY_INFOS.address,
    icon: "MapPin"
  },
  {
    label: COMPANY_INFOS.phoneNumber,
    icon: "Phone"
  },
  {
    label: COMPANY_INFOS.email,
    icon: "Envelope"
  },
];

export const PAGE_TITLES = {
  account: "Trang của tôi",
  inforSecurityPolicy: "Chính sách bảo mật thông tin",
  placeOrderPolicy: "Chính sách đặt hàng",
  refundPolicy: "Chính sách đổi trả sản phẩm",
  contactUs: "Liên hệ",
  transactionPolicy: "Điều kiện giao dịch chung",
  pricing: "Gói dịch vụ",
  reports: "Báo cáo",
  reportDetail: "Chi tiết báo cáo",
  search: "Tìm kiếm",
  payment: "Thanh toán"
};

export const LIST_REPORT_TYPES = [
  {
    icon: "Industry",
    value: "report_category",
    title: 'Báo cáo ngành hàng',
    content: 'Cung cấp các thông tin về ngành hàng lớn trên sàn TMĐT như Làm đẹp, Thời trang,... Giúp doanh nghiệp xác định dung lượng và tiềm năng thị trường để xây dựng và thực thi kế hoạch kinh doanh.'
  },
  {
    icon: "Commodity",
    value: "report_product_line",
    title: 'Báo cáo nhóm hàng',
    content: 'Phân tích thông tin thị trường theo nhóm hàng. Là nguồn dữ liệu (insights) giá trị giúp nhà bán thấu hiểu hành vi khách hàng đối với từng nhóm sản phẩm cụ thể.'
  },
  {
    icon: "Other",
    value: "report_brand",
    title: 'Báo cáo thương hiệu',
    content: 'Cung cấp thông tin về thương hiệu, giúp doanh nghiệp hiểu rõ vị thế cạnh tranh, chiến lược marketing, và hành vi người tiêu dùng đối với thương hiệu.'
  }
]

export const DATACOLLECTION = [
  {
    thumbnail: '/icons/home/data_collection/Icon1.svg',
    title: '1. Thu thập dữ liệu',
    content: 'Thu thập dữ liệu lớn (Big data) từ các sàn và website TMĐT'
  },
  {
      thumbnail: '/icons/home/data_collection/Icon2.svg',
      title: '2. Làm sạch dữ liệu',
      content: 'Làm sạch, phân tích & hệ thống các điểm dữ liệu'
  },
  {
      thumbnail: '/icons/home/data_collection/Icon3.svg',
      title: '3. Phân tích dữ liệu',
      content: 'Tính toán các chỉ số thống kê cơ bản. Phân tích phân loại theo ngành hàng, nhóm sản phẩm, (SKUs),..'
  },
  {
      thumbnail: '/icons/home/data_collection/Icon4.svg',
      title: '4. Trực quan hoá dữ liệu',
      content: 'Chuyển đổi dữ liệu từ dạng số sang bảng biểu để dễ dàng nhận diện các xu hướng và thông tin quan trọng'
  },
  {
      thumbnail: '/icons/home/data_collection/Icon5.svg',
      title: '5. Báo cáo thị trường ',
      content: 'Báo cáo thị trường phân tích chi tiết và toàn diện theo ngành hàng, nhóm hàng, thương hiệu'
  }
]

export const REPORT_TYPE_MAP: Record<string, string> = {
  report_product_line: 'Báo cáo nhóm hàng',
  report_category: 'Báo cáo ngành hàng',
  report_brand: 'Báo cáo thương hiệu',
  default: 'Báo cáo Metric phát hành',
};

export const INFORMATION_PRICING = [
  {
    thumbnail: '/icons/InfoPricing1.svg',
    title: 'Dữ liệu chính xác',
    content: 'Cập nhật bằng công nghệ Big Data giúp bạn đưa ra quyết định kinh doanh chính xác'
  },
  {
    thumbnail: '/icons/InfoPricing2.svg',
    title: 'Báo cáo trực quan',
    content: 'Biểu đồ trực quan giúp bạn dễ dàng nắm bắt thông tin nhanh chóng'
  },
  {
    thumbnail: '/icons/InfoPricing3.svg',
    title: 'Đa dạng ngành hàng',
    content: 'Cung cấp dữ liệu thị trường chuyên sâu cho nhiều ngành hàng và nền tảng TMĐT'
  },
]

export const CARD_TOP = [
  {
    index: 1,
    color: '#D59311',
    background: 'linear-gradient(270deg, var(--orange-orange-1, #FFF4E8) 0.47%, var(--gold-gold-3, #FDDC9A) 99.53%)', // Gold
    label: 'Top 1'
  },
  {
    index: 2,
    color: '#1890FF',
    background: 'linear-gradient(270deg, var(--blue-blue-1, #E8F4FF) 0.47%, var(--blue-blue-2, #C8E4FF) 99.53%)', // Silver
    label: 'Top 2'
  },
  {
    index: 3,
    color: '#B26310',
    background: 'linear-gradient(270deg, var(--orange-orange-1, #FFF4E8) 0.47%, var(--orange-orange-3, #FDCE9B) 99.53%)', // Bronze
    label: 'Top 3'
  },
  {
    index: 4,
    color: '#716B95',
    background: 'var(--dark-blue-darkblue-2, #EEEBFF)', // Default
    label: 'Top 4'
  },
  {
    index: 5,
    color: '#716B95',
    background: 'var(--dark-blue-darkblue-2, #EEEBFF)', // Default
    label: 'Top 5'
  },
  {
    index: 6,
    color: '#716B95',
    background: 'var(--dark-blue-darkblue-2, #EEEBFF)', // Default
    label: 'Top 6'
  },
  {
    index: 7,
    color: '#716B95',
    background: 'var(--dark-blue-darkblue-2, #EEEBFF)', // Default
    label: 'Top 7'
  },
  {
    index: 8,
    color: '#716B95',
    background: 'var(--dark-blue-darkblue-2, #EEEBFF)', // Default
    label: 'Top 8'
  },
  {
    index: 9,
    color: '#716B95',
    background: 'var(--dark-blue-darkblue-2, #EEEBFF)', // Default
    label: 'Top 9'
  },
  {
    index: 10,
    color: '#716B95',
    background: 'var(--dark-blue-darkblue-2, #EEEBFF)', // Default
    label: 'Top 10'
  }
];