export const service = {
    getProducts,
    getTopProducts,
    getMostProducts
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
function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}