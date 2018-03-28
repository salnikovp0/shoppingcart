import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class Cart extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: ''
        }

        this.sendEmail = this.sendEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    sendEmail() {
        // todo call to action with email and cart items
        this.props.sendEmail(this.state.email, this.props.items)
            .then(() => {
                console.log('promise return send email')
                // clear the shopping cart
                this.props.clearCart();
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(event) {
        this.setState({
          ...this.state,
          [event.target.name]: event.target.value,
        });
      }
    
    render() {
        const { items } = this.props;

        return (
            <div>
                <h3>Shopping Cart</h3>
    
                <div className="cart">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {items.length > 0 && (
                                <div className="cart__body">
                                    {items.map(item => (
                                        <CartItem key={item._id} {...item} />
                                    ))}
                                </div>
                            )}
                            {items.length === 0 && (
                                <div className="alert alert-info">Cart is empty</div>
                            )}
                        </div>
                    </div>
                </div>
    
                {/* add input for an email */}
                <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange} 
                        placeholder="username@email.com" />
                </InputGroup>
                
                {/* send on click the email with the list of cart */}
                <Button onClick={this.sendEmail}>Send mail</Button>
            </div>
        );
    }
    
}

Cart.propTypes = {
    items: PropTypes.array,
}

export default Cart;
