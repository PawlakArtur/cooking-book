import React, { useEffect, useState, SyntheticEvent, FormEvent } from 'react';
import { firebase } from '../services';
import { Iuser } from '../types';

const Login = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSignup = (event: SyntheticEvent) => {
		event.preventDefault();
		const signupData: Iuser = {
			email: email,
			password: password,
		};
		firebase.login(signupData);
	};

	const handleEmailInput = (event: FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
	};

	const handlePasswordInput = (event: FormEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value)
	};

	useEffect(() => {
		firebase.auth.onAuthStateChanged(function(user) {
			if (user) {
				console.log(user);
			} else {
				console.log(user);
			}
		  });
	}, []);
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSignup}>
				<input type="text" name="email" onChange={handleEmailInput} />
				<input type="password" name="password" onChange={handlePasswordInput} />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login;
