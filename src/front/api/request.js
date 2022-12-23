export const request = async (url, options) => {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    try {
        return await fetch(`http://localhost:5000${url}`, options)
            .then(response => response.json());
    } catch (error) {
        console.error(error);
    }
};