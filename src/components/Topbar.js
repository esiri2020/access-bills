import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // NavbarText
} from 'reactstrap';
import theme from './styles/theme';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    color: '#203f52',
    fontFamily: 'Rubik',
  },
  menu: {
    flexWrap: 'wrap',
  },
  sticky: {
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: '5000',
  // [theme.breakpoints.up("lg")]: {
  //   width: '90%'
  // }
},
Logo: {
  height: '40px',
    width: '40px',
  
},
}));


const Topbar = (props) => {
  const classes = useStyles(theme);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{display: 'contents', padding: '0px 20px'}}>
      <Navbar className={classes.sticky} color="light" light expand="md">
        
      <Toolbar>
        <img src="./images/act-logo.png" alt="logo" className={classes.logo} />
      </Toolbar>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} style={{justifyContent:' flex-end'}} navbar>
          <Nav className={classes.menu} navbar>
            <NavItem>
              <NavLink href="https://accesstech.com.ng"  variant="button" color="textPrimary" className={classes.link}>HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => props.handle(props.to)}  variant="button" color="textPrimary" className={classes.link}> HOW IT WORKS </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/"  variant="button" color="textPrimary" className={classes.link}>SELF SUPPORT</NavLink>
            </NavItem>
           
          </Nav>

          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
       
      </Navbar>
    </div>
  );
}

export default Topbar;
