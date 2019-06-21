import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { store } from '../../firebase';
import { withAuthorization, Button } from '../../components';
import { constants } from '../../config';

const INITIAL_STATE = {
	name: '',
	unit: '',
	error: null
};

class ProductAdd extends Component {
	constructor() {
		super();
		this.state = { ...INITIAL_STATE };

		this.onSubmit = this.onSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	onSubmit(e) {
		const { name, unit } = this.state;
		store.doCreateNewResource('products', { name, unit })
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
		const { units } = constants;
		const isInvalid = name === '';
		return (
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.addNewProduct')}</h1>
				<form className="layout__main layout__container layout__container--form form__container" onSubmit={this.onSubmit}>
					<input
						type="text"
						onChange={this.handleInput}
						value={name}
						placeholder={translate('views.productName')}
						name="name"
						className="form__input"/>
					<select
						onChange={this.handleInput}
						value={this.state.unit}
						placeholder={translate('views.unit')}
						name="unit"
						className="form__input">
						<option>--{translate('views.chooseUnit')}--</option>
						{ Object.keys(units).map(unitType =>
							<option key={units[unitType].name} value={units[unitType].name}>{translate(`units.${units[unitType].name}`)}</option>
						)}
					</select>
					<Button
						type="submit"
						cssClass="layout__button"
						disabled={isInvalid}>
						{translate('views.addProduct')}
					</Button>
				</form>
				{ error && <p>{error.message}</p> }
			</div>
		);
	}
}

ProductAdd.propTypes = {
	translate: PropTypes.func.isRequired
};

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(ProductAdd);
