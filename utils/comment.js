import axios from 'axios';
const API_ENDPOINT = 'http://localhost:8000';
const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';

export const getCommentsByTicketId = async (ticketId) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/api/comment/comment/ticket/${ticketId}`, {
            params: { internal: 0 },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Comments By Ticket Id, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const getCommentsByTicketIdInternal = async (ticketId) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/api/comment/comment/ticket/${ticketId}`, {
            params: { internal: 1 },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Comments By Ticket Id Internal, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const addNewComment = async (ticketId, content) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/api/comment/comment`, {
            ticket_id: ticketId,
            content,
        }, {
            params: { internal: 0 },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Add New Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const addNewInternalComment = async (ticketId, content) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/api/comment/comment`, {
            ticket_id: ticketId,
            content,
        }, {
            params: { internal: 1 },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Add New Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
}

export const removeComment = async (commentId) => {
    try {
        const response = await axios.delete(`${API_ENDPOINT}/api/comment/comment/${commentId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Remove Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
}

export const editComment = async (commentId, content) => {
    try {
        const response = await axios.put(`${API_ENDPOINT}/api/comment/comment/${commentId}`, {
            content,
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Edit Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
}