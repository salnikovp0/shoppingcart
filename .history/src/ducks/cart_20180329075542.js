import { getProduct } from '../ducks/products';
import  { service }  from '../services';

// actions
const CART_ADD   = 'cart/ADD';
const CART_REMOVE = 'cart/REMOVE';
const CART_SEND_EMAIL = 'cart/SEND_EMAIL';
const CART_CLEAR = 'cart/CLEAR';

// reducer
const initialState = {
    items: [], // array of product ids
    currency: 'EUR'
};

export default function cart(state = initialState, action = {}) {
    switch (action.type) {
        case CART_ADD:
            return handleCartAdd(state, action.payload);
        case CART_REMOVE:
            return handleCartRemove(state, action.payload);
        case CART_SEND_EMAIL:
            return state;
        case CART_CLEAR:
            return initialState;
        default:
            return state;
    }
}

function handleCartAdd(state, payload) {
    return {
        ...state,
        items: [ ...state.items, payload.productId ]
    };
}

function handleCartRemove(state, payload) {
    return {
        ...state,
        items: state.items.filter(id => id !== payload.productId)
    };
}

// action creators
export function addToCart(productId) {
    return {
        type: CART_ADD,
        payload: {
            productId
        }
    }
}

export function removeFromCart(productId) {
    return {
        type: CART_REMOVE,
        payload: {
            productId
        }
    }
}

export function sendEmail(email, items) {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                await service.updateProducts(items);
                await service.createPayment(items);
                dispatch({type: CART_SEND_EMAIL})
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}

export function clearCart() {
    return (dispatch) => dispatch({ type: CART_CLEAR })
}

// selectors
export function isInCart(state, props) {
    return state.cart.items.indexOf(props._id) !== -1;
}

export function canAdd(state, props) {
    return state.cart.items.length < 5;
}

export function getItems(state, props) {
    return state.cart.items.map(id => getProduct(state, { id }));
}

export function getCurrency(state, props) {
    return state.cart.currency;
}

export function getTotal(state, props) {
    return state.cart.items.reduce((acc, id) => {
        const item = getProduct(state, { id });
        return acc + item.price;
    }, 0);
}
