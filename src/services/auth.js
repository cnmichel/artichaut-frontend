import axios from 'axios';

axios.defaults.baseURL = "http://localhost/api"


export function verifyToken(token) {
    return axios.post('/verifyToken', {}, {
        headers: {
            Authorization: `Bearer `+token
        }
    })
}

export function getUserByToken(token)
{
    return verifyToken(token).then(() => {
        console.log('token :)')
        return axios.post('/getUserByToken', {}, {
            headers: {
                Authorization: `Bearer `+token
            }
        })
    }).catch(({ response }) => {
        if (response.status === 401) {
            console.log('token :(');
        }
    })
}

export function checkAdmin(token) {
            return getUserByToken(token).then((user) => {
                if (user) {
                    return user.data.user.role_id === 1;

                }

            })

}
export async function login(user) {

    return await axios.post('/login', user);

}