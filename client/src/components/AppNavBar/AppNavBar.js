import React, { useContext } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import {NavLink} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext";
import {tubeIcon, uploadImage} from "../../images/images";
import {useState} from "reinspect";


const AppNavBar = () => {
  const {auth,LogOut} = useContext(GlobalContext)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <img  style={{width:'25px',height:'25px',cursor:'pointer'}} src={tubeIcon} alt=""/>
        <NavbarBrand>My tube</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className='mx-1' to='/'>Video</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='mx-1' to='/subscription'>Subscription</NavLink>
            </NavItem>
          </Nav>
          {
            auth.isAuth ? (
                <div>
                  <NavLink to='/upload'>
                    <img className='mx-1' style={{width:'20px',height:'20px',cursor:'pointer'}} src={uploadImage} alt=""/>
                  </NavLink>

                  <NavLink onClick={LogOut} to='' className='mx-1'>Log Out</NavLink>
                </div>

                )
                :
                (<div>
                  <NavLink to='/signin' className='mx-1'>Sign In</NavLink>
                  <span>|</span>
                  <NavLink to='/login' className='mx-1'>Log In</NavLink>
                </div>)
          }

        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavBar;