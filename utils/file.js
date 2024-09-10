import axios from 'axios';
const config = useRuntimeConfig();
const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';

class FileModule {
    async uploadFile(file) {
        if (!file) {
            throw new Error('No file provided');
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                `${config.public.API_ENDPOINT}/api/comment/pictures/upload`, // Use the config object directly
                formData,
                {
                    headers: {
                        'x-api-key': 'beecost',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            return response.data;
        } catch (e) {
            console.error(`[ERROR] File upload failed, status=${e.response?.status}, message=${e.message}`);
            throw e;
        }
    }
}

export default FileModule;