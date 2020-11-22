import React, { createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import Notfound from './component/NotFound/Notfound';
import ProductDetail from './component/ProductDetail/ProductDetail';
import Login from './component/Login/Login';
import Shipment from './component/Shipment/Shipment';
import { useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>email: {loggedInUser.email}</p>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
           <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/invertory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
