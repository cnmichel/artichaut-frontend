import axios from 'axios';

// Axios request config
const config = (token) => ({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

// Vérification de l'existance du token
export async function verifyToken(token) {
    return await axios.post('/verifyToken', {}, config(token))
}

// Récupération des données de l'utilisateur à partir de son token
export async function getUserByToken(token)
{
    return verifyToken(token).then(async () => {
        return await axios.post('/getUserByToken', {}, config(token))
    }).catch(({ response }) => {
        if (response.status === 401) {
            console.log('token invalid');
        }
    })
}

// Vérification du role de l'utilisateur
export async function checkAdmin(token) {
    return await getUserByToken(token).then((user) => {
        return user.data.user.role_id === 1;
    })
}

// Connexion utilisateur via l'API
export async function login(user) {
    return await axios.post('/login', user, config());
}

export async function revokeToken(token) {
    return await axios.post('/revokeToken', {}, config(token))
        .catch(({ response }) => {
            if (response.status === 401) {
                console.log('false');
            }
        })
}