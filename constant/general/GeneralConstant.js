const ALL_COUNTRY_SUPPORTED = {
    china: 'Trung Quốc',
    vietnam: 'Việt Nam',
}

const PLATFORM_ID_OBJECT = {
    shopee: 1,
    lazada: 2,
    tiki: 3,
    sendo: 4,
    all_vietnam: 'c',
    _1688: 5,
    taobao: 6,
    tmall: 7,
    tiktok: 8
}

const ALL_PLATFORM_BASE_OBJECT = {
    /**
     * uniqueName: property to refer other object
     */
    shopee: {
        platform_id: PLATFORM_ID_OBJECT.shopee,
        name: 'Shopee',
        uniqueName: 'shopee', //property to refer other object,
        sortDefault: 'order_revenue',
        color: '#F4915A',
        urlLogo: 'https://lh3.googleusercontent.com/mvI9jsrKjP7Q7ZqYOXuJTRZF9Q1e4PZJjjmNAyzh6OKtxtSUNPK920MMFsXploU60VPMqHCdJLEMzaEF_ktvIXuII2IEamnw0Cr5Cb97_803ePqQQYOLtHQLrVUe9e2DPZ3MoxTp',
        country: ALL_COUNTRY_SUPPORTED.vietnam,
    },
    /**
     * uniqueName: property to refer other object
     */
    lazada: {
        platform_id: PLATFORM_ID_OBJECT.lazada,
        name: 'Lazada',
        uniqueName: 'lazada',
        sortDefault: 'order_revenue',
        color: '#E25A5A',
        urlLogo: 'https://laz-img-cdn.alicdn.com/tfs/TB1ODo.f2b2gK0jSZK9XXaEgFXa-64-64.png',
        country: ALL_COUNTRY_SUPPORTED.vietnam,
    },
    /**
     * uniqueName: property to refer other object
     */
    tiki: {
        platform_id: PLATFORM_ID_OBJECT.tiki,
        name: 'Tiki',
        uniqueName: 'tiki',
        sortDefault: 'order_revenue',
        color: '#5997F5',
        urlLogo: 'https://lh3.googleusercontent.com/-Rwy9DczZyAbvIivqO1fAmSWRw0cThG3fRXMjOOVsOtTiDlAdMUff8N_zmvCxI8CGzH-dWZdQNXFIGhmaR4Mc8J0GrkZwKL-MvsjsOdLw_9Aa9xJjVAKED4MCb1OtggIcnWFUPwRQQ',
        country: ALL_COUNTRY_SUPPORTED.vietnam,
    },
    /**
     * uniqueName: property to refer other object
     */
    sendo: {
        platform_id: PLATFORM_ID_OBJECT.sendo,
        name: 'Sendo',
        uniqueName: 'sendo',
        sortDefault: 'order_revenue',
        color: '#FBD0D8',
        urlLogo: 'https://lh3.googleusercontent.com/f7BgeL7wuw-UN_K66Ufiw63jZuJxWhQsz3XC0fZcvxUyJetPF3yvAT0-floqa7hPKwAn7taW0AS0myVVYH3yp6dUR_soEmCQSugI0CQWyFctBWVQ8r3ljxKasQgE1zETnxNWVlcnog',
        country: ALL_COUNTRY_SUPPORTED.vietnam,
    },
    /**
     * uniqueName: property to refer other object
     */
    tiktok: {
        platform_id: PLATFORM_ID_OBJECT.tiktok,
        name: 'Tiktok',
        uniqueName: 'tiktok',
        sortDefault: 'order_revenue',
        color: '#000000',
        urlLogo: 'https://lh3.googleusercontent.com/pw/AP1GczP5YyL_j5ffCPbOHVQPyepUK9esU8PIKguUjrbbopd1_LfSNymt5ta9e3ArF6O4dEPlw7nFBiA08DISep8LNiRtjbeBOrTn9CsUCEF8gpMfavPBjipqiIWwCo3KGYBPIK0MwXZczXo60axCyE48tSdM=w32-h33-s-no-gm',
        country: ALL_COUNTRY_SUPPORTED.vietnam
    },
    /**
     * uniqueName: property to refer other object
     */
    all_vietnam: {
        platform_id: PLATFORM_ID_OBJECT.all_vietnam,
        platformIdsIncluded: [
            PLATFORM_ID_OBJECT.shopee,
            PLATFORM_ID_OBJECT.lazada,
            PLATFORM_ID_OBJECT.tiki,
            PLATFORM_ID_OBJECT.sendo,
            PLATFORM_ID_OBJECT.tiktok
        ],
        name: 'Tất cả',
        uniqueName: 'all_vietnam', //property to refer other object,
        sortDefault: 'order_revenue',
        color: '',
        urlLogo: '',
        country: ALL_COUNTRY_SUPPORTED.vietnam,
    },
    /**
     * uniqueName: property to refer other object
     */
    _1688: {
        country: ALL_COUNTRY_SUPPORTED.china,
        platform_id: PLATFORM_ID_OBJECT._1688,
        name: '1688',
        uniqueName: '_1688',
        sortDefault: 'order_revenue',
        urlLogo: 'https://img.alicdn.com/tps/TB1K3LKPpXXXXX2XXXXXXXXXXXX-111-38.png',
    },
    /**
     * uniqueName: property to refer other object
     */
    taobao: {
        country: ALL_COUNTRY_SUPPORTED.china,
        platform_id: PLATFORM_ID_OBJECT.taobao,
        name: 'Taobao',
        uniqueName: 'taobao',
        sortDefault: 'order_revenue',
        urlLogo: 'https://img.alicdn.com/tps/TB1K3LKPpXXXXX2XXXXXXXXXXXX-111-38.png',
    },
    /**
     * uniqueName: property to refer other object
     */
    tmall: {
        country: ALL_COUNTRY_SUPPORTED.china,
        platform_id: PLATFORM_ID_OBJECT.tmall,
        name: 'Tmall',
        uniqueName: 'tmall',
        sortDefault: 'order_revenue',
        urlLogo: 'https://img.alicdn.com/tps/TB1K3LKPpXXXXX2XXXXXXXXXXXX-111-38.png',
    }
}

