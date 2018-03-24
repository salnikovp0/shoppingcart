// actions
const STATUS_GET_TOP_3_SUCCESS   = 'status/GET_TOP_3';
const STATUS_GET_MOST_3_SUCCESS = 'status/GET_MOST_3';

// reducer
const initialState = {
    top: [],
    most: []
};

export default function status(state = initialState, action = {}) {
    switch (action.type) {
        case STATUS_GET_TOP_3_SUCCESS:
            return handleTop(state, action.payload);
        case STATUS_GET_MOST_3_SUCCESS:
            return handleMost(state, action.payload);
        default:
            return state;
    }
}

function handleTop(state, payload) {
    return {
        ...state,
        top: [ payload.top ]
    };
}

function handleMost(state, payload) {
    return {
        ...state,
        most: [ payload.most ]
    };
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
export function getTop3(email, items) {
    return (dispatch) => {
        return new Promise((resolve, reject) => { // TODO async

            try {
                // try to call to send email with async await
                let items;
                resolve(dispatch({type: STATUS_GET_TOP_3_SUCCESS, payload: { top: items}}));
            } catch (error) {
                reject();
            }
        });
    }
}

export function getMost3(email, items) {
    return (dispatch) => {
        return new Promise((resolve, reject) => { // TODO async

            try {
                // try to call to send email with async await
                let items;
                resolve(dispatch({type: STATUS_GET_MOST_3_SUCCESS, payload: { top: items}}));
            } catch (error) {
                reject();
            }
        });
    }
}

// selectors
export function getTop3Products(state, props) {
    return state.top;
}

export function getMostSelling3Products(state, props) {
    return state.most
}