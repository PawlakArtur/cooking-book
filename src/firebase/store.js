import { db } from './firebase';

export const doCreateNewResource = (path, resource) =>
	db.ref(path).push(resource);

export const getResource = path =>
	db.ref(path).once('value');

export const listenForResource = (path, updateValue) =>
	db.ref(path).on('value', updateValue);

export const removeResource = path =>
	db.ref(path).remove();

export const removeListener = path =>
	db.ref(path).off('value');

export const updateResource = (path, data) =>
	db.ref().update({ [path]: data });
