import { db } from './firebase';

export const doCreateNewResource = (path, resource) =>
	db.ref(path).push(resource);

export const getResource = path =>
	db.ref(path).once('value');

export const listenForResource = (path, updateValue) =>
	db.ref(path).on('value', updateValue);
