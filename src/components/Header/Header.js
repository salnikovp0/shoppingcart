import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';


class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/">Products</Link> | 
                <Link to="/cart">Check out</Link> | 
                <Link to="/status">Status</Link> 
                {/* <Nav>
                    <NavItem>
                        <NavLink><Link to="/">Products</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to="/cart">Check out</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to="/status">Status</Link></NavLink>
                    </NavItem>
                </Nav> */}
            </div>
        );
    }

}

export default Header;
