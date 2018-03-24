import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from '../../containers/Product';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { service } from '../../services';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        service.getProducts()
            .then(products => {
                this.setState({
                    products
                })
            })
    }

    render() {
        const { products } = this.state;


        return (
            <div>
                <h3>Products</h3>
                <ul className="product-list">
                  {products
                    .sort((a, b) => a.popularity - b.popularity)
                    .map(product => (
                      <li key={product.id} className="product-list__item">
                        <Product {...product} />
                      </li>
                  ))}
                </ul>
    
                {this.props.cartItems.length > 0 && <Link to="/cart">
                    <Button>
                        Go to cart
                    </Button> 
                </Link>}
            </div>
        );
    }
}

ProductList.propTypes = {
    products: PropTypes.array,
    cartItems: PropTypes.array,
}

export default ProductList;
