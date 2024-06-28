import type { CommonOptionItem } from "./types";

export const NAVIGATIONS = {
  search: "/search",
  home: "/",
  report: "/reports",
  pricing: "/pricing",
  contactUs: "/contact-us",
  signIn: "/sign-in"
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

export const CONTACTS = [
  {
    label: "CÔNG TY CỔ PHẦN KHOA HỌC DỮ LIỆU",
    icon: "Building"
  },
  {
    label: "033.806.2221",
    icon: "Phone"
  },
  {
    label: "info@metric.vn",
    icon: "Envelope"
  },
  {
    label: "Tầng 6 Tòa nhà AZ Lâm Viên, 107A Nguyễn Phong Sắc, phường Dịch Vọng Hậu, quận Cầu Giấy, thành phố Hà Nội, Việt Nam",
    icon: "MapPin"
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
  "/images/branch/vietnamnet.png",
  "/images/branch/tuoitre.png",
  "/images/branch/vtv.png",
  "/images/branch/vnexpress.png",
  "/images/branch/dantri.png",
  "/images/branch/thanhnien.png"
];

export const PARTERS = [
  "/images/branch/branch1.png",
  "/images/branch/guardian.png",
  "/images/branch/lazada.png",
  "/images/branch/shopee.png",
  "/images/branch/themobileworld.png",
  "/images/branch/tiki.png",
  "/images/branch/unilever.png"
];
