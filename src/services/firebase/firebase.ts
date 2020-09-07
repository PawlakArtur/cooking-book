import  app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { firebaseConfig } from '../../config';
import { Iuser, IrecipeDetails } from '../../types';

class Firebase {
	db: firebase.firestore.Firestore;
	auth: firebase.auth.Auth;

	constructor() {
		app.initializeApp(firebaseConfig);
		this.db = app.firestore();
		this.auth = app.auth();
	}

	login(user: Iuser) {
		this.auth.signInWithEmailAndPassword(user.email, user.password);
	}

	logout() {
		this.auth.signOut();
	}

	async register(user: Iuser) {
		await this.auth.createUserWithEmailAndPassword(user.email, user.password);
		return this.auth.currentUser?.updateProfile({
			displayName: user.displayName
		});
	}

	isUserLogged(): boolean {
		return Boolean(this.auth.currentUser);
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getRecipesList() {		
		return this.db.collection("recipes").where("authorId", "==", this.auth.currentUser?.uid)
			.get()
			.then(function(querySnapshot) {
				return querySnapshot.docs.map(function(doc) {
					return {
						id: doc.id,
						name: doc.data().name,
						type: doc.data().type,
						public: doc.data().public,
						authorId: doc.data().authorId,
					};
				});
			});
	}

	getRecipe(id: string) {		
		return this.db.collection("recipes").doc(id)
			.get()
			.then((querySnapshot) => {
				return {
					id: querySnapshot.id,
					name: querySnapshot.data()?.name,
					type: querySnapshot.data()?.type,
					ingredients: querySnapshot.data()?.ingredients,
					description: querySnapshot.data()?.description,
					executionTime: querySnapshot.data()?.executionTime,
				}
			}
		);
	}

	setRecipe(recipe: IrecipeDetails) {
		const recipeId = uuidv4();
		return this.db.collection("recipes").doc(recipeId).set({
			id: recipeId,
			name: recipe.name,
			type: recipe.type,
			ingredients: recipe.ingredients,
			description: recipe.description,
			executionTime: recipe.executionTime,
			authorId: this.auth.currentUser?.uid,
		}).then((data) => {
			console.log(data);
		});
	}
}

export default new Firebase();
