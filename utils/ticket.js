import axios from 'axios';
// const API_ENDPOINT = 'http://localhost:8000';
const config = useRuntimeConfig();
const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';


export const createNewTicket = async ({ title, linkReport, customerEmail, supportDepartment, description, assignedEmails }) => {
    try {
        const response = await axios.post(`${config.public.API_ENDPOINT}/api/ticket/ticket`, {
            title,
            customer_email: customerEmail,
            support_department: supportDepartment,
            description,
            assigned_emails: assignedEmails,
            report_link: linkReport
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Create New Ticket, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const getMyTickets = async (page = 0, limit = 10, filter = undefined, sorter = undefined) => {
    try {
        const payload = {
            page,
            limit,
        };
        if (filter) {
            payload.filter_field = filter.field;
            payload.filter_value = filter.value;
            payload.search = filter.search;
        }
        if (sorter) {
            payload.sort_field = sorter.field;
            payload.sort_order = sorter.order;
        }
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/ticket/my-ticket`, {
            params: payload,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return [response?.data || [], response?.data?.total || 0];
    } catch (e) {
        console.error(`[ERROR] Fetch My Tickets, status=${e.response?.status}, message=${e.message}`);
        return [[], 0];
    }
};

export const getTicketDetail = async (ticketId, isInternal = false) => {
    try {
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/ticket/ticket/${ticketId}`, {
            params: { internal: isInternal },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Ticket Detail, status=${e.response?.status}, message=${e.message}`);
        return undefined;
    }
};


export const getTicketDetailByCode = async (ticketCode, isInternal = false) => {
    try {
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/ticket/ticket/detail/${ticketCode}`, {
            params: { isInternal },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Ticket Detail By Code, status=${e.response?.status}, message=${e.message}`);
        return undefined;
    }
};

export const getTickets = async (page = 0, limit = 10, search = '', filter = {}, sorter = {}) => {
    try {
        const filterParams = {
            created_at: filter.createdAt || { start: '', end: '' },
            resolved_at: filter.resolvedAt || { start: '', end: '' },
            priority: filter.priority || '',
            status: filter.status || '',
            incharge_by: filter.personIncharge || '',
            owned_by: filter.owner || '',
            report_by: filter.reporter || '',
            cc_user: filter.cc_user || '',
            support_department: filter.supportDepartment || ''
        };

        const payload = {
            page,
            limit,
            filter_params: JSON.stringify(filterParams)
        };

        if (search) {
            payload.search = search;
        }
        if (sorter.field && sorter.order) {
            payload.sort_field = sorter.field;
            payload.sort_order = sorter.order;
        }

        const response = await axios.get(`${config.public.API_ENDPOINT}/api/ticket/tickets`, {
            params: payload,
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return [response?.data, response?.data?.total];
    } catch (e) {
        console.error(`[ERROR] Fetch Tickets, status=${e.response?.status}, message=${e.message}`);
        return undefined;
    }
};

export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'low':
            return 'success'
        case 'normal':
            return 'warning'
        case 'high':
            return 'danger'
        default:
            return 'default'
    }
}

export const getPriorityText = (priority) => {
    switch (priority) {
        case 'low':
            return 'Ưu tiên thấp'
        case 'normal':
            return 'Cần làm'
        case 'high':
            return 'Ưu tiên cao'
        default:
            return 'Không xác định'
    }
}

// export const reassignTicket = async (ticketId, staffId) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'reassign',
//             subject: staffId,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Reassign Ticket, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//

export const updateTicket = async (ticketId, payload) => {
    try {
        const response = await axios.put(`${config.public.API_ENDPOINT}/api/ticket/ticket/${ticketId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Update Ticket, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

// export const closeTicket = async (ticketId, subject) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'resolve',
//             subject: subject,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Close Ticket, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
//
// export const reopenTicket = async (ticketId) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'reopen',
//             subject: '',
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Reopen Ticket, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
// export const changeTicketPriority = async (ticketId, priority) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_priority',
//             subject: priority,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change Ticket Priority, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
// export const changeTicketStatus = async (ticketId, status) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_status',
//             subject: status,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change Ticket Status, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
// export const changeTicketInCharge = async (ticketId, staffId) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_incharge',
//             subject: staffId,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change Ticket In Charge, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
// export const changeTicketDepartment = async (ticketId, supportDepartment) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_support_department',
//             subject: supportDepartment,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change Ticket Department, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
// export const changeTicketDueDate = async (ticketId, dueDate) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_due_date',
//             subject: dueDate,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change Ticket Due Date, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
//
// export const changeTicketCc = async (ticketId, cc) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_cc',
//             subject: cc,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change Ticket CC, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//
//
// export const changeSupportDepartment = async (ticketId, supportDepartment) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_support_department',
//             subject: supportDepartment,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change Support Department, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
//

export const getSupportDepartmentName = (supportDepartmentId) => {
    const mappingSupportDepartmentName = {
        'service_support': 'Hỗ trợ dịch vụ',
        'technical_support': 'Hỗ trợ kỹ thuật',
    }
    return mappingSupportDepartmentName[supportDepartmentId] || 'Không xác định';
}

//
// export const getSupportDepartmentColor = (supportDepartmentId) => {
//     const mappingSupportDepartmentColor = {
//         'service_support': 'blue',
//         'technical_support': 'orange',
//     }
//     return mappingSupportDepartmentColor[supportDepartmentId] || 'default';
// }
//
//
export const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'warning'
        case 'accepted':
            return 'warning'
        case 'processing':
            return 'default'
        case 'done':
            return 'success'
        default:
            return 'default'
    }
}


export const getStatusText = (status) => {
    switch (status) {
        case 'pending':
            return 'Đang chờ tiếp nhận'
        case 'accepted':
            return 'Đã tiếp nhận'
        case 'processing':
            return 'Đang xử lý'
        case 'done':
            return 'Đã hoàn thành'
        default:
            return 'Không xác định'
    }
}

//
// export const changeMktTagline = async (ticketId, tagline) => {
//     const {$api} = useNuxtApp();
//     try {
//         const response = await $api.ticket.updateByAction(ticketId, {
//             action_type: 'change_mkt_tagline',
//             subject: tagline,
//         });
//         return response?.data;
//     } catch (e) {
//         console.error(`[ERROR] Change MKT Tagline, status=${e.response?.status}, message=${e.message}`)
//         return null;
//     }
// }
