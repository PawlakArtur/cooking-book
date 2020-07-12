import React, { useState, SyntheticEvent, FormEvent } from 'react';
import { firebase } from '../services';
import { Iuser } from '../types';

const Register = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [displayName, setDisplayName] = useState<string>('');

	const handleSignup = (event: SyntheticEvent) => {
		event.preventDefault();
		const signupData: Iuser = {
			email: email,
			password: password,
			displayName: displayName
		};
		firebase.register(signupData);
	};

	const handleEmailInput = (event: FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
	};

	const handlePasswordInput = (event: FormEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value)
	};

	const handleDisplayNameInput = (event: any) => {
		setDisplayName(event.target.value);
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSignup}>
				<input type="text" name="email" onChange={handleEmailInput} />
				<input type="password" name="password" onChange={handlePasswordInput} />
				<input type="text" name="displayName" onChange={handleDisplayNameInput} />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Register;
