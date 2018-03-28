import { service } from '../services';

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
    return [
        ...state,
        ...payload.products
    ];
}

export function getAll() {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            let products = await service.getProducts(); 
            dispatch({type: PRODUCTS_GET_ALL, payload: { products }});
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
    
}

// selectors
export function getProducts(state, props) {
    return state.products;
}

export function getProduct(state, props) {
    return state.products.find(item => item._id === props.id);
}