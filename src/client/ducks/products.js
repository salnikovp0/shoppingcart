import service from '../services';

// actions
const PRODUCTS_GET_ALL   = 'products/GET_ALL';

// reducer
export default function products(state = [], action = {}) {
    switch (action.type) {
        case PRODUCTS_GET_ALL:
            return handleGetAll(state, action.payload);
    default:
        return state; // nothing to do here, but we need products node in redux store
    }
}

// action creators
function handleGetAll(state, payload) {
    return {
        ...state,
        products: [...payload.products]
    };
}

export function getAll() {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => { // TODO async

            try {
                let products = await service.getAll()// try to call to send email with async await

                resolve(dispatch({type: PRODUCTS_GET_ALL, payload: {products}}));
            } catch (error) {
                reject();
            }
        });
    }
}

// selectors
export function getProducts(state, props) {
    return state.products;
}

export function getProduct(state, props) {
    return state.products.find(item => item.id === props.id);
}