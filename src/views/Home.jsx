import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuthorization } from '../components';
import { db } from '../firebase';

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			users: null
		};
	}

	componentDidMount() {
		db.onceGetUsers().then(snapshot =>
			this.setState({ users: snapshot.val() })
		);
	}

	render() {
		const { users } = this.state;
		const { translate } = this.props;
		return (
			<div>
				<h1>{translate('views.home')}</h1>
				{ users && <UserList users={users} translate={translate}/> }
			</div>
		);
	}
}

HomePage.propTypes = {
	translate: PropTypes.func.isRequired
};

const UserList = ({ users, translate }) =>
	<div>
		<h2>{translate('views.listOfUsers')}</h2>
		{Object.keys(users).map(key =>
			<div key={key}>{users[key].username}</div>
		)}
	</div>;

UserList.propTypes = {
	users: PropTypes.object.isRequired,
	translate: PropTypes.func.isRequired
};

const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(HomePage);
