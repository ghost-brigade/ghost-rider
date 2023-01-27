export const request = async (url, options) => {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    try {
        return await fetch(import.meta.env.VITE_API_URL + url, options)
            .then(response => response.json());
    } catch (error) {
        console.error(error);
    }
};
