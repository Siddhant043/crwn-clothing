import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
//import { Link } from "react-router-dom";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";
//import "./header.styles.scss";
import { LogoContainer, HeaderContainer, OptionDiv, OptionLink, OptionsContainer } from './header.styles'
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink  to="/shop">
          SHOP
        </OptionLink>
        <OptionLink  to="/shop">
          CONTACT
        </OptionLink>
        {currentUser ? (
          <OptionDiv onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionDiv>
        ) : (
          <OptionLink to="/signin">
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  //destructuring user and cart from state
  currentUser: selectCurrentUser,
  //currentUser: state.user.currentUser //asks value from rootreducer => particularReducer => state
  hidden: selectCartHidden
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
