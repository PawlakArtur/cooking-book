import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { RecipeAdd, RecipeDetails, RecipesList, SignUp, SignIn } from './views';
import { Navigation } from './components';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <div>
          <Route path="/recipeAdd" component={RecipeAdd}/>
          <Route path="/recipeDetails" component={RecipeDetails}/>
          <Route path="/recipesList" component={RecipesList}/>
          <Route path="/signUp" component={SignUp}/>
          <Route path="/signIn" component={SignIn}/>
        </div>
      </div>
    );
  }
}

export default App;
