import { db } from './firebase';

export const doCreateUser = ({ id, username, email, language, role }) =>
	db.ref(`users/${id}`).set({
		uid: id,
		username,
		email,
		language,
		role
	});

export const onceGetUsers = () =>
	db.ref('users').once('value');
