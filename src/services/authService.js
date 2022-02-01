const signIn = async (email, password) => {
    try {
        const response = await fetch('https://rj2zi.sse.codesandbox.io/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password})
        })
        if (response.status === 200) {
            const data = await response.json();

            localStorage.setItem('auth', JSON.stringify(data.data));

            return {...data}
        }
        if (response.status === 400) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const signUp = async (email, password) => {
    try {
        const response = await fetch('https://rj2zi.sse.codesandbox.io/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password})
        })
        if (response.status === 201) {
            const data = await response.json();
            localStorage.setItem('auth', JSON.stringify({token: data.data.token}));
        }
        if (response.status === 409) {
            const data = await response.json();
            throw new Error(data.message);
        }
        if (response.status === 400) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const signOut = () => {
    localStorage.removeItem('auth');
}

export const authService = {
    signIn,
    signOut,
    signUp
}