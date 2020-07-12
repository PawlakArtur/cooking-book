import  app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from '../../config';
import { Iuser } from '../../types';

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
}

export default new Firebase();
