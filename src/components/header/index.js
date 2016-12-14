import React, { PropTypes } from 'react';
import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink,Container } from 'reactstrap';
import './header.css'

const Header = ({checkAuth, signOut}) => {

    const btn = (
      <Button  onClick={signOut} color="primary" className="search-box__btn" >Logout</Button>
    )

    const logout = checkAuth ? btn : null


    return (
        <Navbar className="header" color="faded" light>
            <Container>

            <NavbarBrand href="/">Notes App</NavbarBrand>

            <Nav className="float-xs-right" navbar className="header__btns">
                <NavItem>
                    {logout}
                </NavItem>

                <NavItem>
                    <NavLink  href="https://github.com/reactstrap/reactstrap"  >Github</NavLink>
                </NavItem>
            </Nav>

            </Container>
        </Navbar>

    )
}

Header.propTypes = {
    checkAuth: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
};

export default Header;
