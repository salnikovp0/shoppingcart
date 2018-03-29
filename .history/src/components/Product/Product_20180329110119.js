import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

class Product extends Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false
        }

        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { _id, addToCart, removeFromCart, isInCart, canAdd } = this.props;

        if(!(canAdd || isInCart)) {
            this.setState({
                modal: true
            })
            
            return;

        }

        if (isInCart) {
            removeFromCart(_id);
        } else {
            addToCart(_id);
        }
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render() {
        const { name, price, currency, image, isInCart, canAdd } = this.props;

        return (
            <div>
                <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardSubtitle>{price} {currency}</CardSubtitle>
                    <Button className={isInCart ? 'btn btn-danger' : 'btn btn-primary'}
                            onClick={this.handleClick}>{isInCart ? 'Remove' : 'Add to cart'}</Button>
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Attention</ModalHeader>
                    <ModalBody>
                        The Cart is full, maximum aloud is 5 products
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

Product.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    currency: PropTypes.string,
    image: PropTypes.string,
    isInCart: PropTypes.bool.isRequired,
    canAdd: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
}

export default Product;
