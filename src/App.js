import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import  {connect} from 'react-redux';
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// to pass the signed in user info to different components we use auth.
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from './redux/user/user.acitons';

import "./App.css";

export class App extends Component {
  // Initial state containes no current user i.e. no one is logged in.
  // state = { //we dont need state as we are working with redux 
  //   currentUser: null
  // }
  // initialising the varialble
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props
    // here the user from 'onAuthStateChanged' takes a arrow fn and sets currentUser to user
      // this.setState({ currentUser: user });
      // console.log(user);
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // userAuth is the current user
        if(userAuth) {
          const userRef = await createUserProfileDocument(userAuth); //passing the user to the given fn.
          // the moment code runs it sends the snapshot of data in our database.
          // this (.onSnapshot) allows us to check if a document exists using .exists
          // we can also get actual queries by calling .data() which returns JSON obj.
          userRef.onSnapshot(snapShot => {
            //console.log(snapShot); this gives id, path and other data
            //console.log(snapShot.data()); this gives name email and imp data
            //now to set user to state
            // this.setState({
            //   currentUser: // no state, no use
            setCurrentUser({   //setCurrentUser is going to dispatch function below
                id: snapShot.id,
                ...snapShot.data()
              })
            }, )
          
        } else { // if no user if present then userAuth is null so is state
          setCurrentUser(userAuth);
          
        }
      })
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
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ //uses actions so import particular actions
  /* below variable will be used as a function in above component*/ 
  setCurrentUser : user => dispatch(setCurrentUser(user)) //setCurrentUser is a function in useractions which return and object and that object here is user
})


export default connect(null, mapDispatchToProps)(App);