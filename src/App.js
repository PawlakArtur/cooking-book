import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { RecipeAdd, RecipeDetails, RecipesList, SignUp, SignIn } from './views';
import { SignOutButton } from './components';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/recipeAdd">recipeAdd</Link>
          <Link to="/recipeDetails">recipeDetails</Link>
          <Link to="/recipesList">recipesList</Link>
          <Link to="/signUp">SignUp</Link>
          <Link to="/signIn">SignIn</Link>
          <SignOutButton/>
        </nav>
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
