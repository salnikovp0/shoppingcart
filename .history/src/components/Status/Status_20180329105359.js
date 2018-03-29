import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { service } from '../../services';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Status extends Component {
    constructor(props) {
        super(props);

        this.state = {
            top: [],
            most: []
        }
    }

    componentDidMount() {
        Promise.all([service.getTopProducts(), service.getMostProducts()])
            .then( ([top, most]) => {
                this.setState({
                    top,
                    most,
                })
            })
    }

    render() {
        const { top, most } = this.state;

        return (
            <div>
                <ListGroup>
                    <h3>Top:</h3>
                    {top && top.map(prod => (
                        <ListGroupItem key={prod._id}>{prod.name}</ListGroupItem>
                    ))}
                </ListGroup>
                <p />
                <p />
                <ListGroup>
                    <h3>Most:</h3>
                    {most && most.map(prod => (
                        <ListGroupItem key={prod}>{prod}</ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}

Status.propTypes = {
    top: PropTypes.array,
    most: PropTypes.array,
}

export default Status;
