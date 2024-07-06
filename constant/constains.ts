import type { CommonOptionItem } from "~/helpers/types";

export const NAVIGATIONS = {
  search: "/search",
  home: "/",
  report: "/reports",
  pricing: "/pricing",
  contactUs: "/contact-us",
  signIn: "/sign-in",
  informationPolicy: "/chinh-sach-bao-mat-thong-tin",
  paymentMethod: "/hinh-thuc-thanh-toan",
  refundPolicy: "/chinh-sach-doi-tra-san-pham",
  placeOrderPolicy: "/chinh-sach-dat-hang",
  commonTerm: "/dieu-kien-giao-dich-chung"
};

export const MENUS = [
  {
    label: "Trang chủ",
    icon: "Homepage",
    to: NAVIGATIONS.home
  },
  {
    label: "Báo cáo",
    icon: "Report",
    to: NAVIGATIONS.report
  },
  {
    label: "Bảng giá dịch vụ",
    icon: "Store",
    to: NAVIGATIONS.pricing
  }
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
    label: "Đây là lần đầu tôi biết tới Metric",
    value: "Đây là lần đầu tôi biết tới Metric"
  },
  {
    label: "Báo cáo thị trường Thương mại Điện tử",
    value: "Báo cáo thị trường Thương mại Điện tử"
  },
  {
    label: "Tham gia sự kiện liên quan tới Ecommerce",
    value: "Tham gia sự kiện liên quan tới Ecommerce"
  },
  {
    label: "Social Media (Facebook, Zalo, Tiktok,...)",
    value: "Social Media (Facebook, Zalo, Tiktok,...)"
  },
  {
    label: "Báo chí",
    value: "Báo chí"
  },
  {
    label: "Khác",
    value: "Khác"
  }
];

export const LABEL_PERMISSION_PLAN = {
  searchReport: {
    label: "Tìm kiếm báo cáo không giới hạn",
    icon: "SearchFilled"
  },
  viewReport: {
    label: "Xem báo cáo chi tiết",
    icon: "Docs",
    sub: {
      summary: "Số liệu tổng quan",
      priceSegment: "Số liệu về phân khúc giá",
      category: "Số liệu về ngành hàng/ nhóm hàng",
      brand: "Số liệu về thương hiệu",
      topTierSell: "Danh sách gian hàng bán chạy",
      topTierProduct: "Danh sách sản phẩm bán chạy"
    }
  },
  numberOfUnlockReport: {
    label: (number: number) => `${number} lượt mở khoá báo cáo`,
    icon: "Unlock"
  },
  customFilterAnalysis: {
    label: "Phân tích với bộ lọc tùy chỉnh",
    icon: "Chart"
  }
};

interface IPLAN {
  type: string;
  description: string;
  price: string;
  unit?: string;
  isHighlight?: boolean;
  permissions: Array<{
    label: string;
    icon: string;
    sub?: Array<string>;
  }>;
}
export const PLANS: Array<IPLAN> = [
  {
    type: "Free",
    description: "Truy cập kho báo cáo và cập nhật xu hướng",
    price: "Miễn phí",
    unit: undefined,
    permissions: [
      {
        ...LABEL_PERMISSION_PLAN.searchReport
      }
    ]
  },
  {
    type: "Pro",
    description: "Phù hợp nhu cầu phân tích chuyên sâu",
    price: "7,9 Triệu",
    unit: "năm",
    isHighlight: true,
    permissions: [
      LABEL_PERMISSION_PLAN.searchReport,
      {
        ...LABEL_PERMISSION_PLAN.viewReport,
        sub: Object.values(LABEL_PERMISSION_PLAN.viewReport.sub)
      },
      {
        label: LABEL_PERMISSION_PLAN.numberOfUnlockReport.label(100),
        icon: LABEL_PERMISSION_PLAN.numberOfUnlockReport.icon
      },
      LABEL_PERMISSION_PLAN.customFilterAnalysis
    ]
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
  "/images/brand/Bayer.png",
  "/images/brand/Canifa.png",
  "/images/brand/Coway.png",
  "/images/brand/Dien-Quang.png",
  "/images/brand/everon.png",
  "/images/brand/Guardian.png",
  "/images/brand/Idea.png",
  "/images/brand/Lazada.png",
  "/images/brand/Shisedo.png",
  "/images/brand/Shopee.png",
  "/images/brand/The-gioi-di-dong.png",
  "/images/brand/Thien-long.png",
  "/images/brand/tiki.png",
  "/images/brand/unilever.png",
  "/images/brand/vecom.png",
  "/images/brand/VNlife.png"
];

export const TERM_AND_POLICIES = [
  {
    label: "Chính sách bảo mật thông tin",
    link: NAVIGATIONS.informationPolicy
  },
  // {
  //   label: "Hình thức thanh toán",
  //   link: NAVIGATIONS.paymentMethod
  // },
  {
    label: "Chính sách đổi trả sản phẩm",
    link: NAVIGATIONS.refundPolicy
  },
  {
    label: "Chính sách đặt hàng",
    link: NAVIGATIONS.placeOrderPolicy
  },
  {
    label: "Điều kiện giao dịch chung",
    link: NAVIGATIONS.commonTerm
  }
];

export const COMPANY_INFOS = {
  name: "CÔNG TY CỔ PHẦN KHOA HỌC DỮ LIỆU",
  address: "Tầng 6 Tòa nhà AZ Lâm Viên, 107A Nguyễn Phong Sắc, phường Dịch Vọng Hậu, quận Cầu Giấy, thành phố Hà Nội, Việt Nam",
  phoneNumber: "033.806.2221",
  email: "info@metric.vn"
};

export const CONTACTS = [
  {
    label: COMPANY_INFOS.name,
    icon: "Building"
  },
  {
    label: COMPANY_INFOS.phoneNumber,
    icon: "Phone"
  },
  {
    label: COMPANY_INFOS.email,
    icon: "Envelope"
  },
  {
    label: COMPANY_INFOS.address,
    icon: "MapPin"
  }
];
