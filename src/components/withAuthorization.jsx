import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';

const withAuthorization = authCondition => Component => {
	class WithAuthorization extends React.Component {
		componentDidMount() {
			firebase.auth.onAuthStateChanged(authUser => {
				if (!authCondition(authUser)) {
					this.props.history.push('/signIn');
				}
			});
		}

		render() {
			const renderComponent = authUser => authUser ? <Component {...this.props} /> : null;
			return (
				<AuthUserContext.Consumer>
					{ renderComponent}
				</AuthUserContext.Consumer>
			);
		}
	}

	return withRouter(WithAuthorization);
};

export default withAuthorization;
