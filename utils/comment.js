import axios from 'axios';
import {getIndexedDB} from "~/helpers/IndexedDBHelper.js";
// const API_ENDPOINT = 'http://localhost:8000';
const config = useRuntimeConfig();
// const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';
export const getCommentsByTicketId = async (ticketId) => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/comment/comment/ticket/${ticketId}`, {
            params: {internal: 0},
            headers: {
                'Accept': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Comments By Ticket Id, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const getCommentsByTicketIdInternal = async (ticketId) => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/comment/comment/ticket/${ticketId}`, {
            params: {internal: 1},
            headers: {
                'Accept': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch Comments By Ticket Id Internal, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const addNewComment = async (ticketId, content) => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.post(`${config.public.API_ENDPOINT}/api/comment/comment`, {
            ticket_id: ticketId,
            content,
        }, {
            params: {internal: 0},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Add New Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
};

export const addNewInternalComment = async (ticketId, content) => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.post(`${config.public.API_ENDPOINT}/api/comment/comment`, {
            ticket_id: ticketId,
            content,
        }, {
            params: {internal: 1},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Add New Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
}

export const removeComment = async (commentId) => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.delete(`${config.public.API_ENDPOINT}/api/comment/comment/${commentId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Remove Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
}

export const editComment = async (commentId, content) => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.put(`${config.public.API_ENDPOINT}/api/comment/comment/${commentId}`, {
            content,
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Edit Comment, status=${e.response?.status}, message=${e.message}`);
        return null;
    }
}