import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // NavbarText
} from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
  menu: {
    flexWrap: 'wrap',
  },

}));


const Topbar = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Access Tech Bills</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} style={{justifyContent:' flex-end'}} navbar>
          <Nav className={classes.menu} navbar>
            <NavItem>
              <NavLink href="/accesstech.com.ng"  variant="button" color="textPrimary" className={classes.link}>HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/"  variant="button" color="textPrimary" className={classes.link}>HOW IT WORKS</NavLink>
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