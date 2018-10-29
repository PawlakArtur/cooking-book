import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuthorization, Button } from '../../components';

class CategoryList extends Component {
	render() {
		const { categoryList, translate } = this.props;
		return (
			<div className="layout__container layout__container--main">
				<h1 className="layout__title">{translate('views.categoryList')}:</h1>
				<div className="layout__buttons">
					<Button
						cssClass="button__link--primary"
						to="/categoryAdd"
						linkButton>
						{translate('views.addCategory')}
					</Button>
				</div>
				<ul className="layout__main">
					{categoryList.map(category =>
						<li key={category.id}>{category.name}</li>
					)}
				</ul>
			</div>
		);
	}
}

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(CategoryList);

CategoryList.propTypes = {
	categoryList: PropTypes.array.isRequired,
	translate: PropTypes.func.isRequired
};
