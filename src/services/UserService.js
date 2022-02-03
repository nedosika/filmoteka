const update = async (user) => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        console.log(auth.token)
        const response = await fetch(`https://rj2zi.sse.codesandbox.io/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + auth.token,
            },
            body: JSON.stringify(user),
        })

        if (response.status === 201) {
            const data = await response.json();
            return {...data}
        }

        if (response.status === 404) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const get = async (id) => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));

        const response = await fetch(`https://rj2zi.sse.codesandbox.io/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + auth.token,
            }
        })

        if (response.status === 200) {
            const data = await response.json();
            return {...data}
        }

        if (response.status === 404) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const addFilmToFavorites = async (film) => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));

        const response = await fetch(`https://rj2zi.sse.codesandbox.io/api/favorites/${auth.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + auth.token,
            },
            body: JSON.stringify(film),
        })

        if (response.status === 201) {
            const data = await response.json();
            return {...data}
        }

        if (response.status === 404) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    addFilmToFavorites,
    update,
    get
}

