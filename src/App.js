import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
/* redirect is used to send user to different page after a process like of signing in is complete*/
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component';
// to pass the signed in user info to different components we use auth.
import { auth, createUserProfileDocument, addCollectionAndDocuments } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.acitons"; //action imported to dispatch

import "./App.css";
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { selectCurrentUser } from "./redux/user/user.selectors";

export class App extends Component {
  // Initial state containes no current user i.e. no one is logged in.
  // state = { //we dont need state as we are working with redux
  //   currentUser: null
  // }
  
  // initialising the varialble
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;
    // here the user from 'onAuthStateChanged' takes a arrow fn and sets currentUser to user
    // this.setState({ currentUser: user });
    // console.log(user);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // userAuth is the current user
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); //passing the user to the given fn.
        // the moment code runs it sends the snapshot of data in our database.
        // this (.onSnapshot) allows us to check if a document exists using .exists
        // we can also get actual queries by calling .data() which returns JSON obj.
        userRef.onSnapshot((snapShot) => {
          //console.log(snapShot); this gives id, path and other data
          //console.log(snapShot.data()); this gives name email and imp data
          //now to set user to state
          // this.setState({
          //   currentUser: // no state, no use
          setCurrentUser({
            //setCurrentUser is going to dispatch function below
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        // if no user if present then userAuth is null so is state
        setCurrentUser(userAuth);
      }
      addCollectionAndDocuments('collections', collectionsArray);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" /> // this will redirect user to home if user is signed in and wants to acees signin page
              ) : (
                <SignInAndSignUpPage /> // if there is no currentUser, user can access the signin page
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // destructuring user from state object
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = (dispatch) => ({
  //uses actions so import particular actions
  /* below variable will be used as a function in above component*/

  setCurrentUser: (user) => dispatch(setCurrentUser(user)), //setCurrentUser is a function in useractions which return and object and that object here is user
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
