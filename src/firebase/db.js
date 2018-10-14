import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({
		uid: id,
		username,
		email
	});

export const onceGetUsers = () =>
	db.ref('users').once('value');
