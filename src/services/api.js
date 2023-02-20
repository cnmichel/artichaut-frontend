import axios from 'axios';

// Axios request config
const config = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

// LANGS API

export async function getLangs() {
    return axios.get('/langs', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// USERS API

export async function getUsers() {
    return axios.get('/users', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getUser(id) {
    return axios.get(`/users/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createUser(data) {
    return axios.post(`/users`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateUser(id, data) {
    return axios.put(`/users/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteUser(id) {
    return axios.delete(`/users/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// CUSTOMERS API

export async function getCustomer(id) {
    return axios.get(`/customers/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createCustomer(data) {
    return axios.post('/customers', data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateCustomer(id, data) {
    return axios.put(`/users/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// REVIEWS API

export async function getReviews() {
    return axios.get('/reviews', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getReview(id) {
    return axios.get(`/reviews/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createReview(data) {
    return axios.post(`/reviews`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateReview(id, data) {
    return axios.put(`/reviews/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteReview(id) {
    return axios.delete(`/reviews/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// ARTICLES API

export async function getArticles() {
    return axios.get('/articles', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getArticle(id) {
    return axios.get(`/articles/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createArticle(data) {
    return axios.post(`/articles`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateArticle(id, data) {
    return axios.put(`/articles/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteArticle(id) {
    return axios.delete(`/articles/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// FEATURES API

export async function getFeatures() {
    return axios.get('/features', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getFeature(id) {
    return axios.get(`/features/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createFeature(data) {
    return axios.post(`/features`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateFeature(id, data) {
    return axios.put(`/features/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteFeature(id) {
    return axios.delete(`/features/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// PRODUCTS API

export async function getProducts() {
    return axios.get('/products', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getProduct(id) {
    return axios.get(`/products/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createProduct(data) {
    return axios.post(`/products`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateProduct(id, data) {
    return axios.put(`/products/${id}`, data, config)
}

export async function deleteProduct(id) {
    return axios.delete(`/products/${id}`, config)
}


// PROMOS API

export async function getPromos() {
    return axios.get('/promos', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getPromo(id) {
    return axios.get(`/promos/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getActivePromo() {
    return axios.get(`/promos/`,
        {
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {active: "1"},
        })
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createPromo(data) {
    return axios.post(`/promos`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updatePromo(id, data) {
    return axios.put(`/promos/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deletePromo(id) {
    return axios.delete(`/promos/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// HEROES API

export async function getHeroes() {
    return axios.get('/heroes', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getHero(id) {
    return axios.get(`/heroes/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createHero(data) {
    return axios.post(`/heroes`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateHero(id, data) {
    return axios.put(`/heroes/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteHero(id) {
    return axios.delete(`/heroes/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// VIDEOS API

export async function getVideos() {
    return axios.get('/videos', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getVideo(id) {
    return axios.get(`/videos/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createVideo(data) {
    return axios.post(`/videos`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateVideo(id, data) {
    return axios.put(`/videos/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteVideo(id) {
    return axios.delete(`/videos/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// SITEMAPS API

export async function getSitemaps() {
    return axios.get('/sitemaps', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getSitemap(id) {
    return axios.get(`/sitemaps/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createSitemap(data) {
    return axios.post(`/sitemaps`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateSitemap(id, data) {
    return axios.put(`/sitemaps/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteSitemap(id) {
    return axios.delete(`/sitemaps/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}


// SOCIALS API

export async function getSocials() {
    return axios.get('/socials', config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function getSocial(id) {
    return axios.get(`/socials/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function createSocial(data) {
    return axios.post(`/socials`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function updateSocial(id, data) {
    return axios.put(`/socials/${id}`, data, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

export async function deleteSocial(id) {
    return axios.delete(`/socials/${id}`, config)
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
}

function errorHandler(error) {
    const { response } = error;
    const message = {
        status: response.status,
        message: response.data.message
    }
    return console.error(message);
}