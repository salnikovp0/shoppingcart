import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { getItems, sendEmail, clearCart } from '../ducks/cart';

const mapStateToProps = (state, props) => {
    return {
        items: getItems(state, props)
    }
}

const mapDispatchToProps = {
    sendEmail: sendEmail,
    clearCart: () => clearCart()
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
