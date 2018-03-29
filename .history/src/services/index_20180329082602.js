export const service = {
    getProducts,
    getTopProducts,
    getMostProducts,
    updateProducts,
    createPayment
};

/**
 * Get all products
 */
function getProducts() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`http://localhost:3000/api/products`, requestOptions).then(handleResponse);
}


/**
 * Get top products
 */
function getTopProducts() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`http://localhost:3000/api/products/top`, requestOptions).then(handleResponse);
}

/**
 * Get most products
 */
function getMostProducts() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`http://localhost:3000/api/products/most`, requestOptions).then(handleResponse);
}

/**
 * Update products after bying
 * 
 * @param {*} products 
 */
function updateProducts(products) {
    let ids = products.map(p => p._id);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ids}), 
    };

    return fetch(`http://localhost:3000/api/products`, requestOptions).then(handleResponse);
}

/**
 * Create new payment
 * 
 * @param {*} products 
 */
function createPayment(products) {
    let ids = products.map(p => p._id);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ids}), 
    };

    return fetch(`http://localhost:3000/api/payment`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}