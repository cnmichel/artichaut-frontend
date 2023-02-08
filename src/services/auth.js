import axios from 'axios';

axios.defaults.baseURL = "http://localhost/api"


// Vérification de l'existance du token
export async function verifyToken(token) {
    return await axios.post('/verifyToken', {}, {
        headers: {
            Authorization: `Bearer `+token
        }
    })
}

// Récupération des données de l'utilisateur à partir de son token
export async function getUserByToken(token)
{
    return verifyToken(token).then(async () => {
        return await axios.post('/getUserByToken', {}, {
            headers: {
                Authorization: `Bearer ` + token
            }
        })
    }).catch(({ response }) => {
        if (response.status === 401) {
            console.log('token invalid');
        }
    })
}

// Vérification du role de l'utilisateur
export async function checkAdmin(token) {
            return await getUserByToken(token).then( (user) => {
                    return user.data.user.role_id === 1;
            })

}

// Connexion utilisateur via l'API
export async function login(user) {

    return await axios.post('/login', user);

}