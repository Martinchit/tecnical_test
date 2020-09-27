import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Text } from '../atoms/Text';

interface Props {
  loggedIn: boolean;
  logOutAction: () => void;
}

export const NavBar: React.FC<Props> = ({ loggedIn, logOutAction }) => (
  <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
    <Navbar.Brand as={Link} to="/">
      <Text fontSize={1.5} fontColor="#fff" fontWeight="bold">
        Execution System
      </Text>
    </Navbar.Brand>
    {loggedIn ? (
      <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav defaultActiveKey={window.location.href.split('/').reverse()[0]}>
            <Nav.Link as={Link} to="/stock_list" eventKey="stock_list">
              Stock Lists
            </Nav.Link>
            <Nav.Link as={Link} to="/orders_basket" eventKey="orders_basket">
              Orders Basket
            </Nav.Link>
          </Nav>
          <Nav.Link onClick={logOutAction}>Log Out</Nav.Link>
        </Navbar.Collapse>
      </>
    ) : null}
  </Navbar>
);
