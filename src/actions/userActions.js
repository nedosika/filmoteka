import UserService from "../services/UserService";

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

const request = () => ({
  type: USER_REQUEST
});

const success = (payload) => ({
    type: USER_SUCCESS,
    payload
});

const failure = (payload) => ({
    type: USER_FAILURE,
    payload
});

// const updateUser = (user) => (dispatch) => {
//     dispatch(request());
//     UserService
//         .update(user)
//         .then(({data}) => {
//             dispatch(success(data))
//         })
//         .catch((error) => {
//             dispatch(failure(error.message))
//         })
// }

// const addToFavorites = (film) => (dispatch) => {
//     console.log(film)
//     dispatch(request());
//     UserService
//         .addFilmToFavorites(film)
//         .then((data) => {
//             console.log(data)
//             dispatch(success(data))
//         })
//         .catch((error) => dispatch(failure(error.message)))
// }

export const getUser = () => (dispatch) => {
    const auth = JSON.parse(localStorage.getItem('auth'));

    dispatch(request());

    UserService
        .get(auth.id)
        .then(({data}) => {
            dispatch(success(data));
        })
        .catch((error) => dispatch(failure(error.message)))
}

export default {
    getUser
}

