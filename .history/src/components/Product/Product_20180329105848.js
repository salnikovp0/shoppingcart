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
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Button</Button>
                </CardBody>
            </Card>
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
