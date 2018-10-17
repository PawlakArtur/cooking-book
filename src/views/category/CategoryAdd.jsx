import React, { Component } from 'react';
import { store } from '../../firebase';
import { withAuthorization } from '../../components';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
	name: '',
	error: null
};

class CategoryAdd extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };

		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	onSubmit(e) {
		const { name } = this.state;
		store.doCreateNewResource('categories', { name })
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch(error => {
				this.setState({ error });
			});
		e.preventDefault();
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { name, error } = this.state;
		const { translate } = this.props;
		const isInvalid = name === '';
		return (
			<div>
				<h1>{translate('views.addNewCategory')}</h1>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={name}
						placeholder={translate('views.categoryName')}
						name="name"/>
					<button
						type="submit"
						disabled={isInvalid}>
						{translate('views.addCategory')}
					</button>
				</form>
				{error && <p>{error.message}</p>}
			</div>
		);
	}
}

CategoryAdd.propTypes = {
	translate: PropTypes.func.isRequired
};

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(CategoryAdd);
