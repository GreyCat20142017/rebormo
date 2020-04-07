export const initialState = {
    isLoading: false,
    isLoggedIn: null,
    currentUser: null,
    error: null
};
export const reducer = (state, action) => {

    switch (action.type) {
        case 'LOADING':
            return {...state, isLoading: true, error: null};
        case 'LOGIN':
            return {
                isLoading: false,
                isLoggedIn: true,
                currentUser: action.payload,
                error: null
            };
        case 'LOGOUT':
            return {
                isLoggedIn: false,
                isLoading: false,
                currentUser: null,
                error: null
            };
        case 'ERROR':
            return {
                isLoggedIn: false,
                currentUser: null,
                isLoading: false,
                error: 'Ошибка при получении данных по токену ' + action.payload
            };
        default:
            return state;
    }
};