const ALL_CHART_TAB = {
    revenue: {
        name: 'revenue',
        generalStatisticName: 'revenue',
        storeName: 'revenue',
        apiKey: 'REVENUE',
        label: 'Doanh số',
        iconType: 'dollar'
    },
    orderCount: {
        name: 'orderCount',
        generalStatisticName: 'orderCount',
        storeName: 'orderCount',
        apiKey: 'ORDER_COUNT',
        label: 'Số sản phẩm đã bán',
        iconType: 'unordered-list'
    },
    commission: {
        name: 'commission',
        generalStatisticName: 'commission',
        storeName: 'commission',
        apiKey: 'COMMISSION',
        label: 'Hoa hồng Marketing',
        iconType: 'dollar'
    },
    reviewCount: {
        name: 'reviewCount',
        generalStatisticName: 'reviewCount',
        storeName: 'reviewCount',
        apiKey: 'REVIEW_COUNT',
        label: 'Số đánh giá',
        iconType: 'unordered-list'
    },
}

const ALL_GENERAL_STATISTIC = {
    [ALL_CHART_TAB.revenue.generalStatisticName]: {
        name: ALL_CHART_TAB.revenue.generalStatisticName,
        storeNameDetailStatistic: 'revenueTotalDetail',
        apiKeyDetailStatistic: 'order_revenue',
        storeName: 'revenueTotal',
        apiKey: 'REVENUE_TOTAL',
        label: 'Doanh số',
        unit: 'VNĐ'
    },
    [ALL_CHART_TAB.orderCount.generalStatisticName]: {
        name: ALL_CHART_TAB.orderCount.generalStatisticName,
        storeNameDetailStatistic: 'orderTotalDetail',
        apiKeyDetailStatistic: 'order_count',
        storeName: 'orderTotal',
        apiKey: 'ORDER_TOTAL',
        label: 'Sản phẩm đã bán',
        unit: 'Sp'
    },
    [ALL_CHART_TAB.commission.generalStatisticName]: {
        name: ALL_CHART_TAB.commission.generalStatisticName,
        storeNameDetailStatistic: null,
        storeName: 'commissionTotal',
        apiKey: 'COMMISION_TOTAL',
        label: 'Hoa hồng Marketing',
        unit: 'VNĐ'
    },
    [ALL_CHART_TAB.reviewCount.generalStatisticName]: {
        name: ALL_CHART_TAB.reviewCount.generalStatisticName,
        storeNameDetailStatistic: null,
        storeName: 'reviewTotal',
        apiKey: 'REVIEW_TOTAL',
        label: 'Lượt Đánh giá',
        unit: 'Lượt'
    },
    product: {
        name: 'product',
        storeNameDetailStatistic: null,
        storeName: 'productTotal',
        apiKey: 'PRODUCT_TOTAL',
        label: 'Sản phẩm có lượt bán',
        unit: 'Sp'
    },
    shop: {
        name: 'shop',
        storeNameDetailStatistic: null,
        storeName: 'shopTotal',
        apiKey: 'SHOP_TOTAL',
        label: 'Shop có lượt bán',
        unit: 'Shop'
    },
}

export {
    PLATFORM_ID_OBJECT,
    ALL_PLATFORM_BASE_OBJECT,
    ALL_COUNTRY_SUPPORTED,
    ALL_GENERAL_STATISTIC
}
