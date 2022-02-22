const getOne = async (id) => {
    const response = await fetch(`https://rj2zi.sse.codesandbox.io/api/films/${id}`, {
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
};

const getAll = async (params) => {
    const url = new URL("https://rj2zi.sse.codesandbox.io/api/films");

    params && Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    if (response.status === 200) {
        const {data, page, limit, size} = await response.json();
        const byId = Object.assign(
            {},
            ...data.map(({id, ...film}) => ({[id]: film}))
        );
        const allIds = data.map((film) => film.id);

        return {
            byId,
            allIds,
            page: +page,
            pages: Math.ceil(size / limit)
        }
    }

    if (response.status === 404) {
        const data = await response.json();
        throw new Error(data.message);
    }
};

const addFilm = async (film) => {
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
}

const removeFilm = async (id) => {
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
}

const updateFilm = async (film) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const response = await fetch(`https://rj2zi.sse.codesandbox.io/api/films/${film.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + auth.token,
        },
        body: JSON.stringify(film)
    })

    if (response.status === 200) {
        const data = await response.json();
        return {...data}
    }

    if (response.status === 404) {
        const data = await response.json();
        throw new Error(data.message);
    }
}

export const FilmService = {
    getOne,
    getAll,
    addFilm,
    removeFilm,
    updateFilm,
}