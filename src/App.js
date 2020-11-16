import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';
import { setCurrentUser } from "./redux/user/user.action";
import HomePage from "./components/pages/homepage/homepage.component";
import ShopePage from "./components/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUp from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up";
import CheckoutPage from "./components/pages/checkout/checkout.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopePage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInSignUp />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
