import { connect } from 'react-redux';
import ProductList from '../components/ProductList';
import { getProducts, getAll } from '../ducks/products';
import { getItems } from '../ducks/cart';

const mapStateToProps = (state, props) => {
    return {
        products: getProducts(state, props),
        cartItems: getItems(state, props),
        
    }
}

const mapDispatchToProps = {
    getProducts: getAll,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
