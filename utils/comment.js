import axios from 'axios';
const API_ENDPOINT = 'http://localhost:8000';

export const getCommentsByTicketId = async (ticketId) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/api/comment/comment/ticket/${ticketId}`, {
            params: { internal: 0 },
            headers: {
                'Accept': 'application/json',
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Comments By Ticket Id, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const getCommentsByTicketIdInternal = async (ticketId) => {
    const {$api} = useNuxtApp();
    try {
        const response = await $api.comment.listByTicketId(ticketId, 1);
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Comments By Ticket Id Internal, status=${e.response?.status}, message=${e.message}`)
        return null;
    }
}

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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZGlzcGxheV9uYW1lIjoiRHV5IENcdTAxYjBcdTAxYTFuZyBMXHUwMGVhIiwiZmFtaWx5X25hbWUiOiIgTFx1MDBlYSIsImdpdmVuX25hbWUiOiJEdXkgQ1x1MDFiMFx1MDFhMW5nIiwidXJsX3RodW1ibmFpbCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lIa3JJcFk5WFRFYXZ5dXNvLW5nRkl3ajRacThQQUxGU09Fa2lpQ25qa0hrempzVzQ9czEwMCIsImVtYWlsIjoiY3VvbmdsZEBtZXRyaWMudm4iLCJleHAiOjE3MjYwNjM0NTN9.djjPIb9Ocb1BftjNvrMujWJwERaChODizs9I19ncW7o',
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Add New Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const addNewInternalComment = async (ticketId, content) => {
    const {$api} = useNuxtApp();
    try {
        const response = await $api.comment.create({
            ticket_id: ticketId,
            content,
        }, 1);
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Add New Internal Comment, status=${e.response?.status}, message=${e.message}`)
        return null;
    }
}

export const removeComment = async (commentId) => {
    const {$api} = useNuxtApp();
    try {
        const response = await $api.comment.remove(commentId);
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Remove Comment, status=${e.response?.status}, message=${e.message}`)
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
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Edit Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
}