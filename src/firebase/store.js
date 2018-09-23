import { db } from './firebase';

export const doCreateNewRecipe = (uid, recipe) =>
	db.ref(`recipes/${uid}`).push(recipe);

export const getRecipes = uid =>
	db.ref(`recipes/${uid}`).once('value');

export const getRecipe = (uid, recipeID) =>
	db.ref(`recipes/${uid}/${recipeID}`).once('value');
