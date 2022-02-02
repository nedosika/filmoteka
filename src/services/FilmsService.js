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

export const FilmService = {
    getAll
}