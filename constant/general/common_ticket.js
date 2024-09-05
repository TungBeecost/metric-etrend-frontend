export const statusOptions = [
    {label: 'Đang chở tiếp nhận', value: 'pending'},
    {label: 'Đã tiếp nhận', value: 'accepted'},
    {label: 'Đang xử lý', value: 'processing'},
    {label: 'Đã hoàn thành', value: 'done'},
];

export const supportDepartmentOptions = [
    {label: 'Hỗ trợ dịch vụ', value: 'service_support'},
    {label: 'Hỗ trợ kỹ thuật', value: 'technical_support'}
];

export const priorityOptions = [
    {label: 'Ưu tiên thấp', value: 'low'},
    {label: 'Cần làm', value: 'normal'},
    {label: 'Ưu tiên cao', value: 'high'},
];

export const resolveAsOptions = [
    {label: 'Hoàn thành', value: 'done'},
    {label: 'Không hợp lệ', value: 'invalid'},
    {label: 'Trùng lặp', value: 'duplicate'},
    {label: 'Không cần làm', value: 'wontfix'},
];
