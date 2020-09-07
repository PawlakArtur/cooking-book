import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Home, Login, Register, Recipes, Recipe, AddRecipe } from './views';
import { Menu } from './components';

function App() {
  return (
    <Router>
        <div>
          <Menu />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/recipes">
              <Recipes />
            </Route>
            <Route path="/recipe/:id">
              <Recipe />
            </Route>
            <Route path="/addRecipe">
              <AddRecipe />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  )
}

export default App;
