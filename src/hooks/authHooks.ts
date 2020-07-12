import { useState, useEffect } from 'react';
import { firebase } from '../services';

export const UseIsUserLogged = (): boolean => {
	const [isUserLogged, setIsUserLogged] = useState<boolean>(firebase.isUserLogged());

	useEffect(() => {
		firebase.auth.onAuthStateChanged((user) => {
			if (user) {
				setIsUserLogged(true);
			} else {
				setIsUserLogged(false);
			}
		})
	}, []);

	return isUserLogged;
};

export const UseIsInitialized = (): boolean => {
	const [isInitialized, setIsInitialized] = useState<boolean>(false)

	useEffect(() => {
		firebase.isInitialized().then((val: any) => {
			setIsInitialized(Boolean(val))
		})
	})

	return isInitialized
};
