import React, { useContext } from "react";
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import UserContext from "./UserContext";

const NavBar = () =>{

    const {user, setUser} = useContext(UserContext);
    return(
        <div style={{borderBottom: '2px solid black'}}>
            <Navbar expand='md'>
                <NavLink to='/' className='navbar-brand'>
                    Jobly
                </NavLink>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink to='/companies'>Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/jobs'>Jobs</NavLink>
                    </NavItem>
                    {user ? 
                        <><NavItem>
                            <NavLink to={`/users/${user.username}`}>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/logout'>Logout</NavLink>
                        </NavItem></>
                    : 
                        <><NavItem>
                            <NavLink to='/login'>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/register'>Register</NavLink>
                        </NavItem></> 
                    }
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;