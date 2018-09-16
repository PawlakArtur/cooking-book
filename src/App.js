import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { RecipeAdd, RecipeDetails, RecipesList, SignUp, SignIn } from './views';
import { Navigation } from './components';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authUser: null
    };
  }
  render() {
    return (
      <div>
        <Navigation authUser={this.state.authUser}/>
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
