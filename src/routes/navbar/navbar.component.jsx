import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navbar.styles'
import { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx'


const NavBar = () => {
    const {currentUser} = useContext(UserContext)
    const {showing} = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo  className='logo'/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP 
                    </NavLink>
                    {
                        // as = 'span' allows us to tell styled-compnents to render the NavLink as a span
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {
                    showing ? <CartDropdown /> : null
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default NavBar

/* <Fragment> is used when we want to return sibling html elements from
a component. We know we can't do this so instead of wrapping everything
into a div or some similar html element, we can use <fragment> which
is given to us by react. Fragment is just a 'not render anything" element
*/

/* <Link behaves like an ancher tag (<a>) but inside a BrowserRouter */