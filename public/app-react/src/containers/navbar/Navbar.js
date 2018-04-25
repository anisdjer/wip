/*
<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Brand</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Navbar.Text>
      Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
    </Navbar.Text>
    <Navbar.Text pullRight>Have a great day!</Navbar.Text>
  </Navbar.Collapse>
</Navbar>
*/
import React, { Component } from 'react';
import { Navbar as BsNavbar } from "react-bootstrap";

class Navbar extends Component {
    render() {
        return (
            <BsNavbar>
                <BsNavbar.Header>
                    <BsNavbar.Brand>
                    <a href="#home">Brand</a>
                    </BsNavbar.Brand>
                    <BsNavbar.Toggle />
                </BsNavbar.Header>
                <BsNavbar.Collapse>
                    <BsNavbar.Text>
                    Signed in as: <BsNavbar.Link href="#">Mark Otto</BsNavbar.Link>
                    </BsNavbar.Text>
                    <BsNavbar.Text pullRight>Have a great day!</BsNavbar.Text>
                </BsNavbar.Collapse>
            </BsNavbar>
        );
    }
}

export default Navbar;
