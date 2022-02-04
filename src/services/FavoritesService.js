const addToFavorites = async (film) => {
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
            return await response.json();
        }

        if (response.status === 404) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const getFavorites = async () => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));

        const response = await fetch(`https://rj2zi.sse.codesandbox.io/api/favorites/${auth.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + auth.token,
            }
        })

        if (response.status === 200) {
            return await response.json();
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
    addToFavorites,
    getFavorites
}