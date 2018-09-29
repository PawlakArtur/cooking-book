import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuthorization } from '../../components';

class CategoryList extends Component {
	render() {
		const { categoryList } = this.props;
		return (
			<div>
				<h1>Categories list:</h1>
				<ul>
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
	categoryList: PropTypes.array
};
