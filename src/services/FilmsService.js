const getAll = async () => {
    try {
        const response = await fetch('https://rj2zi.sse.codesandbox.io/api/films', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
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
};

const addFilm = async (film) => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const response = await fetch('https://rj2zi.sse.codesandbox.io/api/films', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + auth.token,
            },
            body: JSON.stringify(film)
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

const removeFilm = async (id) => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const response = await fetch(`https://rj2zi.sse.codesandbox.io/api/films/${id}`, {
            method: 'DELETE',
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

export const FilmService = {
    getAll,
    addFilm,
    removeFilm
}