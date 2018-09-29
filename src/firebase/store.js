import { db } from './firebase';

export const doCreateNewRecipe = (uid, recipe) =>
	db.ref(`recipes/${uid}`).push(recipe);

export const getRecipes = uid =>
	db.ref(`recipes/${uid}`).once('value');

export const getRecipe = (uid, recipeID) =>
	db.ref(`recipes/${uid}/${recipeID}`).once('value');

export const getAllProducts = () =>
	db.ref('products').once('value');

export const listenForProducts = updateValue =>
	db.ref('products').on('value', updateValue);

export const doCreateProduct = product =>
	db.ref('products').push(product);

export const getAllCategories = () =>
	db.ref('categories').once('value');

export const listenForCategories = updateValue =>
	db.ref('categories').on('value', updateValue);

export const doCreateCategory = category =>
	db.ref('categories').push(category);
