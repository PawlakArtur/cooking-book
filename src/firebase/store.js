import { db } from './firebase';

export const doCreateNewRecipe = (uid, recipe) =>
	db.ref(`recipes/${uid}`).push(recipe);

export const getRecipes = uid =>
	db.ref(`recipes/${uid}`).once('value');

export const getRecipe = (uid, recipeID) =>
	db.ref(`recipes/${uid}/${recipeID}`).once('value');

export const getAllProducts = () =>
	db.ref('products').once('value');

export const doCreateProduct = product =>
	db.ref('products').push(product);

export const getAllCategories = () =>
	db.ref('categories').once('value');

export const doCreateCategory = categoryName =>
	db.ref('categories').push(categoryName);
