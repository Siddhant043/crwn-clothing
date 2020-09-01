import React from 'react'
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { connect } from 'react-redux';
import './cart-dropdown.styles.scss'
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropdown = ({ cartItems }) => { // this is the cartItems array we get from aur state
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />))
                }
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStatetoProps = state => ({
    cartItems: selectCartItems(state)
                //state.cart.cartItems // this is the cartItems array
})

export default connect(mapStatetoProps)(CartDropdown);
