import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { store } from '../../firebase';
import { withAuthorization, Button } from '../../components';

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
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.addNewCategory')}</h1>
				<form className="layout__main layout__container layout__container--form form__container" onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={name}
						placeholder={translate('views.categoryName')}
						name="name"
						className="form__input layout__input--wide"/>
					<Button
						type="submit"
						cssClass="layout__button"
						disabled={isInvalid}>
						{translate('views.addCategory')}
					</Button>
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
