const getAll = async () => {
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

const searchFilms = async (query) => {
    const response = await fetch('https://rj2zi.sse.codesandbox.io/api/films/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(query)
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

// const getAllByQuery = async (query) => {
//     const response = await fetch('https://rj2zi.sse.codesandbox.io/api/films/query', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(query)
//     })
//
//     if (response.status === 200) {
//         const data = await response.json();
//         return {...data}
//     }
//
//     if (response.status === 404) {
//         const data = await response.json();
//         throw new Error(data.message);
//     }
// }

export const FilmService = {
    getAll,
    addFilm,
    removeFilm,
    updateFilm,
    searchFilms,
    //getAllByQuery
}