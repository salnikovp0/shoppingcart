import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ name, price }) => {
    return (
        <div className="cart-item">
            <div>
                <span className="cart-item__name">{name}</span>
            </div>
            <div className="cart-item__price">{price} EUR</div>
        </div>
    );
}

CartItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}

export default CartItem;
