import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../Context/login-context';

import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to={'/'}>ALL USERS</NavLink>
            </li>
            {auth.isLogedin && <li>
                <NavLink to={`${auth.userId}/places`}>MY PLACES</NavLink>
            </li>}
            {auth.isLogedin && <li>
                <NavLink to={'/places/new'}>ADD PLACE</NavLink>
            </li>}
            {!auth.isLogedin && <li>
                <NavLink to={'/auth'}>AUTHENTICATE</NavLink>
            </li>}
            {auth.isLogedin && <li>
                <NavLink to={'/auth'} onClick={auth.logout}>LOGOUT</NavLink>
            </li>}
        </ul>
    );
}

export default NavLinks;