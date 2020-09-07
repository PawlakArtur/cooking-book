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
		<React.Fragment>
			<h1>Login</h1>
			<form className="form" onSubmit={handleSignup}>
				<label className="form__label" htmlFor="email">Email</label>
				<input className="form__input" type="text" name="email" onChange={handleEmailInput} />
				<label className="form__label" htmlFor="password">Password</label>
				<input className="form__input" type="password" name="password" onChange={handlePasswordInput} />
				<button className="form__button" type="submit">Login</button>
			</form>
		</React.Fragment>
	)
}

export default Login;
