import React from 'react';
import { Switch, Route } from 'react-router-dom'

//Containers
import ProductList from '../containers/ProductList';
import Cart from '../containers/Cart';
import Status from '../containers/Status';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ProductList}/>
      <Route path='/cart' component={Cart}/>
      <Route path='/status' component={Status}/>
    </Switch>
  </main>
)

export default Main;