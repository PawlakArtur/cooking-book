import { ImenuItem, ImenuItemVisibility, ImenuType } from '../types';
import { firebase } from '../services';

const menuConfig: ImenuItem[] = [{
	name: 'Home',
	visibility: ImenuItemVisibility.Always,
	type: ImenuType.Link,
	path: '/',
}, {
	name: 'Login',
	visibility: ImenuItemVisibility.Unauthorized,
	type: ImenuType.Link,
	path: '/login',
}, {
	name: 'Register',
	visibility: ImenuItemVisibility.Unauthorized,
	type: ImenuType.Link,
	path: '/register',
}, {
	name: 'Recipes',
	visibility: ImenuItemVisibility.Authorized,
	type: ImenuType.Link,
	path: '/recipes',
}, {
	name: 'Add Recipe',
	visibility: ImenuItemVisibility.Authorized,
	type: ImenuType.Link,
	path: '/addRecipe',
}, {
	name: 'Logout',
	visibility: ImenuItemVisibility.Authorized,
	type: ImenuType.Function,
	handler: () => {
		firebase.logout();
	},
}];

export default menuConfig;